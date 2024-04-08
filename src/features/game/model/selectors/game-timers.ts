import { createSelector } from "@reduxjs/toolkit";
import { gameSlice } from "../../store";
import { AppState } from "@/shared/store";
import { updateTimer } from "../domain/game-timers";

const selectNow = (_: AppState, { now }: { now?: number }) => now;

export const selectGameTimers = createSelector(
  gameSlice.selectors.selectLastGameStatus,
  gameSlice.selectors.selectGameTimers,
  selectNow,
  (gameStatus, gameTimers, nowMs) => {
    let newGameTimers = gameTimers;
    if (gameStatus.type === "in-progress" && nowMs) {
      const now = new Date(nowMs).toISOString();
      newGameTimers = updateTimer({
        gameTimers,
        now,
        startAt: gameStatus.moveStartedAt,
        symbol: gameStatus.symbol,
        increment: 0,
      });
    }

    return newGameTimers;
  },
);
