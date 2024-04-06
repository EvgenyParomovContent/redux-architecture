import { GameHistoryControls } from "../model/selectors/game-history-controls";
import { UiButton } from "@/shared/uikit/ui-button";

export function GameHistoryView({
  controls: { canBack, canBackToGame, canForward, current, total },
  onBackToGameClick,
  onBackClick,
  onForwardClick,
}: {
  controls: GameHistoryControls;
  onBackClick?: () => void;
  onForwardClick?: () => void;
  onBackToGameClick?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 ">
      <UiButton
        size="md"
        variant="outline"
        disabled={!canBackToGame}
        onClick={onBackToGameClick}
      >
        Back to game
      </UiButton>
      <UiButton
        size="md"
        variant="outline"
        disabled={!canBack}
        onClick={onBackClick}
      >
        Back
      </UiButton>
      <UiButton
        size="md"
        variant="outline"
        disabled={!canForward}
        onClick={onForwardClick}
      >
        Forward
      </UiButton>
      <div className="text-sm text-slate-400">
        {current}/{total}
      </div>
    </div>
  );
}
