import { combineReducers } from 'redux'
import { handleAction } from 'redux-actions'
import { USER_NAME_CHANGE, SELECT_PIECE } from '../actions'
import { GAME_STATE, LOG } from '../../common/actions'

const username = handleAction(
  USER_NAME_CHANGE,
  (state, { payload: username }) => username,
  ''
)

const selectedPiece = handleAction(
  SELECT_PIECE,
  (state, { payload: pos }) => pos,
  null
)

const gameState = handleAction(
  GAME_STATE,
  (state, { payload: gameStateA }) => gameStateA,
  { score: [0, 0], field: [] }
)

const log = handleAction(
  LOG,
  (state, { payload: message }) => ([...state, message]).slice(-10),
  []
)

const rootReducer = combineReducers({
  username,
  selectedPiece,
  gameState,
  log
})

export default rootReducer
