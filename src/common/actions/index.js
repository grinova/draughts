const createAction = require('redux-actions').createAction

const PLAY_GAME = 'server/play-game'
const SESSION_ID = 'client/session-id'
const STATUS = 'client/status'
const OPPONENT = 'client/opponent-name'

function playGame(username) {
  return { type: PLAY_GAME, username }
}

const sessionId = createAction(SESSION_ID)
const status = createAction(STATUS)

function opponent(opponent) {
  return { type: OPPONENT, opponent }
}

module.exports = {
  PLAY_GAME,
  SESSION_ID,
  STATUS,
  OPPONENT,
  playGame,
  sessionId,
  status,
  opponent
}
