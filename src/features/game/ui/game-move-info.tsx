import { GameSymbol } from "../domain/game-symbol";
import { GameSymbolView } from "./game-symbol";

export function GameMoveInfo({
  currentMove,
  nextMove,
}: {
  currentMove: GameSymbol;
  nextMove: GameSymbol;
}) {
  return (
    <>
      <div className="flex items-center gap-1 text-xl leading-tight font-semibold">
        Ход: <GameSymbolView symbol={currentMove} className="w-5 h-5" />
      </div>
      <div className="flex items-center gap-1 text-xs leading-tight text-slate-400">
        Следующий: <GameSymbolView symbol={nextMove} className="w-3 h-3" />
      </div>
    </>
  );
}
