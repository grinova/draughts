const createAction = require('redux-actions').createAction

const PLAY_GAME = 'server/play-game'
const SESSION_ID = 'client/session-id'
const STATUS = 'client/status'
const OPPONENT = 'client/opponent-name'
const USER_STEP = 'server/user-step'
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

const userStep = createAction(USER_STEP)
const step = createAction(STEP)
const gameState = createAction(GAME_STATE)
const error = createAction(ERROR)

module.exports = {
  PLAY_GAME,
  SESSION_ID,
  STATUS,
  OPPONENT,
  USER_STEP,
  STEP,
  GAME_STATE,
  ERROR,
  playGame,
  sessionId,
  status,
  opponent,
  userStep,
  step,
  gameState,
  error
}
