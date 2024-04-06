import { GameSymbol } from "../model/domain/game-symbol";
import { GameSymbolView } from "./game-symbol";

export function GameWinnerInfo({ winner }: { winner: GameSymbol }) {
  return (
    <>
      <div className="flex items-center gap-1 text-xl leading-tight font-semibold">
        Победитель: <GameSymbolView symbol={winner} className="w-5 h-5" />
      </div>
      <div className="h-[15px]"></div>
    </>
  );
}
