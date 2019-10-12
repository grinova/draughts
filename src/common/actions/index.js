const createAction = require('redux-actions').createAction

const STATE = 'client/state'
const PLAY_GAME = 'server/play'
const MOVE = 'server/move'
const GAME_INFO = 'client/game-info'
const GAME_STATE = 'client/game-state'
const LEAVE = 'server/leave'
const LOG = 'client/log'

const state = createAction(STATE)
const playGame = createAction(PLAY_GAME)
const move = createAction(MOVE)
const gameInfo = createAction(GAME_INFO)
const gameState = createAction(GAME_STATE)
const leave = createAction(LEAVE)
const log = createAction(LOG)

module.exports = {
  STATE,
  PLAY_GAME,
  MOVE,
  GAME_INFO,
  GAME_STATE,
  LEAVE,
  LOG,
  state,
  playGame,
  move,
  gameInfo,
  gameState,
  leave,
  log
}
