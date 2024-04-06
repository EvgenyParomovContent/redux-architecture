import {
  canForward,
  currentIndexIsLast,
  GameHistory,
  incrementHistory,
} from "../domain/game-history";
import { ModelDispatch } from "../events";

export function historyForward(history: GameHistory, dispatch: ModelDispatch) {
  if (!canForward(history)) {
    return;
  }

  const incrementedHistory = incrementHistory(history);

  if (currentIndexIsLast(incrementedHistory)) {
    dispatch({
      type: "event/game/game-viewed",
    });
    return;
  }

  dispatch({
    type: "event/game/history-viewed",
    payload: incrementedHistory,
  });
}
