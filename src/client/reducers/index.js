import { combineReducers } from 'redux'
import { handleAction } from 'redux-actions'
import { USER_NAME_CHANGE, SELECT_PIECE } from '../actions'
import { GAME_STATE, GAME_INFO, LOG } from '../../common/actions'
import availableMoves from '../../common/game/available-moves'

const username = handleAction(
  USER_NAME_CHANGE,
  (state, { payload: username }) => username,
  ''
)

const selected = handleAction(
  SELECT_PIECE,
  (state, { payload: pos }) => pos,
  null
)

const gameInfo = handleAction(
  GAME_INFO,
  (state, { payload: gameInfo }) => gameInfo,
  {}
)

const gameState = handleAction(
  GAME_STATE,
  (state, { payload }) => payload,
  { score: [0, 0], field: [] }
)

const moves = handleAction(
  GAME_STATE,
  (state, { payload: { activePlayer, field } }) => {
    const moves = availableMoves(activePlayer, field)
    const res = field.map(row => row.map(() => ([])))
    for (let move of moves) {
      res[move.from.y][move.from.x].push(move.to)
    }
    return res
  },
  [
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []]
  ]
)

const log = handleAction(
  LOG,
  (state, { payload: message }) => ([...state, message]).slice(-10),
  []
)

const rootReducer = combineReducers({
  username,
  selected,
  gameInfo,
  gameState,
  moves,
  log
})

export default rootReducer
