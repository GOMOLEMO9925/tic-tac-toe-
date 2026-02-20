import React from 'react';
import './Status.css';

const Status = ({ winner, isDraw, currentPlayer, isAiThinking, timeRemaining, timeoutPlayer }) => {
  let message;
  let statusClass = '';
  let timerDisplay = null;

  // Determine timer color: green (>6s), yellow (3-6s), red (<3s)
  const getTimerColor = () => {
    if (timeRemaining > 6) return 'timer-green';
    if (timeRemaining > 3) return 'timer-yellow';
    return 'timer-red';
  };

  // Show timer if game is active (not over, not draw, not AI thinking)
  if (!winner && !isDraw && !isAiThinking) {
    timerDisplay = (
      <div className={`timer-display ${getTimerColor()} ${timeRemaining < 3 ? 'timer-pulse' : ''}`}>
        ⏰ {timeRemaining}s
      </div>
    );
  }

  if (isAiThinking) {
    message = '🤖 Computer is thinking...';
    statusClass = 'thinking';
  } else if (timeoutPlayer) {
    const winner = timeoutPlayer === 'X' ? 'O' : 'X';
    message = `⏰ ${timeoutPlayer} ran out of time! ${winner} Wins!`;
    statusClass = 'timeout';
  } else if (winner) {
    message = `🎉 Winner: ${winner}!`;
    statusClass = 'winner';
  } else if (isDraw) {
    message = '🤝 Draw!';
    statusClass = 'draw';
  } else {
    message = `Next Player: ${currentPlayer}`;
    statusClass = currentPlayer === 'X' ? 'player-x' : 'player-o';
  }

  return (
    <div className={`status ${statusClass}`}>
      {message}
      {timerDisplay}
    </div>
  );
};

export default Status;