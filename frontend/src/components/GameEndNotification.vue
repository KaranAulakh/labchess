<template>
  <div class="game-end-notification">
    <div class="notification-header">
      <h2 class="notification-title">{{ gameContent.title }}</h2>
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

.notification-title {
  font-size: 20px;
  margin: 0 0 8px 0;
  color: #ecf0f1;
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

@media (max-width: 768px) {
  .notification-title {
    font-size: 18px;
  }

  .winner-info {
    padding: 10px;
    margin-bottom: 12px;
    font-size: 14px;
  }

  .notification-actions {
    margin-top: 12px;
  }
}
</style>
