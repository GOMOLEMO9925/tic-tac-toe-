import React from 'react';
import './GameControls.css';

const GameControls = ({ 
  gameMode, 
  setGameMode, 
  aiDifficulty, 
  setAiDifficulty,
  onResetGame 
}) => {
  return (
    <div className="game-controls">
      <div className="mode-selector">
        <button 
          className={gameMode === 'pvp' ? 'active' : ''}
          onClick={() => setGameMode('pvp')}
        >
          👥 vs Player
        </button>
        <button 
          className={gameMode === 'pvc' ? 'active' : ''}
          onClick={() => setGameMode('pvc')}
        >
          🤖 vs Computer
        </button>
      </div>

      {gameMode === 'pvc' && (
        <div className="difficulty-selector">
          <span>Difficulty:</span>
          <button 
            className={aiDifficulty === 'easy' ? 'active' : ''}
            onClick={() => setAiDifficulty('easy')}
          >
            Easy
          </button>
          <button 
            className={aiDifficulty === 'hard' ? 'active' : ''}
            onClick={() => setAiDifficulty('hard')}
          >
            Hard (Minimax)
          </button>
        </div>
      )}

      <button className="restart-btn" onClick={onResetGame}>
        🔄 Restart Game
      </button>
    </div>
  );
};

export default GameControls;