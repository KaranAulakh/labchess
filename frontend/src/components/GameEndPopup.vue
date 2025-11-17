<template>
  <PopupContainer :visible="visible">
    <!-- Time Control Selection -->
    <TimeControlSelector
      v-if="gameState === 'welcome'"
      @time-control-selected="$emit('time-control-selected', $event)"
    />

    <!-- Game End Notification -->
    <GameEndNotification
      v-else
      :gameState="gameState"
      :winner="winner"
      @new-game="$emit('new-game')"
    />
  </PopupContainer>
</template>

<script>
import PopupContainer from "./PopupContainer.vue";
import TimeControlSelector from "./TimeControlSelector.vue";
import GameEndNotification from "./GameEndNotification.vue";

export default {
  name: "GameEndPopup",
  components: {
    PopupContainer,
    TimeControlSelector,
    GameEndNotification,
  },
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
  emits: ["new-game", "time-control-selected"],
};
</script>

<style scoped>
/* This component is now just a router - styling handled by child components */
</style>
