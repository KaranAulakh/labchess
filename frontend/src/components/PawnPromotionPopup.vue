<template>
  <div v-if="visible" class="promotion-popup">
    <div class="piece-selection">
      <div
        v-for="piece in promotionPieces"
        :key="piece.type"
        class="piece-option"
        @click="selectPiece(piece.type)"
        :title="piece.type"
      >
        <img :src="piece.image" :alt="piece.type" class="piece-image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PawnPromotionPopup",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    isWhite: {
      type: Boolean,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  emits: ["piece-selected"],
  computed: {
    promotionPieces() {
      const color = this.isWhite ? "w" : "b";
      return [
        {
          type: "Queen",
          image: require(`@/assets/pieces/${color}Q.svg`),
        },
        {
          type: "Rook",
          image: require(`@/assets/pieces/${color}R.svg`),
        },
        {
          type: "Bishop",
          image: require(`@/assets/pieces/${color}B.svg`),
        },
        {
          type: "Knight",
          image: require(`@/assets/pieces/${color}N.svg`),
        },
      ];
    },
  },
  methods: {
    selectPiece(pieceType) {
      this.$emit("piece-selected", {
        location: this.location,
        pieceType: pieceType,
      });
    },
  },
};
</script>

<style scoped>
.promotion-popup {
  background: rgba(44, 62, 80, 0.98);
  border: 2px solid #4a6741;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  animation: slideDown 0.3s ease-out;
  display: inline-block;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.piece-selection {
  display: flex;
  gap: 6px;
}

.piece-option {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #34495e;
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 44px;
  height: 44px;
}

.piece-option:hover {
  border-color: #4a6741;
  background: #3d5a73;
  transform: scale(1.1);
}

.piece-image {
  width: 32px;
  height: 32px;
  pointer-events: none;
}
</style>
