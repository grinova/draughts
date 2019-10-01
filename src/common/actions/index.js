const createAction = require('redux-actions').createAction

const PLAY_GAME = 'server/play-game'
const SESSION_ID = 'client/session-id'
const STATUS = 'client/status'
const OPPONENT = 'client/opponent-name'
const STEP = 'client/step'
const GAME_STATE = 'client/game-state'
const ERROR = 'client/error'

function playGame(username) {
  return { type: PLAY_GAME, username }
}

const sessionId = createAction(SESSION_ID)
const status = createAction(STATUS)

function opponent(opponent) {
  return { type: OPPONENT, opponent }
}

const step = createAction(STEP)
const gameState = createAction(GAME_STATE)
const error = createAction(ERROR)

module.exports = {
  PLAY_GAME,
  SESSION_ID,
  STATUS,
  OPPONENT,
  STEP,
  GAME_STATE,
  ERROR,
  playGame,
  sessionId,
  status,
  opponent,
  step,
  gameState,
  error
}
