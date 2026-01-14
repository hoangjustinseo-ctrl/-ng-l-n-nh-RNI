import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Image as ImageIcon } from 'lucide-react';
import { CrosswordRow } from '../types';

interface AnswerModalProps {
  row: CrosswordRow | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (answer: string) => void;
}

const AnswerModal: React.FC<AnswerModalProps> = ({ row, isOpen, onClose, onSubmit }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && row) {
      setInput('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, row]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input.trim());
  };

  if (!isOpen || !row) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-pop flex flex-col max-h-[90vh]">
        
        {/* Header with optional image */}
        <div className="bg-red-50 p-4 border-b border-red-100 flex justify-between items-start">
           <div className="text-[#9b1106] font-bold uppercase text-xs tracking-wider">
             Câu hỏi số {row.id.split('-').pop()}
           </div>
           <button 
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 custom-scrollbar">
          {/* Question Image */}
          {row.imageUrl && (
            <div className="mb-4 rounded-lg overflow-hidden shadow-md border border-gray-100">
              <img src={row.imageUrl} alt="Gợi ý" className="w-full h-48 object-cover" />
            </div>
          )}

          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 leading-relaxed">
              {row.question}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex gap-3 pt-2">
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