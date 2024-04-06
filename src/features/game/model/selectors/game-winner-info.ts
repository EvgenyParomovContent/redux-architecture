import { GameStatus } from "../domain/game-status";

export function selectGameWinnerInfo(gameStatus: GameStatus) {
  if (gameStatus.type === "game-over") {
    return {
      winner: gameStatus.winner,
    };
  }

  return undefined;
}
