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
        <!-- Pawn Promotion Popup -->
        <div v-if="showPromotionPopup" class="promotion-popup-wrapper">
          <PawnPromotionPopup
            :visible="showPromotionPopup"
            :isWhite="promotionInfo.isWhite"
            :location="promotionInfo.location"
            @piece-selected="handlePieceSelected"
          />
        </div>

        <ChessBoard
          ref="chessBoard"
          @game-state-updated="handleGameStateUpdate"
          @promotion-needed="handlePromotionNeeded"
        />

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
import PawnPromotionPopup from "./PawnPromotionPopup.vue";
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
    PawnPromotionPopup,
  },
  data() {
    return {
      gameState: {
        whiteToMove: true,
      },
      gameEndState: "welcome",
      winner: null,
      selectedTimeControl: DEFAULT_TIME_CONTROL,
      promotionInfo: null, // Store all promotion info from ChessBoard
    };
  },
  computed: {
    showPopup() {
      return this.gameEndState !== null; // Show popup when not actively playing
    },
    showPromotionPopup() {
      return this.promotionInfo !== null;
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

    handlePromotionNeeded(promotionInfo) {
      this.promotionInfo = promotionInfo; // Just store the info from ChessBoard
    },

    async handlePieceSelected({ location, pieceType }) {
      // Get reference to ChessBoard component
      const chessBoard = this.$refs.chessBoard;

      if (chessBoard && chessBoard.promotePawn) {
        // Promote the pawn
        const success = await chessBoard.promotePawn(location, pieceType);

        if (success) {
          // Close the popup
          this.promotionInfo = null;

          // Emit game state after promotion
          chessBoard.emitGameState();
        }
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
      this.startNewGameWithTimeControl();
    },

    startNewGame() {
      // Always show the time control selector when starting a new game
      this.gameEndState = "welcome";
      this.winner = null;
      this.gameState = {
        whiteToMove: true,
      };
    },

    async startNewGameWithTimeControl() {
      // Get reference to ChessBoard component using ref
      const chessBoard = this.$refs.chessBoard;

      if (chessBoard && chessBoard.startNewGame) {
        const success = await chessBoard.startNewGame();
        if (success) {
          // Reset local state and start the game
          this.gameEndState = null; // null means game is in progress
          this.winner = null;
          this.gameState = {
            whiteToMove: true,
          };

          // Reset timers
          if (this.$refs.whiteTimer) {
            this.$refs.whiteTimer.reset();
          }
          if (this.$refs.blackTimer) {
            this.$refs.blackTimer.reset();
          }

          console.log("Game successfully started with new time control!");
        } else {
          console.error("Failed to start game, falling back to page reload");
          window.location.reload();
        }
      } else {
        // Fallback to page reload if something goes wrong
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
.app-container {
  justify-content: center !important;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  --board-size: min(100%, calc(100vh - 200px), 640px);
}

.board-container,
.timer-section {
  width: var(--board-size);
}

.board-container {
  position: relative;
  aspect-ratio: 1;
}

.timer-section {
  display: flex;
  justify-content: flex-end;
}

.promotion-popup-wrapper {
  position: absolute;
  top: -70px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 100;
}

@media (max-width: 600px) {
  .game-container {
    --board-size: min(100%, calc(100vh - 180px));
  }
}
</style>
