import { combineReducers } from 'redux'
import * as actions from '../actions'
import { OPPONENT_NAME } from '../../common/actions'

function username(state = '', action) {
  switch (action.type) {
    case actions.USER_NAME_CHANGE:
      return action.username
    default:
      return state
  }
}

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
