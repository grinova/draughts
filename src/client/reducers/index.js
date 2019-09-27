import { combineReducers } from 'redux'
import * as actions from '../actions'

function opponent(state = '', action) {
  switch (action.type) {
    case actions.PLAY_GAME_SUCC:
      console.log('Play game succ', action.opponent)
      return action.opponent
    case actions.PLAY_GAME_FAIL:
      console.log('Play game fail', action.opponent)
      return action.opponent
    case actions.PLAY_GAME:
      console.log('Play game', action.opponent)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  opponent
})

export default rootReducer
