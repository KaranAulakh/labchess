import { computed } from "vue";
import { convertMinutesToSeconds } from "../utils/gameConfig.js";

export function useTimers(selectedTimeControl, gameState, gameInProgress) {
  const timerConfig = computed(() => ({
    initialTime: convertMinutesToSeconds(selectedTimeControl.value.minutes),
    increment: selectedTimeControl.value.increment,
  }));

  const blackTimerActive = computed(() => 
    !gameState.value.whiteToMove && gameInProgress.value
  );

  const whiteTimerActive = computed(() => 
    gameState.value.whiteToMove && gameInProgress.value
  );

  const addIncrementToPlayer = (refs, playerName) => {
    const timerRef = refs[`${playerName.toLowerCase()}Timer`];
    if (timerRef) {
      timerRef.addIncrement();
    }
  };

  return {
    timerConfig,
    blackTimerActive,
    whiteTimerActive,
    addIncrementToPlayer,
  };
}
