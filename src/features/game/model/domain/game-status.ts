import { DateISOString } from "@/shared/types";
import { GameSymbol } from "./game-symbol";

export type ActivePlayers = GameSymbol[];
export type GameStatusIdle = {
  type: "idle";
};

export type GameStatusInProgress = {
  type: "in-progress";
  symbol: GameSymbol;
  moveStartedAt: DateISOString;
  activePlayers: ActivePlayers;
};

export type GameStatusGameOver = {
  type: "game-over";
  winner: GameSymbol;
  winnerIndexes?: number[];
};

export type GameStatus =
  | GameStatusInProgress
  | GameStatusGameOver
  | GameStatusIdle;

export const MOVE_ORDER = [
  GameSymbol.CROSS,
  GameSymbol.ZERO,
  GameSymbol.TRINGLE,
  GameSymbol.SQUARE,
] as const;

export function getNextGameSymbol(
  symbol: GameSymbol,
  activePlayers: ActivePlayers,
) {
  const symbols = activePlayers.length;
  const nextIndex =
    activePlayers
      .filter((orderSymbol) => activePlayers.includes(orderSymbol))
      .indexOf(symbol) + 1;
  const newGameSymbol = activePlayers[nextIndex % symbols];

  return newGameSymbol;
}

export const getInitialGameStatus = (): GameStatus => ({
  type: "idle",
});

export const checkOneActivePlayer = (
  activePlayers: ActivePlayers,
): activePlayers is [GameSymbol] => activePlayers.length === 1;

export const removePlayerFromGame = (
  activePlayers: ActivePlayers,
  symbol: GameSymbol,
) => {
  return activePlayers.filter((p) => p !== symbol);
};
