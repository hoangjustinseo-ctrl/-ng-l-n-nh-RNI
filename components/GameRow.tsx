import React from 'react';
import { CrosswordRow } from '../types';
import { Check } from 'lucide-react';

interface GameRowProps {
  row: CrosswordRow;
  index: number;
  isSolved: boolean;
  isActive: boolean;
  onSelect: () => void;
  revealAll: boolean;
}

const GameRow: React.FC<GameRowProps> = ({ row, index, isSolved, isActive, onSelect, revealAll }) => {
  const chars = row.answer.split('');
  // Safety check: Clamp index to valid range
  const validIndex = Math.max(1, Math.min(row.contributesAtIndex, chars.length));
  const contributeIndex = validIndex - 1; // Convert to 0-based

  // Split characters into three groups: Before Key, The Key, After Key
  const beforeChars = chars.slice(0, contributeIndex);
  const keyChar = chars[contributeIndex];
  const afterChars = chars.slice(contributeIndex + 1);

  // Common dimensions for cells
  const cellClass = "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12";

  // Helper to render a cell
  const renderCell = (char: string, idx: number, isKey: boolean = false) => {
    const showChar = isSolved || revealAll;
    return (
      <div
        key={idx}
        className={`
          relative ${cellClass} flex items-center justify-center flex-shrink-0
          text-lg sm:text-2xl font-extrabold rounded-md shadow-sm transition-all duration-500
          perspective-1000 border border-white/20
          ${isKey ? 'ring-2 sm:ring-4 ring-yellow-400 z-10 scale-105' : 'bg-white/10'}
          ${showChar 
            ? 'bg-white text-black' 
            : (isKey ? 'bg-[#7a0d05]/90' : 'bg-[#9b1106]/40') + ' text-transparent'}
        `}
      >
        <div className={`w-full h-full flex items-center justify-center transition-all duration-700 transform ${showChar ? 'rotate-y-0' : 'rotate-y-180'}`}>
           <span className={showChar ? 'opacity-100' : 'opacity-0'}>
             {char}
           </span>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="flex items-center w-full justify-center mb-2 sm:mb-3 relative group"
    >
      {/* Absolute Question Number Button - Floating left */}
      <div className="absolute left-2 sm:left-4 lg:left-0 lg:-translate-x-full pr-4 flex items-center h-full z-20 pointer-events-none">
        <button
          onClick={(e) => {
             e.stopPropagation(); 
             onSelect();
          }}
          className={`
            pointer-events-auto
            w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-md transition-all duration-300
            ${isSolved 
              ? 'bg-yellow-400 text-[#9b1106]' 
              : isActive 
                ? 'bg-white text-[#9b1106] scale-110' 
                : 'bg-white/90 text-[#9b1106] hover:bg-white'}
          `}
        >
          {isSolved ? <Check size={16} /> : (index + 1)}
        </button>
      </div>

      {/* The Row Container */}
      <div 
        className="flex items-center cursor-pointer p-1 sm:p-2 rounded-lg transition-colors duration-300 hover:bg-white/5 w-full max-w-[95vw] sm:max-w-4xl"
        onClick={onSelect}
        style={{
          backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
          boxShadow: isActive ? '0 0 15px rgba(255,255,255,0.1)' : 'none'
        }}
      >
        {/* Left Side (50% Width - Align End) */}
        <div className="flex-1 flex justify-end gap-1 sm:gap-2 pr-1 sm:pr-2">
          {beforeChars.map((c, i) => renderCell(c, i))}
        </div>

        {/* The Key Column (Fixed Width - Center) */}
        <div className={`flex-shrink-0 ${cellClass} flex items-center justify-center`}>
          {keyChar ? renderCell(keyChar, 999, true) : <div className="w-full h-full" />}
        </div>

        {/* Right Side (50% Width - Align Start) */}
        <div className="flex-1 flex justify-start gap-1 sm:gap-2 pl-1 sm:pl-2">
           {afterChars.map((c, i) => renderCell(c, i + contributeIndex + 1))}
        </div>
      </div>
    </div>
  );
};

export default GameRow;