import { createSelector } from "@reduxjs/toolkit";
import { gameSlice } from "../../store";

export const selectCanStart = createSelector(
  gameSlice.selectors.selectLastGameStatus,
  (gameStatus) => {
    return gameStatus.type === "idle";
  },
);
