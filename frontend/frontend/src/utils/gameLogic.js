import { apiServiceGET, apiServicePOST } from "@/utils/apiService";

export const gameLogic = {
  data() {
    return {
      position: {},
      selectedSquare: null,
      possibleMoves: [],
      whiteToMove: true,
      gameState: null,
      gameEnded: false,
    };
  },
  methods: {
    async getResponse(path, ...params) {
      const res = await apiServiceGET(path, ...params);
      if (!res?.success) {
        console.error(res.errorMsg);
      }
      return res;
    },
    async postResponse(path, data = {}) {
      const res = await apiServicePOST(path, data);
      if (!res?.success) {
        console.error(res.errorMsg);
      }
      return res;
    },
    async startNewGame() {
      const response = await this.postResponse("/new-game");
      if (response?.success) {
        // Reset local game state
        this.position = response.data;
        this.selectedSquare = null;
        this.possibleMoves = [];
        this.whiteToMove = true;
        this.gameState = null;
        this.gameEnded = false;
        return true;
      } else {
        console.error("Failed to start new game");
        return false;
      }
    },
    async fetchPiecePositions(move) {
      if (move === "start") {
        // Use startNewGame for initial setup
        await this.startNewGame();
      } else {
        const response = await this.getResponse(
          `/get-piece-positions?move=${move}`
        );
        if (response?.success) {
          this.position = response.data;
        }
      }
    },
    async fetchPossibleMoves(square) {
      const response = await this.getResponse(
        `/get-possible-moves?square=${square}`
      );
      if (response?.success) {
        this.possibleMoves = response.data;
      } else {
        this.possibleMoves = [];
      }
    },
    async makeMove(startSquare, endSquare) {
      const response = await this.postResponse("/make-move", {
        start: startSquare,
        end: endSquare,
      });

      if (response?.success) {
        const result = response.data;
        this.position = result.piecePositions;
        this.whiteToMove = !this.whiteToMove;

        // Check for game end conditions
        if (result.gameState) {
          this.gameState = result.gameState;
          this.gameEnded = [
            "checkmate",
            "stalemate",
            "insufficient material",
            "three-fold repetition",
          ].includes(result.gameState);
        }

        return result;
      } else {
        console.error("Failed to make move");
        return null;
      }
    },
  },
};
