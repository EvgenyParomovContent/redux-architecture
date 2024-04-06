import { canBackToGame, GameHistory } from "../domain/game-history";
import { ModelDispatch } from "../events";

export function backToGame(history: GameHistory, dispatch: ModelDispatch) {
  if (!canBackToGame(history)) {
    return;
  }

  dispatch({
    type: "event/game/game-viewed",
  });
}
