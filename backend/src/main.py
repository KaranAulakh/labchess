import logging 
import uuid
from typing import Union, Dict
from flask import Flask, jsonify, Response, request
from flask_cors import CORS

from gameplay.gameState import GameState

app = Flask(__name__)
logger = logging.getLogger(__name__)

# Dictionary to store game states by game_id
game_states: Dict[str, GameState] = {}

CORS(app, resources={r"/*": {'origins': [
    'http://localhost:8081',
    'https://labchess.com',
    'https://www.labchess.com'
]}})

# todo - create a valuable home page
@app.route('/', methods=['GET'])
def test() -> str:
  return ("Home page incoming")

@app.route('/play', methods=['GET'])
def play() -> str:
  return ("Let's play chess")

@app.route('/new-game', methods=['POST'])
def new_game() -> Response:
    """Create a new game and return the game_id with start positions"""
    try:
        game_id = str(uuid.uuid4())
        game_states[game_id] = GameState()
        logger.info(f"Created new game: {game_id}")
        
        return jsonify({
            "game_id": game_id,
            "piece_positions": game_states[game_id].get_serialized_piece_positions()
        })
    except Exception as e:
        logger.error(f"Error creating new game: {str(e)}")
        return jsonify({"error": "Failed to create new game"}), 500

@app.route('/get-possible-moves')
def get_possible_moves() -> Union[Response, tuple[Response, int]]:
    game_id = request.args.get('game_id')
    square = request.args.get('square')
    
    if not game_id:
        return jsonify({"error": "game_id parameter is required"}), 400
    if not square:
        return jsonify({"error": "square parameter is required"}), 400
    
    if game_id not in game_states:
        return jsonify({"error": "Game not found"}), 404
    
    game_state = game_states[game_id]
    
    # Check if there's a piece at this square
    if square not in game_state.piece_positions:
        return jsonify({"error": "Square must contain a piece upon it"}), 400
    
    try: 
        return jsonify(game_state.get_legal_moves(square))
    except Exception as e: 
        logger.error(f"Error getting legal moves: {str(e)}")
        return jsonify({"error": "Failed to get legal moves"}), 500

@app.route('/make-move', methods=['POST'])
def make_move() -> Union[Response, tuple[Response, int]]:
    data = request.json
    game_id = data.get('game_id')
    start_square = data.get('start')
    end_square = data.get('end')
    
    if not game_id:
        return jsonify({"error": "game_id is required"}), 400
    if not start_square or not end_square:
        return jsonify({"error": "Both start and end squares are required"}), 400
    
    if game_id not in game_states:
        return jsonify({"error": "Game not found"}), 404
    
    game_state = game_states[game_id]
    
    try:
        return jsonify(game_state.move(start_square, end_square))
    except Exception as e:
        logger.error(f"Error making a move: {str(e)}")
        return jsonify({"error": "Failed to make a move"}), 500

@app.route('/get-piece-positions')
def get_piece_positions() -> Union[Response, tuple[Response, int]]:
    game_id = request.args.get('game_id')
    
    if not game_id:
        return jsonify({"error": "game_id parameter is required"}), 400
    
    if game_id not in game_states:
        return jsonify({"error": "Game not found"}), 404
    
    game_state = game_states[game_id]

    try: 
        return jsonify(game_state.get_piece_positions)
    except Exception as e:
        logger.error(f"Error getting piece positions: {str(e)}")
        return jsonify({"error": "Failed to get piece positions"}), 500

@app.route('/promote-pawn', methods=['POST'])
def promote_pawn() -> Union[Response, tuple[Response, int]]:
    data = request.json
    game_id = data.get('game_id')
    pawn_location = data.get('pawnLocation')
    promote_to = data.get('promoteTo')
    
    if not game_id:
        return jsonify({"error": "game_id is required"}), 400
    if not pawn_location or not promote_to:
        return jsonify({"error": "Both pawnLocation and promoteTo are required"}), 400
    
    if game_id not in game_states:
        return jsonify({"error": "Game not found"}), 404
    
    game_state = game_states[game_id]
    
    if promote_to not in ["Queen", "Rook", "Bishop", "Knight"]:
        return jsonify({"error": "Invalid promotion piece type"}), 400
    
    try:
        return jsonify(game_state.promote_pawn(pawn_location, promote_to))
    except Exception as e:
        logger.error(f"Error promoting pawn: {str(e)}")
        return jsonify({"error": "Failed to promote pawn"}), 500

if __name__ == "__main__":
  import os
  port = int(os.environ.get("PORT", 5001))
  app.run(host="0.0.0.0", port=port, debug=False)