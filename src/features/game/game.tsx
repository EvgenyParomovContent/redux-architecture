import { PLAYERS } from "./constants";
import { BackLink } from "./ui/back-link";
import { GameCell } from "./ui/game-cell";
import { GameInfo } from "./ui/game-info";
import { GameLayout } from "./ui/game-layout";
import { GameMoveInfo } from "./ui/game-move-info";
import { GameTitle } from "./ui/game-title";
import { PlayerInfo } from "./ui/player-info";
import { useEffect, useState } from "react";
import {
  selectGameField,
  selectGameHistory,
  selectGameStatus,
  store,
} from "./store";
import { GameWinnerInfo } from "./ui/game-winner-info";
import { gameMove } from "./model/use-cases/game-move";
import { selectGameCells } from "./model/selectors/game-cells";
import { selectGameMoveInfo } from "./model/selectors/game-move-info";
import { selectGameWinnerInfo } from "./model/selectors/game-winner-info";
import { GameHistoryView } from "./ui/game-history";
import { selectGameHistoryControls } from "./model/selectors/game-history-controls";
import { historyForward } from "./model/use-cases/history-forward";
import { historyBack } from "./model/use-cases/history-back";
import { backToGame } from "./model/use-cases/back-to-game";

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
  const history = selectGameHistory(gameState);

  const gameCells = selectGameCells(gameField, gameStatus);
  const gameMoveInfo = selectGameMoveInfo(gameStatus);
  const gameWinnerInfo = selectGameWinnerInfo(gameStatus);
  const gameHistoryControls = selectGameHistoryControls(history);

  const handleCellClick = (index: number) => () =>
    gameMove(index, store.dispatch, {
      gameField,
      gameStatus,
      history,
    });

  const handleForwardClick = () => {
    historyForward(history, store.dispatch);
  };

  const handleBackClick = () => {
    historyBack(history, store.dispatch);
  };

  const handleBackToGameClick = () => {
    backToGame(history, store.dispatch);
  };

  return (
    <>
      <GameLayout
        backLink={<BackLink />}
        title={<GameTitle />}
        gameInfo={
          <GameInfo isRatingGame playersCount={4} timeMode={"1 мин на ход"} />
        }
        actions={
          <GameHistoryView
            controls={gameHistoryControls}
            onBackClick={handleBackClick}
            onForwardClick={handleForwardClick}
            onBackToGameClick={handleBackToGameClick}
          />
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
          <>
            {gameMoveInfo && <GameMoveInfo {...gameMoveInfo} />}
            {gameWinnerInfo && <GameWinnerInfo {...gameWinnerInfo} />}
          </>
        }
        gameCells={gameCells.map((cell, index) => (
          <GameCell
            key={index}
            index={index}
            isWinner={cell.isWinner}
            disabled={false}
            onClick={handleCellClick(index)}
            symbol={cell.symbol}
          />
        ))}
      />
    </>
  );
}
