import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Eye } from 'lucide-react';
import { CrosswordRow } from '../types';

interface AnswerModalProps {
  row: CrosswordRow | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (answer: string) => void;
  volume: number; // Add volume prop
}

const AnswerModal: React.FC<AnswerModalProps> = ({ row, isOpen, onClose, onSubmit, volume }) => {
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [showAnswerForce, setShowAnswerForce] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  // Simple Web Audio API for ticking sound
  const playTickSound = (isUrgent: boolean) => {
    if (volume <= 0) return; // Mute check

    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        // Sound configuration
        osc.type = isUrgent ? 'square' : 'triangle'; // Square wave for urgency
        osc.frequency.setValueAtTime(isUrgent ? 880 : 600, ctx.currentTime);
        
        // Adjust gain based on global volume
        const soundVol = isUrgent ? 0.2 : 0.1;
        gain.gain.setValueAtTime(soundVol * volume, ctx.currentTime); 
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
        // Audio policy might block auto-play
    }
  };

  useEffect(() => {
    if (isOpen && row) {
      setInput('');
      setShowAnswerForce(false);
      setTimeLeft(30);
      setTimeout(() => inputRef.current?.focus(), 100);

      // Start Timer
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          // Play sound
          playTickSound(prev <= 6); 
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, row, volume]); // Depend on volume

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input.trim());
  };

  const handleReveal = () => {
    if (row) {
        setInput(row.answer);
        setShowAnswerForce(true);
    }
  };

  if (!isOpen || !row) return null;

  // Timer calculation
  const radius = 24; // Increased radius
  const circumference = 2 * Math.PI * radius;
  const progress = ((30 - timeLeft) / 30) * circumference;
  const timerColor = timeLeft > 15 ? 'text-green-600' : timeLeft > 5 ? 'text-yellow-600' : 'text-red-600';
  const strokeColor = timeLeft > 15 ? '#16a34a' : timeLeft > 5 ? '#ca8a04' : '#dc2626';

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-pop flex flex-col max-h-[95vh]">
        
        {/* Header - Improved Layout */}
        <div className="bg-red-50 p-4 border-b border-red-100 flex justify-between items-center relative">
           {/* Left: Question Number */}
           <div className="flex-1 flex justify-start">
             <div className="text-[#9b1106] font-extrabold uppercase text-sm sm:text-base tracking-widest border-2 border-red-200 px-3 py-1.5 rounded-lg bg-white shadow-sm whitespace-nowrap">
               Câu {row.id.split('-').pop()}
             </div>
           </div>

           {/* Center: BIG Timer */}
           <div className="flex-shrink-0 mx-4">
               <div className="relative flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md border-4 border-red-50">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                        cx="50%" cy="50%" r={radius}
                        fill="transparent"
                        stroke="#e5e7eb"
                        strokeWidth="6"
                        />
                        <circle
                        cx="50%" cy="50%" r={radius}
                        fill="transparent"
                        stroke={strokeColor}
                        strokeWidth="6"
                        strokeDasharray={circumference}
                        strokeDashoffset={progress}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-linear"
                        />
                    </svg>
                    <span className={`absolute text-2xl font-black ${timerColor}`}>{timeLeft}</span>
                </div>
           </div>

           {/* Right: Close Button */}
           <div className="flex-1 flex justify-end">
             <button 
                onClick={onClose}
                className="text-gray-400 hover:text-red-500 transition bg-white rounded-full p-2 hover:bg-red-100 shadow-sm border border-gray-100"
            >
                <X size={24} />
            </button>
           </div>
        </div>

        <div className="overflow-y-auto p-4 sm:p-8 custom-scrollbar flex-1 flex flex-col">
          {/* Question Image */}
          {row.imageUrl && (
            <div className="mb-6 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex justify-center items-center h-64 sm:h-80 shadow-inner flex-shrink-0">
              <img src={row.imageUrl} alt="Gợi ý" className="h-full w-auto object-contain max-w-full" />
            </div>
          )}

          <div className="text-center mb-8 flex-grow flex items-center justify-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {row.question}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto w-full">
            <div className="relative group">
               <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value.toUpperCase());
                }}
                className="w-full text-center text-3xl sm:text-4xl font-mono tracking-[0.2em] p-4 sm:p-6 border-b-4 border-red-200 focus:border-[#9b1106] outline-none uppercase bg-gray-50 text-black rounded-t-xl transition-colors placeholder-gray-300 font-bold"
                placeholder={Array(row.answer.length).fill('_').join(' ')}
              />
              <p className="text-center text-gray-500 text-base mt-2 font-medium">
                ({row.answer.length} ký tự)
              </p>
            </div>

            {/* Time's up or Manual Reveal */}
            {(timeLeft === 0 || showAnswerForce) && (
                 <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-center text-lg border border-yellow-200 shadow-sm animate-pop">
                    Đáp án là: <strong className="text-2xl ml-2">{row.answer}</strong>
                 </div>
            )}

            <div className="flex gap-4 pt-2">
                {/* Reveal button if time is up or user gives up */}
               {timeLeft === 0 && !showAnswerForce && (
                    <button 
                        type="button"
                        onClick={handleReveal}
                        className="px-6 rounded-xl font-bold text-[#9b1106] border-2 border-[#9b1106] hover:bg-red-50 transition flex items-center justify-center gap-2"
                        title="Hiện đáp án"
                    >
                        <Eye size={24} />
                    </button>
               )}
               
               <button 
                 type="button"
                 onClick={onClose}
                 className="flex-1 py-3 sm:py-4 px-6 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition text-lg"
               >
                 Bỏ qua
               </button>
               <button 
                 type="submit"
                 className="flex-1 py-3 sm:py-4 px-6 rounded-xl font-bold text-white bg-[#9b1106] hover:bg-red-700 shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition transform active:scale-95 text-lg"
               >
                 <Send size={20} />
                 Trả lời
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnswerModal;