<template>
  <div class="app-container">
    <div class="game-container">
      <!-- Black Timer -->
      <div class="timer-section top">
        <ChessTimer
          ref="blackTimer"
          playerName="Black"
          v-bind="timerConfig"
          :isActive="blackTimerActive"
          @timer-expired="handleTimerExpired"
        />
      </div>

      <!-- Chess Board with Popup Container -->
      <div class="board-container">
        <ChessBoard @game-state-updated="handleGameStateUpdate" />

        <!-- Game End Popup positioned over chess board -->
        <GameEndPopup
          :visible="showPopup"
          :gameState="gameEndState"
          :winner="winner"
          @new-game="startNewGame"
          @time-control-selected="handleTimeControlSelected"
        />
      </div>

      <!-- White Timer -->
      <div class="timer-section bottom">
        <ChessTimer
          ref="whiteTimer"
          playerName="White"
          v-bind="timerConfig"
          :isActive="whiteTimerActive"
          @timer-expired="handleTimerExpired"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ChessBoard from "./ChessBoard.vue";
import ChessTimer from "./Timer.vue";
import GameEndPopup from "./GameEndPopup.vue";
import {
  DEFAULT_TIME_CONTROL,
  convertMinutesToSeconds,
  determineWinner,
} from "../utils/gameConfig.js";

export default {
  name: "PlayChess",
  components: {
    ChessBoard,
    ChessTimer,
    GameEndPopup,
  },
  data() {
    return {
      gameState: {
        whiteToMove: true,
      },
      gameEndState: "welcome",
      winner: null,
      selectedTimeControl: DEFAULT_TIME_CONTROL,
    };
  },
  computed: {
    showPopup() {
      return this.gameEndState !== null; // Show popup when not actively playing
    },
    gameInProgress() {
      return this.gameEndState === null;
    },
    gameStarted() {
      return this.gameEndState !== "welcome";
    },
    timerConfig() {
      return {
        initialTime: convertMinutesToSeconds(this.selectedTimeControl.minutes),
        increment: this.selectedTimeControl.increment,
      };
    },
    blackTimerActive() {
      return !this.gameState.whiteToMove && this.gameInProgress;
    },
    whiteTimerActive() {
      return this.gameState.whiteToMove && this.gameInProgress;
    },
  },
  methods: {
    handleGameStateUpdate(newGameState) {
      const previousWhiteToMove = this.gameState.whiteToMove;
      this.gameState = { ...newGameState };

      // Add increment to the player who just made a move (if the turn changed)
      if (
        previousWhiteToMove !== newGameState.whiteToMove &&
        this.gameInProgress
      ) {
        this.addIncrementToPlayer(previousWhiteToMove ? "White" : "Black");
      }

      // Show popup when game ends (only if game has started)
      if (
        this.gameStarted &&
        newGameState.gameEnded &&
        newGameState.gameState
      ) {
        this.gameEndState = newGameState.gameState;
        this.setWinner(newGameState.gameState, newGameState.whiteToMove);
      }
    },

    addIncrementToPlayer(playerName) {
      const timerRef = this.getTimerRef(playerName);
      if (timerRef) {
        timerRef.addIncrement();
      }
    },

    getTimerRef(playerName) {
      return this.$refs[`${playerName.toLowerCase()}Timer`];
    },

    handleTimerExpired(playerName) {
      console.log(`${playerName}'s time is up!`);
      this.gameEndState = "time_expired";
      this.setWinner("time_expired", null, playerName);
    },

    handleTimeControlSelected(timeControl) {
      this.selectedTimeControl = timeControl;
      this.gameEndState = null; // Start the game
    },

    startNewGame() {
      if (this.gameEndState === "welcome") {
        // This shouldn't happen anymore since time control selection starts the game
        this.gameEndState = null;
      } else {
        // Restart game
        window.location.reload();
      }
    },

    setWinner(gameEndState, whiteToMove, timerExpiredPlayer = null) {
      this.winner = determineWinner(
        gameEndState,
        whiteToMove,
        timerExpiredPlayer
      );
    },
  },
};
</script>

<style scoped>
/* Override the global app-container spacing */
.app-container {
  justify-content: center !important;
  align-items: center !important;
  gap: 0;
  padding: 20px;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.board-container {
  position: relative;
  display: inline-block;
}

.timer-section {
  display: flex;
  justify-content: flex-end;
  width: 512px; /* Same width as chessboard (8 * 64px) */
  padding-right: 0;
  margin: 0;
}
</style>
