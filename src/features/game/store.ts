import { legacy_createStore } from "redux";
import {
  createEmptyGameField,
  GameField,
  updateGameCell,
} from "./model/domain/game-field";

import { composeWithDevTools } from "@redux-devtools/extension";
import { ModelEvents } from "./model/events";

// State
type GameState = {
  gameField: GameField;
};

// Reducer

const initialState: GameState = {
  gameField: createEmptyGameField(),
};

const gameReducer = (state = initialState, action: ModelEvents): GameState => {
  switch (action.type) {
    case "game/move-completed": {
      return {
        ...state,
        gameField: updateGameCell(
          state.gameField,
          action.payload.index,
          action.payload.symbol,
        ),
      };
    }
    default:
      return state;
  }
};

// Selectors
export const selectGameField = (gameState: GameState) => gameState.gameField;

// Store
export const store = legacy_createStore(gameReducer, composeWithDevTools());
