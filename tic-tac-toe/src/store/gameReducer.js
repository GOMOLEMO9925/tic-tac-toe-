// Initial state
export const initialState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  isDraw: false,
  scores: { X: 0, O: 0, draws: 0 },
  gameMode: 'pvp', // 'pvp' or 'pvc'
  aiDifficulty: 'easy', // 'easy' or 'hard'
  isAiThinking: false,
  gameHistory: [], // For potential undo feature
  timeRemaining: 10, // Timer in seconds
  timeoutPlayer: null, // Player who ran out of time
};

// Action types
export const ACTIONS = {
  MAKE_MOVE: 'MAKE_MOVE',
  RESET_GAME: 'RESET_GAME',
  RESET_SCORES: 'RESET_SCORES',
  SET_GAME_MODE: 'SET_GAME_MODE',
  SET_AI_DIFFICULTY: 'SET_AI_DIFFICULTY',
  AI_MOVE: 'AI_MOVE',
  SET_AI_THINKING: 'SET_AI_THINKING',
  TIMER_TICK: 'TIMER_TICK',
  RESET_TIMER: 'RESET_TIMER',
  TIMEOUT_LOSE: 'TIMEOUT_LOSE',
};

// Winning combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6], // Diagonals
];

// Check winner helper
const checkWinner = (board) => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

// Check draw helper
const checkDraw = (board) => {
  return board.every(cell => cell !== null);
};

// Minimax algorithm for hard AI
const minimax = (board, depth, isMaximizing, aiPlayer, humanPlayer) => {
  const winner = checkWinner(board);
  
  if (winner === aiPlayer) return 10 - depth;
  if (winner === humanPlayer) return depth - 10;
  if (checkDraw(board)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = aiPlayer;
        const score = minimax(board, depth + 1, false, aiPlayer, humanPlayer);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = humanPlayer;
        const score = minimax(board, depth + 1, true, aiPlayer, humanPlayer);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

// it is like getting the best move for the computer or AI
export const getBestMove = (board, aiPlayer, humanPlayer, difficulty) => {
  if (difficulty === 'easy') {
    // Random empty spot
    const emptyIndices = board.map((cell, idx) => cell === null ? idx : null).filter(val => val !== null);
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }

  // Hard mode - Minimax
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = aiPlayer;
      const score = minimax(board, 0, false, aiPlayer, humanPlayer);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
};

// Reducer
export const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_MOVE: {
      const { index } = action.payload;
      
      // Prevent move if game over or cell filled
      if (state.board[index] || state.winner || state.isDraw || state.isAiThinking) {
        return state;
      }

      const newBoard = [...state.board];
      newBoard[index] = state.currentPlayer;

      const winner = checkWinner(newBoard);
      const isDraw = !winner && checkDraw(newBoard);
      
      let newScores = { ...state.scores };
      if (winner) {
        newScores[winner]++;
      } else if (isDraw) {
        newScores.draws++;
      }

      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        isDraw,
        scores: newScores,
        gameHistory: [...state.gameHistory, { board: state.board, player: state.currentPlayer }],
        timeRemaining: 10, // Reset timer on move
        timeoutPlayer: null,
      };
    }

    case ACTIONS.AI_MOVE: {
      const aiPlayer = 'O';
      const humanPlayer = 'X';
      const moveIndex = getBestMove([...state.board], aiPlayer, humanPlayer, state.aiDifficulty);
      
      if (moveIndex === -1) return state;

      const newBoard = [...state.board];
      newBoard[moveIndex] = aiPlayer;

      const winner = checkWinner(newBoard);
      const isDraw = !winner && checkDraw(newBoard);
      
      let newScores = { ...state.scores };
      if (winner) {
        newScores[winner]++;
      } else if (isDraw) {
        newScores.draws++;
      }

      return {
        ...state,
        board: newBoard,
        currentPlayer: 'X',
        winner,
        isDraw,
        scores: newScores,
        isAiThinking: false,
        gameHistory: [...state.gameHistory, { board: state.board, player: 'O' }],
        timeRemaining: 10, // Reset timer on AI move
        timeoutPlayer: null,
      };
    }

    case ACTIONS.SET_AI_THINKING:
      return { ...state, isAiThinking: action.payload };

    case ACTIONS.RESET_GAME:
      return {
        ...state,
        board: Array(9).fill(null),
        currentPlayer: 'X',
        winner: null,
        isDraw: false,
        isAiThinking: false,
        gameHistory: [],
        timeRemaining: 10,
        timeoutPlayer: null,
      };

    case ACTIONS.RESET_SCORES:
      return {
        ...state,
        scores: { X: 0, O: 0, draws: 0 },
      };

    case ACTIONS.SET_GAME_MODE:
      return {
        ...initialState,
        gameMode: action.payload,
        scores: state.scores, // Keep scores when switching modes
      };

    case ACTIONS.SET_AI_DIFFICULTY:
      return {
        ...state,
        aiDifficulty: action.payload,
      };

    case ACTIONS.TIMER_TICK:
      return {
        ...state,
        timeRemaining: Math.max(0, state.timeRemaining - 1),
      };

    case ACTIONS.RESET_TIMER:
      return {
        ...state,
        timeRemaining: 10,
        timeoutPlayer: null,
      };

    case ACTIONS.TIMEOUT_LOSE: {
      const timeoutPlayer = state.currentPlayer;
      const winner = timeoutPlayer === 'X' ? 'O' : 'X';
      const newScores = { ...state.scores };
      newScores[winner]++;
      
      return {
        ...state,
        winner,
        timeoutPlayer,
        scores: newScores,
        timeRemaining: 0,
      };
    }

    default:
      return state;
  }
};