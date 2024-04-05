import { GameSymbol } from "../model/domain/game-symbol";
import { CrossIcon } from "./icons/cross-icon";
import { SquareIcon } from "./icons/square-icon";
import { TringleIcon } from "./icons/tringle-icon";
import { ZeroIcon } from "./icons/zero-icon";

export function GameSymbolView({
  symbol,
  className,
}: {
  symbol: GameSymbol;
  className?: string;
}) {
  const Icon =
    {
      [GameSymbol.CROSS]: CrossIcon,
      [GameSymbol.ZERO]: ZeroIcon,
      [GameSymbol.TRINGLE]: TringleIcon,
      [GameSymbol.SQUARE]: SquareIcon,
    }[symbol] ?? CrossIcon;

  return <Icon className={className} />;
}
