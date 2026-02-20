import React from 'react';
import './Square.css';

const Square = ({ value, onClick, isWinningSquare }) => {
  return (
    <button 
      className={`square ${value ? 'filled' : ''} ${isWinningSquare ? 'winning' : ''}`}
      onClick={onClick}
      disabled={!!value}
      data-value={value || ''}
    >
      {value}
    </button>
  );
};

export default Square;