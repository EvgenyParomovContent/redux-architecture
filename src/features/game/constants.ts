import { GameSymbol } from "./model/domain/game-symbol";
import avatarSrc1 from "./ui/images/avatar-1.png";
import avatarSrc2 from "./ui/images/avatar-2.png";
import avatarSrc3 from "./ui/images/avatar-3.png";
import avatarSrc4 from "./ui/images/avatar-4.png";

export const PLAYERS = [
  {
    id: 1,
    name: "Paromovevg",
    rating: 1230,
    avatar: avatarSrc1,
    symbol: GameSymbol.CROSS,
  },
  {
    id: 2,
    name: "VereIntedinglapotur",
    rating: 850,
    avatar: avatarSrc2,
    symbol: GameSymbol.ZERO,
  },
  {
    id: 3,
    name: "Lara",
    rating: 1400,
    avatar: avatarSrc3,
    symbol: GameSymbol.TRINGLE,
  },
  {
    id: 4,
    name: "Додик",
    rating: 760,
    avatar: avatarSrc4,
    symbol: GameSymbol.SQUARE,
  },
];
