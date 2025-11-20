<template>
  <PopupContainer :visible="visible">
    <div class="promotion-header">
      <div class="promotion-icon">♟️</div>
      <h2 class="promotion-title">Promote Pawn</h2>
      <p class="promotion-message">Choose a piece:</p>
    </div>

    <div class="piece-selection">
      <div
        v-for="piece in promotionPieces"
        :key="piece.type"
        class="piece-option"
        @click="selectPiece(piece.type)"
      >
        <img :src="piece.image" :alt="piece.type" class="piece-image" />
        <span>{{ piece.type }}</span>
      </div>
    </div>
  </PopupContainer>
</template>

<script>
import PopupContainer from "./PopupContainer.vue";

export default {
  name: "PawnPromotionPopup",
  components: {
    PopupContainer,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    isWhite: {
      type: Boolean,
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
      this.$emit("piece-selected", pieceType);
    },
  },
};
</script>

<style scoped>
.promotion-header {
  margin-bottom: 16px;
  text-align: center;
}

.promotion-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.promotion-title {
  font-size: 20px;
  margin: 0 0 8px 0;
  color: #ecf0f1;
}

.promotion-message {
  font-size: 14px;
  margin: 0;
  color: #908f8f;
}

.piece-selection {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.piece-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #34495e;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.piece-option:hover {
  border-color: #4a6741;
  background: #3d5a73;
  transform: translateY(-2px);
}

.piece-image {
  width: 60px;
  height: 60px;
  margin-bottom: 8px;
  pointer-events: none;
}
</style>
