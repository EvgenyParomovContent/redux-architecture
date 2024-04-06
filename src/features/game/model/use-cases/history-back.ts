import { canBack, decrimentHistory, GameHistory } from "../domain/game-history";
import { ModelDispatch } from "../events";

export function historyBack(history: GameHistory, dispatch: ModelDispatch) {
  if (canBack(history)) {
    dispatch({
      type: "event/game/history-viewed",
      payload: decrimentHistory(history),
    });
  }
}
