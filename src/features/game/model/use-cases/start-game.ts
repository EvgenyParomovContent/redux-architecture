import { AppDispatch, AppGetState } from "@/shared/store";
import { gameSlice } from "../../store";
import { gameStartedEvent } from "../events";
import { GameSymbol } from "../domain/game-symbol";
import { startCheckTimer } from "./check-timer";

export const startGame =
  () => (dispatch: AppDispatch, getState: AppGetState) => {
    const gameStatus = gameSlice.selectors.selectGameStatus(getState());

    if (gameStatus.type !== "idle") {
      return;
    }

    dispatch(
      gameStartedEvent({
        gameStatus: {
          type: "in-progress",
          activePlayers: [
            GameSymbol.CROSS,
            GameSymbol.ZERO,
            GameSymbol.TRINGLE,
            GameSymbol.SQUARE,
          ],
          moveStartedAt: new Date().toISOString(),
          symbol: GameSymbol.CROSS,
        },
      }),
    );

    startCheckTimer(dispatch);
  };
