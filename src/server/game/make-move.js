const Vec2 = require('../../common/vec2')
const posibleMovePositions = require('../../common/game/possible-move-positions')

function checkKings(field) {
  for (let i = 0; i < 8; i += 2) {
    if (field[0][i + 1] == 'w') {
      field[0][i + 1] = 'wk'
    }
    if (field[7][i] == 'b') {
      field[7][i] = 'bk'
    }
  }
}

function makeMove(move, field) {
  const from = new Vec2(move.from.column, move.from.row)
  const to = new Vec2(move.to.column, move.to.row)

  for (let possibleMove of posibleMovePositions(from, field)) {
    const { position, take } = possibleMove
    if (position.equal(to)) {
      if (take) {
        field[take.y][take.x] = ' '
      }
      const piece = field[from.y][from.x]
      field[from.y][from.x] = ' '
      field[to.y][to.x] = piece
      checkKings(field)
      return { field }
    }
  }

  return { error: 'Incorrect move' }
}

module.exports = makeMove
