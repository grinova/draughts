const createAction = require('redux-actions').createAction

const PLAY_GAME = 'server/play-game'
const SESSION_ID = 'client/session-id'
const STATUS = 'client/status'
const USER_STEP = 'server/user-step'
const STEP = 'client/step'
const GAME_STATE = 'client/game-state'
const LEAVE = 'server/leave-game'
const STATE = 'client/state'
const ERROR = 'client/error'

const playGame = createAction(PLAY_GAME)
const sessionId = createAction(SESSION_ID)
const status = createAction(STATUS)
const userStep = createAction(USER_STEP)
const step = createAction(STEP)
const gameState = createAction(GAME_STATE)
const leave = createAction(LEAVE)
const state = createAction(STATE)
const error = createAction(ERROR)

module.exports = {
  PLAY_GAME,
  SESSION_ID,
  STATUS,
  USER_STEP,
  STEP,
  GAME_STATE,
  LEAVE,
  STATE,
  ERROR,
  playGame,
  sessionId,
  status,
  userStep,
  step,
  gameState,
  leave,
  state,
  error
}
