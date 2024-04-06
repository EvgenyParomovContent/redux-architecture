import { GameSymbol } from "./game-symbol";

export type GameStatus = {
  symbol: GameSymbol;
};

export const MOVE_ORDER = [
  GameSymbol.CROSS,
  GameSymbol.ZERO,
  GameSymbol.TRINGLE,
  GameSymbol.SQUARE,
] as const;

export function getNextGameStatus(
  { symbol }: GameStatus,
  symbolsInGame: readonly GameSymbol[] = MOVE_ORDER,
) {
  const symbols = symbolsInGame.length;
  const nextIndex =
    MOVE_ORDER.filter((orderSymbol) =>
      symbolsInGame.includes(orderSymbol),
    ).indexOf(symbol) + 1;
  const newGameSymbol = MOVE_ORDER[nextIndex % symbols];

  return {
    symbol: newGameSymbol,
  };
}

export const getInitialGameStatus = (): GameStatus => ({
  symbol: GameSymbol.CROSS,
});
