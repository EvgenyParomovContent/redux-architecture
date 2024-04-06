import { GameField } from "./domain/game-field";
import { GameStatusGameOver, GameStatusInProgress } from "./domain/game-status";

type MoveCompletedEvent = {
  type: "event/game/move-completed";
  payload: {
    gameField: GameField;
    gameStatus: GameStatusInProgress;
  };
};

type GameOverEvent = {
  type: "event/game/over";
  payload: {
    gameField: GameField;
    gameStatus: GameStatusGameOver;
  };
};

export type ModelEvents = MoveCompletedEvent | GameOverEvent;

export type ModelDispatch = (event: ModelEvents) => void;
