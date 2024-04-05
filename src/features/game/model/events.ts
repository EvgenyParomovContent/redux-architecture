import { GameSymbol } from "./domain/game-symbol";

type MoveCompletedEvent = {
  type: "event/game/move-completed";
  payload: {
    index: number;
    symbol: GameSymbol;
  };
};

export type ModelEvents = MoveCompletedEvent;
