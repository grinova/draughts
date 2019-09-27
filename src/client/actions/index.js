export const PLAY_GAME = 'PLAY_GAME'
export const PLAY_GAME_SUCC = 'REQUEST_PLAY_GAME_SUCC'
export const PLAY_GAME_FAIL = 'REQUEST_PLAY_GAME_FAIL'

export function playGame(opponent = '') {
  return {
    type: PLAY_GAME,
    opponent
  }
}

export function playGameSucc(opponent) {
  return {
    type: PLAY_GAME_SUCC,
    opponent
  }
}

export function playGameFail(opponent) {
  return {
    type: PLAY_GAME_FAIL,
    opponent
  }
}
