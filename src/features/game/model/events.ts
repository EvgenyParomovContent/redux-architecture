import { createAction } from "@reduxjs/toolkit";
import { GameField } from "./domain/game-field";
import { GameHistory } from "./domain/game-history";
import { GameStatusGameOver, GameStatusInProgress } from "./domain/game-status";

export const moveCompletedEvent = createAction<{
  gameField: GameField;
  gameStatus: GameStatusInProgress;
}>("event/game/move-completed");

export const gameOverEvent = createAction<{
  gameField: GameField;
  gameStatus: GameStatusGameOver;
}>("event/game/over");

export const historyViewedEvent = createAction<GameHistory>(
  "event/game/history-viewed",
);
export const gameViewedEvent = createAction("event/game/game-viewed");
