import { GameField } from "../domain/game-field";
import { GameStatus } from "../domain/game-status";
import { GameSymbol } from "../domain/game-symbol";

type GameCell = {
  symbol: GameSymbol | null;
  isWinner: boolean;
};

export function selectGameCells(gameField: GameField, gameStatus: GameStatus) {
  if (gameStatus.type === "game-over") {
    return gameField.map((cell, index): GameCell => {
      return {
        symbol: cell,
        isWinner: gameStatus.winnerIndexes.includes(index),
      };
    });
  }
  return gameField.map((cell): GameCell => {
    return {
      symbol: cell,
      isWinner: false,
    };
  });
}
