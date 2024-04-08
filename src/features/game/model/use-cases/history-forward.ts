import { AppDispatch, AppGetState } from "@/shared/store";
import {
  canForward,
  currentIndexIsLast,
  incrementHistory,
} from "../domain/game-history";
import { gameSlice } from "../../store";
import { gameViewedEvent, historyViewedEvent } from "../events";

export const historyForward =
  () => (dispatch: AppDispatch, getState: AppGetState) => {
    const history = gameSlice.selectors.selectGameHistory(getState());

    if (!canForward(history)) {
      return;
    }

    const incrementedHistory = incrementHistory(history);

    if (currentIndexIsLast(incrementedHistory)) {
      dispatch(gameViewedEvent());
      return;
    }

    dispatch(historyViewedEvent(incrementedHistory));
  };
