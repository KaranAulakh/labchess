<template>
  <div class="timer-base" :class="isActive ? 'timer-active' : 'timer-inactive'">
    <div v-if="playerName" class="player-label">{{ playerName }}</div>
    <div
      class="timer-display monospace-display"
      :class="{ 'pulse-glow': isActive }"
    >
      {{ formattedTime }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ChessTimer",
  props: {
    playerName: {
      type: String,
      required: true,
    },
    initialTime: {
      type: Number,
      default: 600,
    },
    increment: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timeRemaining: this.initialTime,
      intervalId: null,
    };
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timeRemaining / 60);
      const seconds = this.timeRemaining % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    },
  },
  mounted() {
    this.intervalId = setInterval(() => {
      if (this.isActive && this.timeRemaining > 0) {
        this.timeRemaining--;
        if (this.timeRemaining === 0) {
          this.$emit("timer-expired", this.playerName);
        }
      }
    }, 1000);
  },
  beforeUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
  },
  methods: {
    addIncrement() {
      if (this.increment > 0) {
        this.timeRemaining += this.increment;
      }
    },
    reset() {
      this.timeRemaining = this.initialTime;
    },
  },
  watch: {
    initialTime: {
      handler(newTime) {
        this.timeRemaining = newTime;
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.timer-base {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  min-width: 150px;
  margin: 0;
}

.timer-active {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
}

.timer-inactive {
  background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
  color: #333;
}

.monospace-display {
  font-family: "Courier New", monospace;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.timer-display {
  font-size: 30px;
  margin-bottom: 4px;
}

.player-label {
  font-size: 14px;
}

@keyframes pulse-glow {
  0%,
  100% {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }
  50% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
}

/* Mobile responsive sizing */
@media (max-width: 768px) {
  .timer-base {
    padding: 8px 12px;
    min-width: 90px;
  }

  .timer-display {
    font-size: 18px;
  }

  .player-label {
    font-size: 12px;
  }
}
</style>
