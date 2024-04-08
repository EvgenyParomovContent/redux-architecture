import { AppDispatch, AppGetState } from "@/shared/store";
import { gameSlice } from "../../store";
import { gameOverEvent, gameViewedEvent, timeOverEvent } from "../events";
import { checkTimeIsOver, updateTimer } from "../domain/game-timers";
import { currentIndexIsLast } from "../domain/game-history";
import {
  checkOneActivePlayer,
  getNextGameSymbol,
  removePlayerFromGame,
} from "../domain/game-status";

export const startCheckTimer = (dispatch: AppDispatch) => {
  setTimeout(() => {
    dispatch(checkTimer());
  }, 100);
};

export const checkTimer =
  () => (dispatch: AppDispatch, getState: AppGetState) => {
    const gameStatus = gameSlice.selectors.selectLastGameStatus(getState());
    const gameTimers = gameSlice.selectors.selectGameTimers(getState());

    const history = gameSlice.selectors.selectGameHistory(getState());

    if (gameStatus.type !== "in-progress") {
      return;
    }
    startCheckTimer(dispatch);

    const now = new Date().toISOString();

    const newTimers = updateTimer({
      gameTimers,
      now,
      startAt: gameStatus.moveStartedAt,
      symbol: gameStatus.symbol,
    });

    if (!checkTimeIsOver(newTimers, gameStatus.symbol)) {
      return;
    }

    if (!currentIndexIsLast(history)) {
      dispatch(gameViewedEvent());
    }

    const gameField = gameSlice.selectors.selectGameField(getState());

    const newActivePlayers = removePlayerFromGame(
      gameStatus.activePlayers,
      gameStatus.symbol,
    );

    if (checkOneActivePlayer(newActivePlayers)) {
      dispatch(
        gameOverEvent({
          gameField: gameField,
          gameStatus: {
            type: "game-over",
            winner: newActivePlayers[0],
          },
          gameTimers: newTimers,
        }),
      );
      return;
    }

    dispatch(
      timeOverEvent({
        gameTimers: newTimers,
        gameStatus: {
          type: "in-progress",
          activePlayers: newActivePlayers,
          moveStartedAt: now,
          symbol: getNextGameSymbol(gameStatus.symbol, newActivePlayers),
        },
        gameField,
      }),
    );
  };
