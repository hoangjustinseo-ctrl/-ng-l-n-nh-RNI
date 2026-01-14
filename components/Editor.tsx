import React, { useState } from 'react';
import { GameConfig, CrosswordRow } from '../types';
import { HOMECOMING_TEMPLATE } from '../constants';
import { Plus, Trash2, Play, LayoutTemplate, Image as ImageIcon, Settings, Upload, Music, Trophy } from 'lucide-react';

interface EditorProps {
  initialConfig: GameConfig;
  onStartGame: (config: GameConfig) => void;
}

const Editor: React.FC<EditorProps> = ({ initialConfig, onStartGame }) => {
  const [config, setConfig] = useState<GameConfig>(initialConfig);
  const [activeTab, setActiveTab] = useState<'rows' | 'settings'>('settings');

  const handleApplyTemplate = () => {
    if (window.confirm('Bạn có chắc muốn áp dụng mẫu "Trở Về Nhà"? Dữ liệu hiện tại sẽ bị thay thế.')) {
      setConfig(JSON.parse(JSON.stringify(HOMECOMING_TEMPLATE)));
    }
  };

  const handleUpdateRow = (index: number, field: keyof CrosswordRow, value: string | number) => {
    const newRows = [...config.rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setConfig({ ...config, rows: newRows });
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateRow(index, 'imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConfig({...config, backgroundMusicUrl: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddRow = () => {
    const newRow: CrosswordRow = {
      id: `row-${Date.now()}`,
      question: "",
      answer: "",
      contributesAtIndex: 1,
      imageUrl: ""
    };
    setConfig({ ...config, rows: [...config.rows, newRow] });
  };

  const handleRemoveRow = (index: number) => {
    const newRows = config.rows.filter((_, i) => i !== index);
    setConfig({ ...config, rows: newRows });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-2 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#9b1106] p-6 flex flex-col md:flex-row justify-between items-center text-white border-b border-red-800">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Settings className="animate-spin-slow" /> Bảng Điều Khiển
            </h1>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button 
              onClick={handleApplyTemplate}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-[#9b1106] font-bold rounded-lg shadow flex items-center gap-2 transition"
            >
              <LayoutTemplate size={18} />
              Load Mẫu
            </button>
            <button 
              onClick={() => onStartGame(config)}
              className="px-6 py-2 bg-white text-[#9b1106] font-bold rounded-lg shadow hover:bg-red-50 flex items-center gap-2 transition"
            >
              <Play size={18} />
              Bắt đầu Game
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-50">
          <button 
            className={`px-8 py-4 font-semibold text-sm sm:text-base flex-1 sm:flex-none text-center ${activeTab === 'settings' ? 'text-[#9b1106] border-b-4 border-[#9b1106] bg-white' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('settings')}
          >
            Cấu hình chung
          </button>
          <button 
            className={`px-8 py-4 font-semibold text-sm sm:text-base flex-1 sm:flex-none text-center ${activeTab === 'rows' ? 'text-[#9b1106] border-b-4 border-[#9b1106] bg-white' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('rows')}
          >
            Bộ câu hỏi ({config.rows.length})
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 bg-gray-50 min-h-[500px]">
          
          {/* General Settings */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl mx-auto space-y-6 bg-white p-6 rounded-xl shadow-sm border">
              <div>
                <label className="block text-sm font-bold mb-2">Tiêu đề Game</label>
                <input 
                  type="text" 
                  value={config.title}
                  onChange={(e) => setConfig({...config, title: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#9b1106] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-[#9b1106]">Link Logo (Góc trên)</label>
                  <input 
                    type="text" 
                    placeholder="https://..."
                    value={config.logoUrl || ''}
                    onChange={(e) => setConfig({...config, logoUrl: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#9b1106] outline-none text-sm"
                  />
                </div>
                <div>
                   <label className="block text-sm font-bold mb-2 text-[#9b1106]">Link Ảnh Nền (Background)</label>
                   <input 
                    type="text" 
                    placeholder="https://..."
                    value={config.backgroundImageUrl || ''}
                    onChange={(e) => setConfig({...config, backgroundImageUrl: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#9b1106] outline-none text-sm"
                  />
                </div>
              </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-bold mb-2 flex items-center gap-2"><Music size={16}/> Nhạc nền (Link MP3)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={config.backgroundMusicUrl || ''}
                        onChange={(e) => setConfig({...config, backgroundMusicUrl: e.target.value})}
                        className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-[#9b1106] outline-none text-sm"
                      />
                      <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border rounded-lg px-3 flex items-center justify-center transition" title="Tải nhạc lên">
                        <Upload size={18} className="text-gray-600" />
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="audio/*" 
                          onChange={handleMusicUpload} 
                        />
                      </label>
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-bold mb-2 flex items-center gap-2"><Trophy size={16}/> Ảnh chiến thắng (Link)</label>
                    <input 
                      type="text" 
                      value={config.victoryImageUrl || ''}
                      onChange={(e) => setConfig({...config, victoryImageUrl: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#9b1106] outline-none text-sm"
                    />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-red-50 rounded-lg border border-red-100">
                <div>
                  <label className="block text-sm font-bold mb-2 text-[#9b1106]">TỪ KHÓA BÍ MẬT (Viết hoa)</label>
                  <input 
                    type="text" 
                    value={config.secretKeyword}
                    onChange={(e) => setConfig({...config, secretKeyword: e.target.value.toUpperCase()})}
                    className="w-full p-3 border-2 border-red-200 rounded-lg focus:ring-2 focus:ring-[#9b1106] outline-none font-mono uppercase font-bold tracking-widest text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-[#9b1106]">Gợi ý từ khóa (Text)</label>
                  <input 
                    type="text" 
                    value={config.secretHint}
                    onChange={(e) => setConfig({...config, secretHint: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#9b1106] outline-none"
                  />
                </div>
              </div>

              {/* Secret Hints Images Input (Simple implementation for now) */}
               <div>
                  <label className="block text-sm font-bold mb-2 text-[#9b1106]">Ảnh Gợi ý đặc biệt (Nhập link, phân cách bởi dấu phẩy)</label>
                  <input 
                    type="text" 
                    placeholder="https://image1.jpg, https://image2.jpg"
                    value={config.secretHintImages ? config.secretHintImages.join(', ') : ''}
                    onChange={(e) => setConfig({...config, secretHintImages: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#9b1106] outline-none text-sm"
                  />
                </div>

            </div>
          )}

          {/* Rows Editor */}
          {activeTab === 'rows' && (
            <div className="space-y-4">
              {config.rows.map((row, index) => (
                <div key={row.id} className="p-4 border rounded-xl bg-white flex flex-col gap-4 shadow-sm hover:shadow-md transition border-gray-100">
                  <div className="flex items-start gap-4">
                     <div className="w-8 h-8 flex-shrink-0 bg-[#9b1106] text-white rounded-full flex items-center justify-center font-bold mt-1">
                      {index + 1}
                    </div>
                    
                    <div className="flex-grow space-y-3">
                      {/* Row 1: Question and Image */}
                      <div className="flex flex-col md:flex-row gap-2">
                         <input 
                          type="text" 
                          placeholder="Nhập câu hỏi..."
                          value={row.question}
                          onChange={(e) => handleUpdateRow(index, 'question', e.target.value)}
                          className="flex-[2] p-2 border rounded focus:ring-1 focus:ring-[#9b1106] outline-none font-medium"
                        />
                        <div className="flex-1 flex items-center gap-2 border rounded p-1 px-2 bg-gray-50 hover:bg-white transition focus-within:ring-1 focus-within:ring-[#9b1106]">
                           <ImageIcon size={16} className="text-gray-400" />
                           <input 
                            type="text" 
                            placeholder="Link ảnh minh họa..."
                            value={row.imageUrl || ''}
                            onChange={(e) => handleUpdateRow(index, 'imageUrl', e.target.value)}
                            className="w-full bg-transparent outline-none text-sm"
                          />
                          <label className="cursor-pointer hover:text-[#9b1106] transition p-1 hover:bg-red-50 rounded" title="Tải ảnh lên">
                            <Upload size={16} />
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*" 
                              onChange={(e) => handleImageUpload(index, e)} 
                            />
                          </label>
                        </div>
                      </div>

                      {/* Row 2: Answer and Index */}
                      <div className="flex flex-col md:flex-row gap-4 items-center bg-gray-50 p-3 rounded-lg">
                        <div className="flex-1 w-full">
                           <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Đáp án</label>
                           <input 
                            type="text" 
                            placeholder="VIETHOA"
                            value={row.answer}
                            onChange={(e) => handleUpdateRow(index, 'answer', e.target.value.toUpperCase().replace(/\s/g, ''))}
                            className="w-full p-2 border rounded focus:ring-1 focus:ring-[#9b1106] outline-none font-mono uppercase bg-white font-bold text-[#9b1106] tracking-widest"
                          />
                        </div>
                        
                        <div className="w-full md:w-auto">
                           <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Vị trí khóa (1-{row.answer.length || 1})</label>
                           <input 
                            type="number" 
                            min="1"
                            max={row.answer.length || 1}
                            value={row.contributesAtIndex}
                            onChange={(e) => handleUpdateRow(index, 'contributesAtIndex', parseInt(e.target.value) || 1)}
                            className="w-full md:w-32 p-2 border rounded outline-none text-center font-bold text-white bg-yellow-500"
                          />
                        </div>

                         <div className="hidden md:block text-2xl text-gray-300">→</div>

                         <div className="flex items-center justify-center h-10 px-4 bg-white border border-gray-200 rounded text-sm text-gray-500">
                            Ký tự khóa: <strong className="ml-2 text-xl text-[#9b1106]">{row.answer[row.contributesAtIndex - 1] || '?'}</strong>
                         </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleRemoveRow(index)}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition self-start"
                      title="Xóa câu hỏi này"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}

              <button 
                onClick={handleAddRow}
                className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 hover:text-[#9b1106] hover:border-[#9b1106] hover:bg-red-50 transition flex items-center justify-center gap-2 font-semibold"
              >
                <Plus size={24} />
                Thêm câu hỏi mới
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Editor;