import { GameField } from "./domain/game-field";
import { GameHistory } from "./domain/game-history";
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

type HistoryViewed = {
  type: "event/game/history-viewed";
  payload: GameHistory;
};

type GameViewed = {
  type: "event/game/game-viewed";
};

export type ModelEvents =
  | MoveCompletedEvent
  | GameOverEvent
  | HistoryViewed
  | GameViewed;

export type ModelDispatch = (event: ModelEvents) => void;
