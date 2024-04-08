import { gameSlice } from "../../store";
import { canBackToGame } from "../domain/game-history";
import { AppDispatch, AppGetState } from "@/shared/store";
import { gameViewedEvent } from "../events";

export const backToGame =
  () => (dispatch: AppDispatch, getState: AppGetState) => {
    const history = gameSlice.selectors.selectGameHistory(getState());

    if (!canBackToGame(history)) {
      return;
    }

    dispatch(gameViewedEvent());
  };
