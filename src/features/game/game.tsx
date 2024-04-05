import { PLAYERS } from "./constants";
import { BackLink } from "./ui/back-link";
import { GameCell } from "./ui/game-cell";
import { GameInfo } from "./ui/game-info";
import { GameLayout } from "./ui/game-layout";
import { GameMoveInfo } from "./ui/game-move-info";
import { GameTitle } from "./ui/game-title";
import { PlayerInfo } from "./ui/player-info";
import { GameSymbol } from "./domain/game-symbol";
import { DEFAULT_GAME_FIELD_SIZE } from "./domain/game-field";

const PLAYERS_COUNT = 4;

const cells = new Array(DEFAULT_GAME_FIELD_SIZE * DEFAULT_GAME_FIELD_SIZE).fill(null);

export function Game() {
  return (
    <>
      <GameLayout
        backLink={<BackLink />}
        title={<GameTitle />}
        gameInfo={
          <GameInfo isRatingGame playersCount={4} timeMode={"1 мин на ход"} />
        }
        playersList={PLAYERS.slice(0, PLAYERS_COUNT).map((player) => {
          return (
            <PlayerInfo
              key={player.id}
              avatar={player.avatar}
              name={player.name}
              rating={player.rating}
              symbol={player.symbol}
              timer={60}
            />
          );
        })}
        gameMoveInfo={
          <GameMoveInfo currentMove={GameSymbol.CROSS} nextMove={GameSymbol.SQUARE} />
        }
        gameCells={cells.map((cell, index) => (
          <GameCell
            key={index}
            index={index}
            isWinner={false}
            disabled={false}
            onClick={() => { }}
            symbol={cell}
          />
        ))}
      />
    </>
  );
}
