import { createSelector } from "@reduxjs/toolkit";
import { GameStatus } from "../domain/game-status";
import { gameSlice } from "../../store";

export const selectGameWinnerInfo = createSelector(
  gameSlice.selectors.selectGameStatus,
  (gameStatus: GameStatus) => {
    if (gameStatus.type === "game-over") {
      return {
        winner: gameStatus.winner,
      };
    }

    return undefined;
  },
);
