import React, { useState } from 'react';
import { GameConfig } from '../types';
import GameRow from './GameRow';
import AnswerModal from './AnswerModal';
import VictoryModal from './VictoryModal';
import { Key, Unlock, ArrowLeft, Star } from 'lucide-react';

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
      setIsVictory(true);
      setRevealAll(true);
    } else {
      alert("Từ khóa chưa chính xác!");
    }
  };

  const activeRow = config.rows.find(r => r.id === activeRowId) || null;

  return (
    <div 
      className="min-h-screen bg-[#9b1106] flex flex-col items-center py-4 px-2 sm:px-6 relative bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: config.backgroundImageUrl ? `linear-gradient(rgba(155, 17, 6, 0.9), rgba(155, 17, 6, 0.95)), url(${config.backgroundImageUrl})` : undefined
      }}
    >
      
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
        <div className="flex-grow flex flex-col items-center">
            {config.logoUrl ? (
               <img src={config.logoUrl} alt="Logo" className="h-16 md:h-24 object-contain mb-2 drop-shadow-lg" />
            ) : null}
            <h1 className="text-xl sm:text-3xl font-bold text-center text-white drop-shadow-md tracking-wide">
              {config.title}
            </h1>
        </div>
        
        <div className="w-20"></div> {/* Spacer */}
      </div>

      {/* Main Grid Area - Vertical Centering */}
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

      {/* Secret Keyword Control Bar (Sticky Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10 p-4 pb-6 z-30">
         <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-4 text-white">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-2 rounded-full text-white shadow-lg animate-pulse">
                <Key size={24} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider opacity-80 text-yellow-200">Gợi ý từ khóa</div>
                <div className="font-semibold text-sm sm:text-base text-white">{config.secretHint}</div>
              </div>
            </div>

            <form onSubmit={handleKeywordSubmit} className="flex gap-2 w-full md:w-auto">
              <input 
                type="text" 
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Nhập từ khóa bí mật..."
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
      />

      <VictoryModal 
        isOpen={isVictory}
        videoUrl={config.victoryVideoUrl}
        onClose={() => setIsVictory(false)}
        secretKeyword={config.secretKeyword}
      />
    </div>
  );
};

export default GameBoard;