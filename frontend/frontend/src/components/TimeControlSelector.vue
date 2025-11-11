<template>
  <div class="time-control-selector">
    <div class="selector-header">
      <div class="selector-icon">♟️</div>
      <h2 class="selector-title">Welcome to Chess!</h2>
      <p class="selector-message">Select your time control to begin!</p>
    </div>

    <div class="time-categories">
      <TimeControlCategory
        v-for="category in timeControlCategories"
        :key="category.name"
        :category="category"
        @time-control-selected="$emit('time-control-selected', $event)"
      />
    </div>
  </div>
</template>

<script>
import { TIME_CONTROL_CATEGORIES } from "../utils/gameConfig.js";
import TimeControlCategory from "./TimeControlCategory.vue";

export default {
  name: "TimeControlSelector",
  components: {
    TimeControlCategory,
  },
  emits: ["time-control-selected"],
  data() {
    return {
      timeControlCategories: TIME_CONTROL_CATEGORIES,
    };
  },
};
</script>

<style scoped>
.time-control-selector {
  text-align: center;
}

.selector-header {
  margin-bottom: 12px;
}

.selector-icon {
  font-size: 20px;
  margin-bottom: 2px;
}

.selector-title {
  font-size: 18px;
  margin: 0 0 4px 0;
  color: #ecf0f1;
}

.selector-message {
  font-size: 14px;
  margin: 0 0 4px 0;
  color: #908f8f;
}

.time-categories {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}
</style>
