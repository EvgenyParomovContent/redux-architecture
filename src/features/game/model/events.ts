import { GameField } from "./domain/game-field";
import { GameStatus } from "./domain/game-status";

type MoveCompletedEvent = {
  type: "event/game/move-completed";
  payload: {
    gameField: GameField;
    gameStatus: GameStatus;
  };
};

export type ModelEvents = MoveCompletedEvent;
