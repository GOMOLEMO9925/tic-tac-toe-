import React from 'react';
import './Scoreboard.css';

const Scoreboard = ({ scores, onResetScores, currentPlayer }) => {
  return (
    <div className="scoreboard">
      <h3>Scoreboard</h3>
      <div className="scores">
        <div className={`score-item ${currentPlayer === 'X' ? 'active' : ''}`}>
          <span className="player-label">Player X</span>
          <span className="score-value">{scores.X}</span>
        </div>
        <div className="score-item draws">
          <span className="player-label">Draws</span>
          <span className="score-value">{scores.draws}</span>
        </div>
        <div className={`score-item ${currentPlayer === 'O' ? 'active' : ''}`}>
          <span className="player-label">Player O</span>
          <span className="score-value">{scores.O}</span>
        </div>
      </div>
      <button className="reset-scores-btn" onClick={onResetScores}>
        Reset Scores
      </button>
    </div>
  );
};

export default Scoreboard;