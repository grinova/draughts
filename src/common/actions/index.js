const PLAY_GAME = 'server/play-game'
const OPPONENT_NAME = 'client/opponent-name'

function playGame(username) {
  return { type: PLAY_GAME, username }
}

function opponentName(opponent) {
  return { type: OPPONENT_NAME, opponent }
}

module.exports = {
  PLAY_GAME,
  OPPONENT_NAME,
  opponentName,
  playGame
}
