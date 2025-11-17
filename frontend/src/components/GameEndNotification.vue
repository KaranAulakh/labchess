<template>
  <div class="game-end-notification">
    <div class="notification-header">
      <div class="game-result-icon">{{ gameContent.icon }}</div>
      <h2 class="notification-title">{{ gameContent.title }}</h2>
      <p class="notification-message">{{ gameContent.message }}</p>
    </div>

    <div v-if="winner" class="winner-info">
      <span>{{ winner }} wins!</span>
    </div>

    <div class="notification-actions">
      <button class="btn btn-primary" @click="$emit('new-game')">
        New Game
      </button>
    </div>
  </div>
</template>

<script>
import { GAME_STATE_CONTENT } from "../utils/gameConfig.js";

export default {
  name: "GameEndNotification",
  props: {
    gameState: {
      type: String,
      required: true,
    },
    winner: {
      type: String,
      default: null,
    },
  },
  emits: ["new-game"],
  computed: {
    gameContent() {
      return (
        GAME_STATE_CONTENT[this.gameState] || {
          title: "Game Over!",
          icon: "⚖️",
          message: "The game has ended!",
        }
      );
    },
  },
};
</script>

<style scoped>
.game-end-notification {
  text-align: center;
}

.notification-header {
  margin-bottom: 16px;
}

.game-result-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.notification-title {
  font-size: 20px;
  margin: 0 0 8px 0;
  color: #ecf0f1;
}

.notification-message {
  font-size: 14px;
  margin: 0;
  color: #908f8f;
}

.winner-info {
  background: #22313f;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.notification-actions {
  margin-top: 16px;
}
</style>
