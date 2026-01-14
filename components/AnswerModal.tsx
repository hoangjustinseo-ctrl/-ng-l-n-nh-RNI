import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Clock, Eye } from 'lucide-react';
import { CrosswordRow } from '../types';

interface AnswerModalProps {
  row: CrosswordRow | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (answer: string) => void;
}

const AnswerModal: React.FC<AnswerModalProps> = ({ row, isOpen, onClose, onSubmit }) => {
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [showAnswerForce, setShowAnswerForce] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

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
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, row]);

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

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-pop flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="bg-red-50 p-4 border-b border-red-100 flex justify-between items-center">
           <div className="flex items-center gap-3">
             <div className="text-[#9b1106] font-bold uppercase text-xs tracking-wider border border-red-200 px-2 py-1 rounded bg-white">
               Câu {row.id.split('-').pop()}
             </div>
             {/* Timer Display */}
             <div className={`flex items-center gap-1 font-mono font-bold text-lg ${timeLeft === 0 ? 'text-red-600 animate-pulse' : 'text-gray-600'}`}>
                <Clock size={18} />
                <span>00:{timeLeft.toString().padStart(2, '0')}</span>
             </div>
           </div>
           <button 
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 custom-scrollbar flex-1 flex flex-col">
          {/* Question Image - Object Contain to prevent cropping */}
          {row.imageUrl && (
            <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 flex justify-center items-center h-56 flex-shrink-0">
              <img src={row.imageUrl} alt="Gợi ý" className="w-full h-full object-contain" />
            </div>
          )}

          <div className="text-center mb-6 flex-grow flex items-center justify-center">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 leading-relaxed">
              {row.question}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
               <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value.toUpperCase());
                }}
                className="w-full text-center text-3xl font-mono tracking-widest p-4 border-b-4 border-red-200 focus:border-[#9b1106] outline-none uppercase bg-gray-50 text-black rounded-t-lg transition-colors placeholder-gray-300"
                placeholder={Array(row.answer.length).fill('_').join(' ')}
              />
              <p className="text-center text-gray-500 text-sm mt-2 font-medium">
                ({row.answer.length} ký tự)
              </p>
            </div>

            {/* Time's up or Manual Reveal */}
            {(timeLeft === 0 || showAnswerForce) && (
                 <div className="bg-yellow-50 text-yellow-800 p-2 rounded text-center text-sm border border-yellow-200 mb-2">
                    Đáp án là: <strong>{row.answer}</strong>. Hãy nhập vào để tiếp tục!
                 </div>
            )}

            <div className="flex gap-3 pt-2">
                {/* Reveal button if time is up or user gives up */}
               {timeLeft === 0 && !showAnswerForce && (
                    <button 
                        type="button"
                        onClick={handleReveal}
                        className="px-4 rounded-xl font-bold text-[#9b1106] border-2 border-[#9b1106] hover:bg-red-50 transition flex items-center justify-center gap-2"
                    >
                        <Eye size={18} />
                    </button>
               )}
               
               <button 
                 type="button"
                 onClick={onClose}
                 className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition"
               >
                 Bỏ qua
               </button>
               <button 
                 type="submit"
                 className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-[#9b1106] hover:bg-red-700 shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition transform active:scale-95"
               >
                 <Send size={18} />
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