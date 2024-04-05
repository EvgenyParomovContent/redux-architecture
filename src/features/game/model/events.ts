import { GameSymbol } from "./domain/game-symbol";

type MoveCompletedAction = {
  type: "game/move-completed";
  payload: {
    index: number;
    symbol: GameSymbol;
  };
};

export type ModelEvents = MoveCompletedAction;
