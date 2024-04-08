import { DateISOString } from "@/shared/types";
import { GameSymbol } from "./game-symbol";

export type GameTimerValueMs = number;

export type GameTimers = Record<GameSymbol, GameTimerValueMs>;

const INCREMENT_PER_MOVE: GameTimerValueMs = 2 * 1000;
const DEFAULT_TIMER: GameTimerValueMs = 10 * 1000;

export const createDefaultGameTimers = (): GameTimers => ({
  [GameSymbol.CROSS]: DEFAULT_TIMER,
  [GameSymbol.ZERO]: DEFAULT_TIMER,
  [GameSymbol.TRINGLE]: DEFAULT_TIMER,
  [GameSymbol.SQUARE]: DEFAULT_TIMER,
});

export const updateTimer = ({
  now,
  startAt,
  symbol,
  gameTimers,
}: {
  symbol: GameSymbol;
  startAt: DateISOString;
  now: DateISOString;
  gameTimers: GameTimers;
  increment?: GameTimerValueMs;
}) => {
  const timer = gameTimers[symbol];

  const diff = Date.parse(now) - Date.parse(startAt);

  return {
    ...gameTimers,
    [symbol]: Math.max(timer - diff, 0),
  };
};

export const incrementTimer = (gameTimers: GameTimers, symbol: GameSymbol) => {
  const timer = gameTimers[symbol];

  return {
    ...gameTimers,
    [symbol]: Math.max(timer + INCREMENT_PER_MOVE, 0),
  };
};

export const checkTimeIsOver = (gameTimers: GameTimers, symbol: GameSymbol) => {
  const timer = gameTimers[symbol];
  return timer <= 0;
};
