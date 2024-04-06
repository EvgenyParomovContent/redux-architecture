import {
  computeWinner,
  GameField,
  getFieldCell,
  updateGameCell,
} from "../domain/game-field";
import { currentIndexIsLast, GameHistory } from "../domain/game-history";
import { GameStatus, getNextGameSymbol } from "../domain/game-status";
import { ModelDispatch } from "../events";

export function gameMove(
  index: number,
  dispatch: ModelDispatch,
  state: {
    history: GameHistory;
    gameField: GameField;
    gameStatus: GameStatus;
  },
) {
  if (!currentIndexIsLast(state.history)) {
    return;
  }

  if (state.gameStatus.type === "game-over") {
    return;
  }

  const cell = getFieldCell(state.gameField, index);

  if (cell !== null) {
    return;
  }

  const nextField = updateGameCell(
    state.gameField,
    index,
    state.gameStatus.symbol,
  );

  const winnerIndexes = computeWinner(nextField);

  if (winnerIndexes) {
    dispatch({
      type: "event/game/over",
      payload: {
        gameField: nextField,
        gameStatus: {
          type: "game-over",
          winner: state.gameStatus.symbol,
          winnerIndexes: winnerIndexes,
        },
      },
    });
    return;
  }

  dispatch({
    type: "event/game/move-completed",
    payload: {
      gameField: nextField,
      gameStatus: {
        type: "in-progress",
        symbol: getNextGameSymbol(state.gameStatus.symbol),
      },
    },
  });
}
