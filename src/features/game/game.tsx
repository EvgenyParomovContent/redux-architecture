import { PLAYERS } from "./constants";
import { BackLink } from "./ui/back-link";
import { GameCell } from "./ui/game-cell";
import { GameInfo } from "./ui/game-info";
import { GameLayout } from "./ui/game-layout";
import { GameMoveInfo } from "./ui/game-move-info";
import { GameTitle } from "./ui/game-title";
import { PlayerInfo } from "./ui/player-info";
import { GameSymbol } from "./model/domain/game-symbol";
import { useEffect, useState } from "react";
import { selectGameField, selectGameStatus, store } from "./store";
import { GameWinnerInfo } from "./ui/game-winner-info";
import { gameMove } from "./model/use-cases/game-move";

const PLAYERS_COUNT = 4;

export function Game() {
  const [gameState, setGameState] = useState(() => store.getState());

  useEffect(() => {
    return store.subscribe(() => {
      setGameState(store.getState());
    });
  }, []);

  const gameField = selectGameField(gameState);
  const gameStatus = selectGameStatus(gameState);

  const handleCellClick = (index: number) => () => gameMove(index, store);

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
          gameStatus.type === "in-progress" ? (
            <GameMoveInfo
              currentSymbol={gameStatus.symbol}
              nextSymbol={GameSymbol.CROSS}
            />
          ) : (
            <GameWinnerInfo winner={gameStatus.winner} />
          )
        }
        gameCells={gameField.map((cell, index) => (
          <GameCell
            key={index}
            index={index}
            isWinner={false}
            disabled={false}
            onClick={handleCellClick(index)}
            symbol={cell}
          />
        ))}
      />
    </>
  );
}
