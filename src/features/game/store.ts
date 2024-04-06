import { legacy_createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import { ModelEvents } from "./model/events";
import { GameStatus, getInitialGameStatus } from "./model/domain/game-status";
import { createEmptyGameField, GameField } from "./model/domain/game-field";

// State
type GameState = {
  gameField: GameField;
  gameStatus: GameStatus;
};

// Reducer

const initialState: GameState = {
  gameField: createEmptyGameField(),
  gameStatus: getInitialGameStatus(),
};

const gameReducer = (state = initialState, action: ModelEvents): GameState => {
  switch (action.type) {
    case "event/game/move-completed": {
      return {
        ...state,
        gameField: action.payload.gameField,
        gameStatus: action.payload.gameStatus,
      };
    }
    default:
      return state;
  }
};

// Selectors
export const selectGameField = (gameState: GameState) => gameState.gameField;
export const selectGameStatus = (gameState: GameState) => gameState.gameStatus;

// Store
export const store = legacy_createStore(gameReducer, composeWithDevTools());
