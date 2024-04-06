export const GameSymbol = {
  ZERO: "zero",
  CROSS: "cross",
  TRINGLE: "tringle",
  SQUARE: "square",
} as const;

export type GameSymbol = (typeof GameSymbol)[keyof typeof GameSymbol];
