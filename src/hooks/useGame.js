import { useReducer, useEffect, useCallback, useRef } from 'react';
import { gameReducer, initialState, ACTIONS } from '../store/gameReducer';

export const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const stateRef = useRef(state);
  
  // Keep ref updated with latest state
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Handle timer
  useEffect(() => {
    // Pause timer if game over, draw, or AI thinking
    if (state.winner || state.isDraw || state.isAiThinking) {
      return;
    }

    // Timer tick every second
    const interval = setInterval(() => {
      const currentState = stateRef.current;
      if (currentState.timeRemaining > 0) {
        dispatch({ type: ACTIONS.TIMER_TICK });
      } else if (!currentState.winner && !currentState.isDraw) {
        // Time ran out - current player loses
        dispatch({ type: ACTIONS.TIMEOUT_LOSE });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.winner, state.isDraw, state.isAiThinking]);

  // Handle AI moves
  useEffect(() => {
    if (
      state.gameMode === 'pvc' &&
      state.currentPlayer === 'O' &&
      !state.winner &&
      !state.isDraw
    ) {
      dispatch({ type: ACTIONS.SET_AI_THINKING, payload: true });
      
      const timer = setTimeout(() => {
        dispatch({ type: ACTIONS.AI_MOVE });
      }, 600); // Slight delay for realism

      return () => clearTimeout(timer);
    }
  }, [state.currentPlayer, state.gameMode, state.winner, state.isDraw]);

  const makeMove = useCallback((index) => {
    dispatch({ type: ACTIONS.MAKE_MOVE, payload: { index } });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_GAME });
  }, []);

  const resetScores = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_SCORES });
  }, []);

  const setGameMode = useCallback((mode) => {
    dispatch({ type: ACTIONS.SET_GAME_MODE, payload: mode });
  }, []);

  const setAiDifficulty = useCallback((difficulty) => {
    dispatch({ type: ACTIONS.SET_AI_DIFFICULTY, payload: difficulty });
  }, []);

  return {
    state,
    makeMove,
    resetGame,
    resetScores,
    setGameMode,
    setAiDifficulty,
  };
};