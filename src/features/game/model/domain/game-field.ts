import { GameSymbol } from "./game-symbol";

export type GameField = Array<GameSymbol | null>;
export const DEFAULT_GAME_FIELD_SIZE = 19;
export const DEFAULT_SEQUENCE_SIZE = 5;

export const createEmptyGameField = (): GameField =>
  Array.from(
    { length: DEFAULT_GAME_FIELD_SIZE * DEFAULT_GAME_FIELD_SIZE },
    () => null,
  );

export const updateGameCell = (
  field: GameField,
  index: number,
  symbol: GameSymbol,
) => {
  const newGameField = field.slice();
  newGameField[index] = symbol;
  return newGameField;
};
