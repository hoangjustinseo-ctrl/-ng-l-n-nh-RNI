import React, { useState } from 'react';
import { GameConfig } from './types';
import { HOMECOMING_TEMPLATE } from './constants';
import Editor from './components/Editor';
import GameBoard from './components/GameBoard';

const App: React.FC = () => {
  const [mode, setMode] = useState<'editor' | 'play'>('editor');
  
  // Default load with the HOMECOMING template as requested in the "demo" prompt
  // But allowing editing first
  const [gameConfig, setGameConfig] = useState<GameConfig>(HOMECOMING_TEMPLATE);

  const handleStartGame = (config: GameConfig) => {
    setGameConfig(config);
    setMode('play');
  };

  const handleBackToEditor = () => {
    setMode('editor');
  };

  return (
    <div className="min-h-screen">
      {mode === 'editor' ? (
        <Editor 
          initialConfig={gameConfig} 
          onStartGame={handleStartGame} 
        />
      ) : (
        <GameBoard 
          config={gameConfig} 
          onBackToEditor={handleBackToEditor} 
        />
      )}
    </div>
  );
};

export default App;