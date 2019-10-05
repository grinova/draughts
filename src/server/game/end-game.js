const Vec2 = require('../../common/vec2')
const possibleMovePositions = require('../../common/game/possible-move-positions')

function endGame(field) {
  let white = 0
  let black = 0
  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      const piece = field[row][column]
      if (piece == 'w' || piece == 'wk') {
        white += possibleMovePositions(new Vec2(column, row), field)
      } else if (piece == 'b' || piece == 'bk') {
        black += possibleMovePositions(new Vec2(column, row), field)
      }
    }
  }
  if (white == 0 || black == 0) {
    return { isEnd: true, winner: white > 0 ? 0 : 1 }
  }
  return { isEnd: false }
}

module.exports = endGame
