<template>
  <button class="btn btn-time-control" @click="$emit('click')">
    {{ minutes }}|{{ increment }}
  </button>
</template>

<script>
export default {
  name: "TimeControlButton",
  props: {
    minutes: {
      type: Number,
      required: true,
    },
    increment: {
      type: Number,
      required: true,
    },
  },
  emits: ["click"],
};
</script>

<style scoped>
.btn-time-control {
  background: #34495e;
  border: 2px solid #4a6741;
  color: #ecf0f1;
  padding: 4px 8px;
  font-size: 12px;
  min-width: 45px;
  font-family: "Courier New", monospace;
}

.btn-time-control:hover {
  background: #4a6741;
  border-color: #5d8a52;
  box-shadow: 0 4px 12px rgba(74, 103, 65, 0.3);
}

.btn-time-control:active {
  box-shadow: 0 2px 8px rgba(74, 103, 65, 0.3);
}
</style>
