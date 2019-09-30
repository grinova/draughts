import { combineReducers } from 'redux'
import { handleAction } from 'redux-actions'
import { USER_NAME_CHANGE } from '../actions'
import {
  SESSION_ID,
  STATUS,
  OPPONENT_NAME
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

function opponent(state = '', action) {
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
})

export default rootReducer
