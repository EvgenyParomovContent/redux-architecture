import { GameSymbol } from "./game-symbol";

export type GameStatusInProgress = {
  type: "in-progress";
  symbol: GameSymbol;
};

export type GameStatusGameOver = {
  type: "game-over";
  winner: GameSymbol;
  winnerIndexes: number[];
};

export type GameStatus = GameStatusInProgress | GameStatusGameOver;

export const MOVE_ORDER = [
  GameSymbol.CROSS,
  GameSymbol.ZERO,
  GameSymbol.TRINGLE,
  GameSymbol.SQUARE,
] as const;

export function getNextGameSymbol(
  symbol: GameSymbol,
  symbolsInGame: readonly GameSymbol[] = MOVE_ORDER,
) {
  const symbols = symbolsInGame.length;
  const nextIndex =
    MOVE_ORDER.filter((orderSymbol) =>
      symbolsInGame.includes(orderSymbol),
    ).indexOf(symbol) + 1;
  const newGameSymbol = MOVE_ORDER[nextIndex % symbols];

  return newGameSymbol;
}

export const getInitialGameStatus = (): GameStatus => ({
  type: "in-progress",
  symbol: GameSymbol.CROSS,
});
