import { createSelector } from "@reduxjs/toolkit";
import {
  canBack,
  GameHistory,
  canBackToGame,
  canForward,
} from "../domain/game-history";
import { gameSlice } from "../../store";

export type GameHistoryControls = {
  canBack: boolean;
  canForward: boolean;
  canBackToGame: boolean;
  current: number;
  total: number;
};

export const selectGameHistoryControls = createSelector(
  gameSlice.selectors.selectGameHistory,
  (history: GameHistory): GameHistoryControls => {
    return {
      canBack: canBack(history),
      canBackToGame: canBackToGame(history),
      canForward: canForward(history),
      current: history.currentIndex + 1,
      total: history.lastIndex + 1,
    };
  },
);
