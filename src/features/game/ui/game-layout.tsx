export function GameLayout({
  backLink,
  title,
  gameInfo,
  playersList,
  gameMoveInfo,
  actions,
  gameCells,
}: {
  backLink: React.ReactNode;
  title: React.ReactNode;
  gameInfo: React.ReactNode;
  playersList: React.ReactNode;
  gameMoveInfo: React.ReactNode;
  actions?: React.ReactNode;
  gameCells: React.ReactNode;
}) {
  return (
    <div className="pb-10">
      <div className="grid gap-8 grid-cols-[auto_1fr] items-start">
        <div
          className={
            "bg-white rounded-2xl shadow-md p-8 justify-between flex flex-col gap-6 row-start-2"
          }
        >
          {playersList}
        </div>
        <div className="pl-2 col-start-2">
          {backLink}
          {title}
          {gameInfo}
        </div>
        <div className={"bg-white rounded-2xl shadow-md px-8  pt-5 pb-7"}>
          <div className="flex gap-3 items-center">
            <div className="mr-auto">{gameMoveInfo}</div>
            {actions}
          </div>
          <div className="grid grid-cols-[repeat(19,_30px)] grid-rows-[repeat(19,_30px)] pl-px pt-px mt-3">
            {gameCells}
          </div>
        </div>
      </div>
    </div>
  );
}
