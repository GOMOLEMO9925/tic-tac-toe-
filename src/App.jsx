import React from 'react';
import { useGame } from './hooks/useGame';
import Board from './components/Board';
import Status from './components/Status';
import Scoreboard from './components/Scoreboard';
import GameControls from './components/GameControls';
import './App.css';

function App() {
  const { 
    state, 
    makeMove, 
    resetGame, 
    resetScores, 
    setGameMode, 
    setAiDifficulty 
  } = useGame();

  return (
    <div className="app">
      <div className="game-container">
        <h1>🎮 Tic Tac Toe</h1>
        
        <GameControls
          gameMode={state.gameMode}
          setGameMode={setGameMode}
          aiDifficulty={state.aiDifficulty}
          setAiDifficulty={setAiDifficulty}
          onResetGame={resetGame}
        />

        <Scoreboard 
          scores={state.scores}
          onResetScores={resetScores}
          currentPlayer={state.currentPlayer}
        />

        <Status 
          winner={state.winner}
          isDraw={state.isDraw}
          currentPlayer={state.currentPlayer}
          isAiThinking={state.isAiThinking}
          timeRemaining={state.timeRemaining}
          timeoutPlayer={state.timeoutPlayer}
        />

        <Board 
          board={state.board}
          onSquareClick={makeMove}
          winner={state.winner}
        />

        <div className="footer">
          <p>Built with React + useReducer</p>
        </div>
      </div>
    </div>
  );
}

export default App;