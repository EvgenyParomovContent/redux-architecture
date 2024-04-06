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
import { updateGameCell } from "./model/domain/game-field";
import { getNextGameStatus } from "./model/domain/game-status";

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

  const handleCellClick = (index: number) => () => {
    store.dispatch({
      type: "event/game/move-completed",
      payload: {
        gameField: updateGameCell(gameField, index, gameStatus.symbol),
        gameStatus: getNextGameStatus(gameStatus, [
          GameSymbol.CROSS,
          GameSymbol.ZERO,
          GameSymbol.TRINGLE,
        ]),
      },
    });
  };

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
          <GameMoveInfo
            currentMove={gameStatus.symbol}
            nextMove={GameSymbol.SQUARE}
          />
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
