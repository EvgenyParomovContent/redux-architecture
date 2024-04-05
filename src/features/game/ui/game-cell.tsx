import clsx from "clsx";
import { GameSymbolView } from "./game-symbol";
import { memo } from "react";
import { GameSymbol } from "../domain/game-symbol";

export const GameCell = memo(function GameCell({
  onClick,
  isWinner,
  disabled,
  symbol,
  index,
}: {
  onClick: (index: number) => void;
  isWinner: boolean;
  disabled: boolean;
  symbol: GameSymbol | null;
  index: number;
}) {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick(index)}
      className={clsx(
        "border border-slate-200 -ml-px -mt-px flex items-center justify-center",
        isWinner && "bg-orange-600/10",
      )}
    >
      {symbol && <GameSymbolView symbol={symbol} className="w-5 h-5" />}
    </button>
  );
});
