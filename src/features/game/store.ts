import {
  gameOverEvent,
  gameViewedEvent,
  historyViewedEvent,
  moveCompletedEvent,
} from "./model/events";
import { GameStatus, getInitialGameStatus } from "./model/domain/game-status";
import { createEmptyGameField, GameField } from "./model/domain/game-field";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { slicesRegistry } from "@/shared/store";
import { GameHistory } from "./model/domain/game-history";

// State
type GameState = {
  history: {
    gameField: GameField;
    gameStatus: GameStatus;
  }[];
  activeIndex: number;
};

const initialState: GameState = {
  history: [
    {
      gameField: createEmptyGameField(),
      gameStatus: getInitialGameStatus(),
    },
  ],
  activeIndex: 0,
};

export const gameSlice = createSlice({
  name: "features/game",
  initialState,
  reducers: {},
  selectors: {
    selectGameField: (state): GameField =>
      state.history[state.activeIndex].gameField,
    selectGameStatus: (state): GameStatus =>
      state.history[state.activeIndex].gameStatus,
    selectGameHistory: (state): GameHistory => {
      return {
        currentIndex: state.activeIndex,
        lastIndex: state.history.length - 1,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(historyViewedEvent, (state, action) => {
      state.activeIndex = action.payload.currentIndex;
    });
    builder.addCase(gameViewedEvent, (state) => {
      state.activeIndex = state.history.length - 1;
    });
    builder.addMatcher(
      isAnyOf(moveCompletedEvent, gameOverEvent),
      (state, action) => {
        state.history.push({
          gameField: action.payload.gameField,
          gameStatus: action.payload.gameStatus,
        });
        state.activeIndex++;
      },
    );
  },
});

slicesRegistry.inject(gameSlice);
