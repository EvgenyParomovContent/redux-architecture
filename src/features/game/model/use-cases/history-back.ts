import { AppDispatch, AppGetState } from "@/shared/store";
import { canBack, decrimentHistory } from "../domain/game-history";
import { gameSlice } from "../../store";
import { historyViewedEvent } from "../events";

export const historyBack =
  () => (dispatch: AppDispatch, getState: AppGetState) => {
    const history = gameSlice.selectors.selectGameHistory(getState());
    if (canBack(history)) {
      dispatch(historyViewedEvent(decrimentHistory(history)));
    }
  };
