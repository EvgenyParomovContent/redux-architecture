export type GameHistory = {
  lastIndex: number;
  currentIndex: number;
};

export const decrimentHistory = (history: GameHistory): GameHistory => {
  return {
    currentIndex: Math.max(0, history.currentIndex - 1),
    lastIndex: history.lastIndex,
  };
};

export const incrementHistory = (history: GameHistory) => {
  return {
    currentIndex: Math.min(history.lastIndex, history.currentIndex + 1),
    lastIndex: history.lastIndex,
  };
};

export const currentIndexIsLast = (history: GameHistory) => {
  return history.currentIndex === history.lastIndex;
};

export const canBack = (history: GameHistory) => {
  return history.currentIndex > 0;
};

export const canForward = (history: GameHistory) => {
  return history.currentIndex < history.lastIndex;
};

export const canBackToGame = (history: GameHistory) => {
  return canForward(history);
};
