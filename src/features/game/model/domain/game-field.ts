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

export const getFieldCell = (gameField: GameField, index: number) =>
  gameField.at(index) ?? null;

export function computeWinner(
  gameField: GameField,
  sequenceSize = DEFAULT_SEQUENCE_SIZE,
  fieldSize = DEFAULT_GAME_FIELD_SIZE,
) {
  const gap = Math.floor(sequenceSize / 2);

  function compareElements(indexes: number[]) {
    let result = true;

    for (let i = 1; i < indexes.length; i++) {
      result &&= !!gameField[indexes[i]];
      result &&= gameField[indexes[i]] === gameField[indexes[i - 1]];
    }

    return result;
  }

  function getSequenceIndexes(i: number) {
    const res: number[][] = [[], [], [], []];

    for (let j = 0; j < sequenceSize; j++) {
      res[0].push(j - gap + i);
      res[1].push(fieldSize * (j - gap) + (j - gap) + i);
      res[2].push(-fieldSize * (j - gap) + (j - gap) + i);
      res[3].push(fieldSize * (j - gap) + i);
    }

    const x = i % fieldSize;
    if (x < gap || x >= fieldSize - gap) {
      res.shift();
      res.shift();
      res.shift();
    }

    return res;
  }

  for (let i = 0; i < gameField.length; i++) {
    if (gameField[i]) {
      const indexRows = getSequenceIndexes(i);

      const winnerIndexes = indexRows.find((row) => compareElements(row));

      if (winnerIndexes) {
        return winnerIndexes;
      }
    }
  }

  return undefined;
}
