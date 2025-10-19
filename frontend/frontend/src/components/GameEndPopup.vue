<template>
  <div v-if="visible" class="popup-overlay">
    <div class="popup-container">
      <div class="popup-header">
        <h2>{{ popupContent.title }}</h2>
      </div>

      <div class="popup-content">
        <div v-if="gameState === 'welcome'" class="time-control-grid">
          <div class="game-result-icon">{{ popupContent.icon }}</div>
          <p class="result-message">{{ popupContent.message }}</p>

          <!-- Time Control Grid -->
          <div class="time-categories">
            <div
              v-for="category in timeControlCategories"
              :key="category.name"
              class="time-category"
            >
              <h3 class="category-title">{{ category.name }}</h3>
              <div class="time-options">
                <button
                  v-for="timeControl in category.options"
                  :key="`${timeControl.minutes}-${timeControl.increment}`"
                  class="time-button"
                  @click="
                    selectTimeControl(
                      timeControl.minutes,
                      timeControl.increment
                    )
                  "
                >
                  {{ timeControl.minutes }}|{{ timeControl.increment }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="standard-content">
          <div class="game-result-icon">{{ popupContent.icon }}</div>
          <p class="result-message">{{ popupContent.message }}</p>
          <div v-if="winner" class="winner-info">
            <span>{{ winner }} wins!</span>
          </div>
        </div>
      </div>

      <div v-if="gameState !== 'welcome'" class="popup-actions">
        <button class="btn btn-primary" @click="newGame">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  TIME_CONTROL_CATEGORIES,
  GAME_STATE_CONTENT,
} from "../utils/gameConfig.js";

export default {
  name: "GameEndPopup",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    gameState: {
      type: String,
      default: null,
    },
    winner: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      timeControlCategories: TIME_CONTROL_CATEGORIES,
    };
  },
  computed: {
    buttonText() {
      return this.gameState === "welcome" ? "Start Game" : "New Game";
    },

    popupContent() {
      return (
        GAME_STATE_CONTENT[this.gameState] || {
          title: "Game Over!",
          icon: "⚖️",
          message: "The game has ended!",
        }
      );
    },
  },
  methods: {
    newGame() {
      this.$emit("new-game");
    },
    selectTimeControl(minutes, increment) {
      this.$emit("time-control-selected", { minutes, increment });
    },
  },
};
</script>

<style scoped>
@keyframes popup-appear {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.popup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 512px; /* Same width as chessboard */
  height: 512px; /* Same height as chessboard */
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
  border-radius: 4px;
}

.winner-info {
  background: #22313f;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.popup-container {
  background: #2c3e50;
  border-radius: 12px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  padding: 24px;
  max-width: 320px;
  width: 85%;
  text-align: center;
  animation: popup-appear 0.3s ease-out;
}

.game-result-icon {
  font-size: 20px;
  margin-bottom: 2px;
}

/* Time Control Grid Styles */
.time-control-grid {
  text-align: center;
}

.time-control-grid .result-message {
  margin-bottom: 4px;
}

.time-categories {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}

.time-category {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.category-title {
  color: #ecf0f1;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.time-options {
  display: flex;
  gap: 6px;
  justify-content: center;
  flex-wrap: wrap;
}

.time-button {
  background: #34495e;
  border: 2px solid #4a6741;
  color: #ecf0f1;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 45px;
  font-family: "Courier New", monospace;
}

.time-button:hover {
  background: #4a6741;
  border-color: #5d8a52;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 103, 65, 0.3);
}

.time-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(74, 103, 65, 0.3);
}

.standard-content {
  text-align: center;
}
</style>
