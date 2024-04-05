import { legacy_createStore } from "redux";
import {
  createEmptyGameField,
  GameField,
  updateGameCell,
} from "./domain/game-field";
import { GameSymbol } from "./domain/game-symbol";

import { composeWithDevTools } from "@redux-devtools/extension";

// State
type GameState = {
  gameField: GameField;
};

// Actions

type UpdateCellAction = {
  type: "game/update-cell";
  payload: {
    index: number;
    symbol: GameSymbol;
  };
};

type GameAction = UpdateCellAction;

// Reducer

const initialState: GameState = {
  gameField: createEmptyGameField(),
};

const gameReducer = (state = initialState, action: GameAction): GameState => {
  switch (action.type) {
    case "game/update-cell": {
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
