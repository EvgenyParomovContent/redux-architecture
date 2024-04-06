import {
  canBack,
  GameHistory,
  canBackToGame,
  canForward,
} from "../domain/game-history";

export type GameHistoryControls = {
  canBack: boolean;
  canForward: boolean;
  canBackToGame: boolean;
  current: number;
  total: number;
};

export function selectGameHistoryControls(
  history: GameHistory,
): GameHistoryControls {
  return {
    canBack: canBack(history),
    canBackToGame: canBackToGame(history),
    canForward: canForward(history),
    current: history.currentIndex + 1,
    total: history.lastIndex + 1,
  };
}
