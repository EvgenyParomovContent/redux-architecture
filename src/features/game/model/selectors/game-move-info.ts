import { GameStatus, getNextGameSymbol } from "../domain/game-status";

export function selectGameMoveInfo(gameStatus: GameStatus) {
  if (gameStatus.type === "in-progress") {
    return {
      currentSymbol: gameStatus.symbol,
      nextSymbol: getNextGameSymbol(gameStatus.symbol),
    };
  }

  return undefined;
}
