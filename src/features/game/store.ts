import { legacy_createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import { ModelEvents } from "./model/events";
import { GameStatus, getInitialGameStatus } from "./model/domain/game-status";
import { createEmptyGameField, GameField } from "./model/domain/game-field";
import { GameHistory } from "./model/domain/game-history";

// State
type GameState = {
  history: {
    gameField: GameField;
    gameStatus: GameStatus;
  }[];
  activeIndex: number;
};

// Reducer

const initialState: GameState = {
  history: [
    {
      gameField: createEmptyGameField(),
      gameStatus: getInitialGameStatus(),
    },
  ],
  activeIndex: 0,
};

const gameReducer = (state = initialState, action: ModelEvents): GameState => {
  switch (action.type) {
    case "event/game/over":
    case "event/game/move-completed": {
      return {
        ...state,
        history: state.history.concat([
          {
            gameField: action.payload.gameField,
            gameStatus: action.payload.gameStatus,
          },
        ]),
        activeIndex: state.activeIndex + 1,
      };
    }
    case "event/game/history-viewed": {
      return {
        ...state,
        activeIndex: action.payload.currentIndex,
      };
    }
    case "event/game/game-viewed": {
      return {
        ...state,
        activeIndex: state.history.length - 1,
      };
    }
    default:
      return state;
  }
};

// Selectors
export const selectGameField = (gameState: GameState) =>
  gameState.history[gameState.activeIndex].gameField;

export const selectGameStatus = (gameState: GameState) =>
  gameState.history[gameState.activeIndex].gameStatus;

export const selectGameHistory = (gameState: GameState): GameHistory => {
  return {
    currentIndex: gameState.activeIndex,
    lastIndex: gameState.history.length - 1,
  };
};

// Store
export const store = legacy_createStore(gameReducer, composeWithDevTools());
