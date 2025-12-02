<template>
  <div v-if="visible" class="popup-overlay" @click="handleOverlayClick">
    <div class="popup-container" @click.stop>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupContainer",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    closeOnOverlay: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  methods: {
    handleOverlayClick() {
      if (this.closeOnOverlay) {
        this.$emit("close");
      }
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
  border-radius: 4px;
}

.popup-container {
  background: #2c3e50;
  border-radius: 12px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  padding: 30px;
  max-width: 400px;
  width: 85%;
  text-align: center;
  animation: popIn 0.5s ease-out;
}

@media (max-width: 768px) {
  .popup-container {
    padding: 16px;
    max-width: 240px;
    width: 70%;
  }
}
</style>
