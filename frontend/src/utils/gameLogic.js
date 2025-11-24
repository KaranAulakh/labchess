import { apiServiceGET, apiServicePOST } from "@/utils/apiService";

export const gameLogic = {
  data() {
    return {
      game_id: null,
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
        // Store the game_id from the response
        this.game_id = response.data.game_id;
        // Reset local game state
        this.position = response.data.piece_positions;
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
        if (!this.game_id) {
          console.error("No game_id available");
          return;
        }

        const response = await this.getResponse(
          `/get-piece-positions?game_id=${this.game_id}&move=${move}`
        );
        if (response?.success) {
          this.position = response.data;
        }
      }
    },
    async fetchPossibleMoves(square) {
      if (!this.game_id) {
        console.error("No game_id available");
        this.possibleMoves = [];
        return;
      }

      const response = await this.getResponse(
        `/get-possible-moves?game_id=${this.game_id}&square=${square}`
      );
      if (response?.success) {
        this.possibleMoves = response.data;
      } else {
        this.possibleMoves = [];
      }
    },
    async makeMove(startSquare, endSquare) {
      if (!this.game_id) {
        console.error("No game_id available");
        return null;
      }

      const response = await this.postResponse("/make-move", {
        game_id: this.game_id,
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
    async promotePawn(pawnLocation, promoteTo) {
      if (!this.game_id) {
        console.error("No game_id available");
        return false;
      }

      const response = await this.postResponse("/promote-pawn", {
        game_id: this.game_id,
        pawnLocation,
        promoteTo,
      });

      if (response?.success) {
        this.position = response.data;
        return true;
      } else {
        console.error("Failed to promote pawn");
        return false;
      }
    },
  },
};
