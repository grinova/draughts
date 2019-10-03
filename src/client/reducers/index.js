import { combineReducers } from 'redux'
import { handleAction } from 'redux-actions'
import { USER_NAME_CHANGE } from '../actions'
import {
  SESSION_ID,
  STATUS,
  OPPONENT_NAME,
  GAME_STATE,
  STATE
} from '../../common/actions'

const username = handleAction(
  USER_NAME_CHANGE,
  (state, { payload: username }) => username,
  ''
)

const sessionId = handleAction(
  SESSION_ID,
  (state, { payload: id }) => id,
  ''
)

const status = handleAction(
  STATUS,
  (state, { payload: status }) => status,
  'stand-by'
)

const gameState = handleAction(
  GAME_STATE,
  (state, { payload: gameStateA }) => gameStateA,
  { score: [0, 0], field: [] }
)

const state = handleAction(
  STATE,
  (state, { payload }) => payload,
  ''
)

function opponent(state = '', action) {
  console.log(action)
  switch (action.type) {
    case OPPONENT_NAME:
      return action.opponent
    default:
      return state
  }
}

const rootReducer = combineReducers({
  username,
  opponent,
  sessionId,
  status,
  gameState,
  state
})

export default rootReducer
