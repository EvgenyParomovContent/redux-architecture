import { AppDispatch, AppGetState } from "@/shared/store";
import {
  computeWinner,
  getFieldCell,
  updateGameCell,
} from "../domain/game-field";
import { currentIndexIsLast } from "../domain/game-history";
import { getNextGameSymbol } from "../domain/game-status";
import { gameSlice } from "../../store";
import { gameOverEvent, moveCompletedEvent } from "../events";

export const gameMove =
  (index: number) => (dispatch: AppDispatch, getState: AppGetState) => {
    const history = gameSlice.selectors.selectGameHistory(getState());
    const gameStatus = gameSlice.selectors.selectGameStatus(getState());
    const gameField = gameSlice.selectors.selectGameField(getState());

    if (!currentIndexIsLast(history)) {
      return;
    }

    if (gameStatus.type === "game-over") {
      return;
    }

    const cell = getFieldCell(gameField, index);

    if (cell !== null) {
      return;
    }

    const nextField = updateGameCell(gameField, index, gameStatus.symbol);

    const winnerIndexes = computeWinner(nextField);

    if (winnerIndexes) {
      dispatch(
        gameOverEvent({
          gameField: nextField,
          gameStatus: {
            type: "game-over",
            winner: gameStatus.symbol,
            winnerIndexes: winnerIndexes,
          },
        }),
      );
      return;
    }

    dispatch(
      moveCompletedEvent({
        gameField: nextField,
        gameStatus: {
          type: "in-progress",
          symbol: getNextGameSymbol(gameStatus.symbol),
        },
      }),
    );
  };
