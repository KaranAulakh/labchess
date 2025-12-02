<template>
  <div class="time-category">
    <h3 class="category-title">{{ category.name }}</h3>
    <div class="time-options">
      <TimeControlButton
        v-for="timeControl in category.options"
        :key="`${timeControl.minutes}-${timeControl.increment}`"
        :minutes="timeControl.minutes"
        :increment="timeControl.increment"
        @click="selectTimeControl(timeControl.minutes, timeControl.increment)"
      />
    </div>
  </div>
</template>

<script>
import TimeControlButton from "./TimeControlButton.vue";

export default {
  name: "TimeControlCategory",
  components: {
    TimeControlButton,
  },
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  emits: ["time-control-selected"],
  methods: {
    selectTimeControl(minutes, increment) {
      this.$emit("time-control-selected", { minutes, increment });
    },
  },
};
</script>

<style scoped>
.time-category {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.category-title {
  color: #ecf0f1;
  font-size: 13px;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.time-options {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .time-category {
    gap: 3px;
  }

  .category-title {
    font-size: 12px;
  }

  .time-options {
    gap: 6px;
  }
}
</style>
