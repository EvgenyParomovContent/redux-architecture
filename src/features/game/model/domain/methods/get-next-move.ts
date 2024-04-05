import { GameSymbol, MOVE_ORDER } from "../game-symbol";

export function getNextMove({
  currentMove,
  playersCount,
  timers,
}: {
  playersCount: number;
  currentMove: GameSymbol;
  timers: Record<GameSymbol, number>;
}) {
  const slicedMoveOrder = MOVE_ORDER.slice(0, playersCount).filter(
    (symbol) => timers[symbol] > 0,
  );
  const nextMoveIndex = slicedMoveOrder.indexOf(currentMove) + 1;
  return slicedMoveOrder[nextMoveIndex] ?? slicedMoveOrder[0];
}
