const Vec2 = require('../../common/vec2')
const allowableMoves = require('../../common/game/available-moves')
const possibleMovePositions = require('../../common/game/possible-move-positions')

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

function makeMove(activePlayer, move, field) {
  const from = new Vec2(move.from.column, move.from.row)
  const to = new Vec2(move.to.column, move.to.row)
  let canMakeAnotherMove = false
  for (let allowableMove of allowableMoves(activePlayer, field)) {
    if (allowableMove.from.equal(from) && allowableMove.to.equal(to)) {
      const { take } = allowableMove
      if (take) {
        field[take.y][take.x] = ' '
      }
      const piece = field[from.y][from.x]
      field[from.y][from.x] = ' '
      field[to.y][to.x] = piece
      checkKings(field)
      if (take) {
        for (let possibleMove of possibleMovePositions(allowableMove.to, field)) {
          if (possibleMove.take) {
            canMakeAnotherMove = true
          }
        }
      }
      return { field, canMakeAnotherMove }
    }
  }

  return { error: 'Incorrect move' }
}

module.exports = makeMove
