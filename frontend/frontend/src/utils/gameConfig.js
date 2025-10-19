// Time Control Configurations
export const TIME_CONTROL_CATEGORIES = [
  {
    name: "Bullet",
    options: [
      { minutes: 1, increment: 0 },
      { minutes: 1, increment: 1 },
      { minutes: 2, increment: 1 },
    ],
  },
  {
    name: "Blitz",
    options: [
      { minutes: 3, increment: 0 },
      { minutes: 3, increment: 2 },
      { minutes: 5, increment: 0 },
    ],
  },
  {
    name: "Rapid",
    options: [
      { minutes: 10, increment: 0 },
      { minutes: 15, increment: 10 },
      { minutes: 30, increment: 0 },
    ],
  },
];

// Game State Content Configurations
export const GAME_STATE_CONTENT = {
  welcome: {
    title: "Welcome to Chess!",
    icon: "♟️",
    message: "Select your time control to begin!",
  },
  checkmate: {
    title: "Checkmate!",
    icon: "🏆",
    message: "The king has been checkmated!",
  },
  stalemate: {
    title: "Draw!",
    icon: "🤝",
    message: "Draw due to stalemate",
  },
  "insufficient material": {
    title: "Draw!",
    icon: "⚖️",
    message: "Draw due to insufficient material",
  },
  "three-fold repetition": {
    title: "Draw!",
    icon: "🔄",
    message: "Draw due to three fold repetition",
  },
  time_expired: {
    title: "Time's Up!",
    icon: "⏰",
    message: "Time has expired!",
  },
};

// Default game configurations
export const DEFAULT_TIME_CONTROL = {
  minutes: 10,
  increment: 0,
};

// Utility functions
export const convertMinutesToSeconds = (minutes) => minutes * 60;

export const determineWinner = (
  gameEndState,
  whiteToMove,
  timerExpiredPlayer = null
) => {
  const winnerMap = {
    checkmate: whiteToMove ? "Black" : "White",
    time_expired: timerExpiredPlayer === "White" ? "Black" : "White",
  };

  return winnerMap[gameEndState] || null;
};
