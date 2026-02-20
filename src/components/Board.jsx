import React from 'react';
import Square from './Square';
import './Board.css';

const Board = ({ board, onSquareClick, winner }) => {
  // Calculate winning line for highlighting
  const getWinningLine = () => {
    if (!winner) return [];
    
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return line;
      }
    }
    return [];
  };

  const winningLine = getWinningLine();

  return (
    <div className="board">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          isWinningSquare={winningLine.includes(index)}
        />
      ))}
    </div>
  );
};

export default Board;