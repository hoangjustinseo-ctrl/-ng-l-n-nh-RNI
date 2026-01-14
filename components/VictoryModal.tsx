import React from 'react';
import { Trophy, X, Star } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  videoUrl: string; // Kept for types but we prefer image now
  victoryImageUrl?: string;
  onClose: () => void;
  secretKeyword: string;
}

const VictoryModal: React.FC<VictoryModalProps> = ({ isOpen, videoUrl, victoryImageUrl, onClose, secretKeyword }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with dark overlay */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fade-in" onClick={onClose}>
        {/* CSS Confetti Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {[...Array(30)].map((_, i) => (
             <div 
               key={i}
               className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-float"
               style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
                 animationDelay: `${Math.random() * 2}s`,
                 animationDuration: `${3 + Math.random() * 2}s`,
                 backgroundColor: ['#FBBF24', '#34D399', '#60A5FA', '#F87171', '#ffffff'][Math.floor(Math.random() * 5)]
               }}
             ></div>
           ))}
        </div>
      </div>

      {/* Modal Content - Maximized Width */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[95vw] lg:max-w-[1400px] overflow-hidden animate-pop border-4 border-yellow-400/50">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-200 z-50 bg-black/50 hover:bg-red-600 rounded-full p-2 transition"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row h-[85vh] lg:h-[700px]">
          
          {/* Left Side: Text */}
          <div className="w-full lg:w-[30%] bg-gradient-to-br from-[#9b1106] to-[#5a0a03] text-white p-6 flex flex-col items-center justify-center text-center relative overflow-hidden z-10">
             
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-300 via-transparent to-transparent animate-pulse"></div>
             
             <div className="relative z-10 mb-6 transform hover:scale-110 transition duration-500">
                <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-20 rounded-full"></div>
                <Trophy size={80} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
             </div>

             {/* Reduced Font Size Here */}
             <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 uppercase tracking-tighter drop-shadow-sm leading-tight">
               Chiến Thắng!
             </h2>
             
             <div className="bg-black/20 px-6 py-6 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner w-full">
               <div className="text-xs text-red-300 uppercase tracking-widest mb-2">Từ khóa bí mật</div>
               <span className="text-3xl lg:text-4xl font-mono font-bold tracking-[0.1em] text-white drop-shadow-md break-all leading-relaxed">
                 {secretKeyword}
               </span>
             </div>

             <div className="mt-8 flex gap-4">
                <Star className="text-yellow-400 w-6 h-6 fill-yellow-400 animate-bounce" style={{animationDelay: '0.1s'}} />
                <Star className="text-yellow-400 w-6 h-6 fill-yellow-400 animate-bounce" style={{animationDelay: '0.2s'}} />
                <Star className="text-yellow-400 w-6 h-6 fill-yellow-400 animate-bounce" style={{animationDelay: '0.3s'}} />
             </div>
          </div>

          {/* Right Side: Image */}
          <div className="w-full lg:w-[70%] bg-black flex items-center justify-center relative shadow-inner overflow-hidden">
             {victoryImageUrl ? (
               <img 
                 src={victoryImageUrl}
                 alt="Victory"
                 className="w-full h-full object-contain" 
               />
             ) : (
               videoUrl ? (
                 <iframe 
                   className="w-full h-full"
                   src={videoUrl} 
                   title="Victory Video"
                   frameBorder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen
                 ></iframe>
               ) : (
                 <div className="text-gray-500">No content</div>
               )
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictoryModal;