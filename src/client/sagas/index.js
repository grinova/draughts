import { put, takeEvery, call } from 'redux-saga/effects'
import * as actions from '../actions'

export function fetchPlayGameApi(opponent) {
  return new Promise((resolve) => {
    if (opponent === '') {
      opponent = 'random-opponent'
    }
    resolve({ opponent: 'test-opponent' })
  })
}

export function* playGame(action) {
  try {
    const opponent = yield call(fetchPlayGameApi, action.opponent)
    yield put(actions.playGameSucc(opponent))
  } catch (error) {
    yield put(actions.playGameFail(opponent))
  }
}

export default function* rootSaga() {
  yield takeEvery(actions.PLAY_GAME, playGame)
}
