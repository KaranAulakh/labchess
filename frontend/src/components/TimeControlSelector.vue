<template>
  <div class="time-control-selector">
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

.time-categories {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (max-width: 768px) {
  .time-categories {
    gap: 6px;
  }
}
</style>
