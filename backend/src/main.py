import logging 
import secrets
from typing import Union, Dict, Any, List
from flask import Flask, jsonify, Response, session
from flask_cors import CORS

from gameplay.gameState import GameState

app = Flask(__name__)
app.config.from_object(__name__)
app.secret_key = secrets.token_hex(16)  # Secret key for session management
logger = logging.getLogger(__name__)

# Dictionary to store game states per session
game_states: Dict[str, GameState] = {}

def get_or_create_game_state() -> GameState:
    """Get or create a game state for the current session"""
    session_id = session.get('session_id')
    if not session_id:
        session_id = secrets.token_hex(8)
        session['session_id'] = session_id
        logger.info(f"Created new session: {session_id}")
    
    if session_id not in game_states:
        game_states[session_id] = GameState()
        logger.info(f"Created new game state for session: {session_id}")
    
    return game_states[session_id]

# todo - make CORS restrictions tighter
CORS(app, resources={r"/*":{'origins': '*'}}, supports_credentials=True)

# todo - create a valuable home page
@app.route('/', methods=['GET'])
def test() -> str:
  return ("Home page incoming")

@app.route('/play', methods=['GET'])
def play() -> str:
  return ("Let's play chess")

@app.route('/new-game', methods=['POST'])
def new_game() -> Response:
    """Create a new game or reset the current game and return start positions"""
    try:
        game_state = get_or_create_game_state()
        game_state.reset_game()
        logger.info(f"Game reset for session: {session.get('session_id')}")
        return jsonify(game_state.get_serialized_piece_positions())
    except Exception as e:
        logger.error(f"Error creating new game: {str(e)}")
        return jsonify({"error": "Failed to create new game"}), 500

@app.route('/get-possible-moves')
def get_possible_moves() -> Union[Response, tuple[Response, int]]:
    from flask import request
    game_state = get_or_create_game_state()
    square = request.args.get('square')
    if not square:
        return jsonify({"error": "Square parameter is required"}), 400
    
    # Check if there's a piece at this square
    if square not in game_state.piece_positions:
        return jsonify({"error": "Square must contain a piece upon it"}), 400
    
    try: 
        return jsonify(game_state.get_legal_moves(square))
    except Exception as e: 
        logger.error(f"error getting start positions: {str(e)}")
        return jsonify({"error": "failed to get start positions"}), 500

@app.route('/make-move', methods=['POST'])
def make_move() -> Union[Response, tuple[Response, int]]:
    from flask import request
    game_state = get_or_create_game_state()
    data = request.json
    start_square = data.get('start')
    end_square = data.get('end')
    
    if not start_square or not end_square:
        return jsonify({"error": "Both start and end squares are required"}), 400
    
    try:
        return jsonify(game_state.move(start_square, end_square))
    except Exception as e:
        logger.error(f"error making a move: {str(e)}")
        return jsonify({"error": "failed to make a move"}), 500

@app.route('/get-piece-positions')
def get_piece_positions() -> Response:
    from flask import request
    game_state = get_or_create_game_state()
    move = request.args.get('move')

    try: 
        return jsonify(game_state.get_piece_positions)
    except Exception as e:
        logger.error(f"error getting piece positions: {str(e)}")
        return jsonify({"error": "failed to get piece positions"}), 500

@app.route('/promote-pawn', methods=['POST'])
def promote_pawn() -> Union[Response, tuple[Response, int]]:
    from flask import request
    game_state = get_or_create_game_state()
    data = request.json
    pawn_location = data.get('pawnLocation')
    promote_to = data.get('promoteTo')
    
    if not pawn_location or not promote_to:
        return jsonify({"error": "Both pawnLocation and promoteTo are required"}), 400
    
    if promote_to not in ["Queen", "Rook", "Bishop", "Knight"]:
        return jsonify({"error": "Invalid promotion piece type"}), 400
    
    try:
        return jsonify(game_state.promote_pawn(pawn_location, promote_to))
    except Exception as e:
        logger.error(f"error promoting pawn: {str(e)}")
        return jsonify({"error": "failed to promote pawn"}), 500

if __name__ == "__main__":
  import os
  port = int(os.environ.get("PORT", 5000))
  app.run(host="0.0.0.0", port=port, debug=False)