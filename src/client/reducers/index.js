import { combineReducers } from 'redux'
import { handleAction } from 'redux-actions'
import * as actions from '../actions'
import { OPPONENT_NAME } from '../../common/actions'

const username = handleAction(
  actions.userNameChange,
  (state, { payload: username }) => username,
  ''
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
})

export default rootReducer
