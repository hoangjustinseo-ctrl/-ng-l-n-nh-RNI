import React, { useState, useRef, useEffect } from 'react';
import { GameConfig } from '../types';
import GameRow from './GameRow';
import AnswerModal from './AnswerModal';
import VictoryModal from './VictoryModal';
import { Key, Unlock, ArrowLeft, Star, Volume2, VolumeX, Lightbulb, X, Image as ImageIcon, ChevronRight } from 'lucide-react';

interface GameBoardProps {
  config: GameConfig;
  onBackToEditor: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ config, onBackToEditor }) => {
  const [solvedRows, setSolvedRows] = useState<Set<string>>(new Set());
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [keywordInput, setKeywordInput] = useState('');
  const [isVictory, setIsVictory] = useState(false);
  const [praiseMessage, setPraiseMessage] = useState<{text: string, id: number} | null>(null);
  const [revealAll, setRevealAll] = useState(false);
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Secret Hint Modal Logic
  const [showSecretHints, setShowSecretHints] = useState(false);
  const [activeHintImage, setActiveHintImage] = useState<string | null>(null);

  // Auto-play music on first interaction if possible, or just setup
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleAudio = () => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio play failed interaction required", e));
        }
        setIsPlaying(!isPlaying);
    }
  };

  const playSuccessSound = () => {
    if (volume <= 0) return;
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        // Simple Major Triad (C E G)
        const notes = [523.25, 659.25, 783.99, 1046.50]; 
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.1 * volume, ctx.currentTime + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + i * 0.05 + 0.4);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * 0.05);
            osc.stop(ctx.currentTime + i * 0.05 + 0.5);
        });
    } catch (e) {
        // ignore
    }
  };

  const triggerPraise = () => {
    const praises = ["Tuyệt vời!", "Chính xác!", "Hay quá!", "Đúng rồi!", "Xuất sắc!"];
    const text = praises[Math.floor(Math.random() * praises.length)];
    setPraiseMessage({ text, id: Date.now() });
    setTimeout(() => setPraiseMessage(null), 2500);
  };

  const handleRowSubmit = (answer: string) => {
    if (!activeRowId) return;
    
    const row = config.rows.find(r => r.id === activeRowId);
    if (row) {
      const normalizedInput = answer.replace(/\s/g, '').toUpperCase();
      const normalizedAnswer = row.answer.replace(/\s/g, '').toUpperCase();
      
      if (normalizedInput === normalizedAnswer) {
        playSuccessSound(); // Play sound
        const newSolved = new Set(solvedRows);
        newSolved.add(activeRowId);
        setSolvedRows(newSolved);
        setActiveRowId(null);
        setTimeout(triggerPraise, 300);
      } else {
        alert("Sai rồi, hãy thử lại nhé!");
      }
    }
  };

  const handleKeywordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keywordInput.toUpperCase().trim() === config.secretKeyword.toUpperCase().trim()) {
      playSuccessSound(); // Play sound for victory too
      setIsVictory(true);
      setRevealAll(true);
    } else {
      alert("Từ khóa chưa chính xác!");
    }
  };

  const activeRow = config.rows.find(r => r.id === activeRowId) || null;

  // Check if all rows are solved
  const allRowsSolved = config.rows.length > 0 && solvedRows.size === config.rows.length;

  // Automatically show hints modal if all rows solved but not victory
  useEffect(() => {
    if (allRowsSolved && !isVictory) {
        setShowSecretHints(true);
    }
  }, [allRowsSolved, isVictory]);

  return (
    <div 
      className="min-h-screen bg-[#9b1106] flex flex-col items-center py-4 px-2 sm:px-6 relative bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: config.backgroundImageUrl ? `linear-gradient(rgba(155, 17, 6, 0.9), rgba(155, 17, 6, 0.95)), url(${config.backgroundImageUrl})` : undefined
      }}
    >
      
      {/* Background Audio */}
      {config.backgroundMusicUrl && (
        <audio ref={audioRef} src={config.backgroundMusicUrl} loop />
      )}

      {/* Audio Controls */}
      <div className="fixed top-4 right-4 z-40 bg-black/30 backdrop-blur rounded-full p-2 flex items-center gap-2 hover:bg-black/50 transition border border-white/10">
         <button onClick={toggleAudio} className="text-white hover:text-yellow-400 p-1">
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
         </button>
         <input 
           type="range" 
           min="0" 
           max="1" 
           step="0.1" 
           value={volume} 
           onChange={(e) => setVolume(parseFloat(e.target.value))}
           className="w-16 h-1 bg-white/50 rounded-lg appearance-none cursor-pointer"
         />
      </div>

      {/* Impressive Praise Overlay */}
      {praiseMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black/40 animate-fade-in" />
          <div className="relative z-10 flex flex-col items-center animate-pop">
             <div className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-orange-500 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] tracking-tighter transform rotate-[-5deg]">
               {praiseMessage.text}
             </div>
             <div className="flex gap-4 mt-4">
               <Star className="text-yellow-400 w-12 h-12 animate-bounce fill-yellow-400" />
               <Star className="text-yellow-400 w-12 h-12 animate-bounce fill-yellow-400" style={{animationDelay: '0.1s'}} />
               <Star className="text-yellow-400 w-12 h-12 animate-bounce fill-yellow-400" style={{animationDelay: '0.2s'}} />
             </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="w-full max-w-7xl flex justify-between items-start mb-6 z-10">
        <button 
          onClick={onBackToEditor}
          className="text-white/60 hover:text-white flex items-center gap-1 bg-black/20 hover:bg-black/40 px-3 py-1 rounded-full transition backdrop-blur-sm"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline text-sm">Cấu hình</span>
        </button>

        {/* Dynamic Logo if present, else Default Title */}
        <div className="flex-grow flex flex-col items-center px-4">
            {config.logoUrl ? (
               <img src={config.logoUrl} alt="Logo" className="h-16 md:h-24 object-contain mb-2 drop-shadow-lg" />
            ) : null}
            <h1 
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-center text-white tracking-wide uppercase"
              style={{
                textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.5)' // Heavy shadow to pop from red background
              }}
            >
              {config.title}
            </h1>
        </div>
        
        <div className="w-20"></div> {/* Spacer */}
      </div>

      {/* Main Grid Area */}
      <div className="flex-grow w-full max-w-[95vw] overflow-x-auto pb-24 custom-scrollbar flex items-center justify-center">
        <div className="flex flex-col items-center w-full">
          {config.rows.map((row, index) => (
            <GameRow
              key={row.id}
              row={row}
              index={index}
              isSolved={solvedRows.has(row.id)}
              isActive={false}
              onSelect={() => !solvedRows.has(row.id) && setActiveRowId(row.id)}
              revealAll={revealAll}
            />
          ))}
        </div>
      </div>

      {/* Hint Button (Visible when all solved or manually) - Floating backup */}
      {allRowsSolved && !isVictory && (
        <button 
          onClick={() => setShowSecretHints(true)}
          className="fixed bottom-32 right-6 z-30 bg-yellow-400 text-[#9b1106] p-3 rounded-full shadow-lg animate-bounce hover:bg-yellow-300"
          title="Xem gợi ý từ khóa"
        >
          <Lightbulb size={24} />
        </button>
      )}

      {/* Secret Hints Modal - Main Menu */}
      {showSecretHints && config.secretHintImages && config.secretHintImages.length > 0 && !activeHintImage && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowSecretHints(false)}></div>
            <div className="relative bg-white rounded-xl max-w-xl w-full p-8 animate-pop">
                <button onClick={() => setShowSecretHints(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 z-10">
                    <X size={24} />
                </button>
                <h3 className="text-2xl font-bold text-[#9b1106] mb-8 text-center uppercase border-b pb-4">
                    Gợi ý Từ Khóa Bí Mật
                </h3>
                
                <div className="grid gap-4">
                    {config.secretHintImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveHintImage(img)}
                            className="w-full py-4 px-6 bg-[#9b1106] hover:bg-red-700 text-white text-xl font-bold rounded-xl shadow-lg transition transform hover:scale-105 flex items-center justify-between"
                        >
                            <span>GỢI Ý {idx + 1}</span>
                            <ChevronRight />
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}

      {/* Fullscreen Hint Image Overlay */}
      {activeHintImage && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in" onClick={() => setActiveHintImage(null)}>
             <button onClick={() => setActiveHintImage(null)} className="absolute top-6 right-6 text-white hover:text-yellow-400 z-50 p-2 bg-white/10 rounded-full">
                <X size={32} />
             </button>
             <img 
               src={activeHintImage} 
               alt="Secret Hint" 
               className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-pop"
               onClick={(e) => e.stopPropagation()} // Click image shouldn't close it, only click backdrop
             />
         </div>
      )}

      {/* Secret Keyword Control Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10 p-4 pb-6 z-30">
         <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-4 text-white">
              <div 
                className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-2 rounded-full text-white shadow-lg animate-pulse cursor-pointer hover:scale-110 transition"
                onClick={() => setShowSecretHints(true)}
                title="Bấm để xem hình ảnh gợi ý"
              >
                <Key size={24} />
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                   <div className="font-bold text-lg text-yellow-300 tracking-wider">TỪ KHÓA BÍ MẬT</div>
                   {/* Manual Trigger for Host */}
                   <button 
                     onClick={() => setShowSecretHints(true)}
                     className="bg-white/10 hover:bg-white/30 text-white text-[10px] sm:text-xs px-2 py-1 rounded-md border border-white/20 transition flex items-center gap-1"
                   >
                     <ImageIcon size={12} />
                     Gợi ý
                   </button>
                </div>
              </div>
            </div>

            <form onSubmit={handleKeywordSubmit} className="flex gap-2 w-full md:w-auto">
              <input 
                type="text" 
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Nhập từ khóa..."
                className="flex-grow md:w-64 px-5 py-3 rounded-full bg-white/95 text-[#9b1106] font-bold placeholder-red-800/40 outline-none focus:ring-4 focus:ring-yellow-400/50 shadow-inner"
              />
              <button 
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-[#9b1106] px-6 py-2 rounded-full font-bold shadow-lg transition transform hover:scale-105 flex items-center gap-2 border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1"
              >
                <Unlock size={18} />
                Mở
              </button>
            </form>
         </div>
      </div>

      {/* Modals */}
      <AnswerModal 
        row={activeRow} 
        isOpen={!!activeRowId} 
        onClose={() => setActiveRowId(null)}
        onSubmit={handleRowSubmit}
        volume={volume}
      />

      <VictoryModal 
        isOpen={isVictory}
        videoUrl={config.victoryVideoUrl}
        victoryImageUrl={config.victoryImageUrl}
        onClose={() => setIsVictory(false)}
        secretKeyword={config.secretKeyword}
      />
    </div>
  );
};

export default GameBoard;