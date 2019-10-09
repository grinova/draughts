const Vec2 = require('../../common/vec2')
const availableMoves = require('../../common/game/available-moves')
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

function mutateField(move, field) {
  const { from, to, take } = move
  if (take) {
    field[take.y][take.x] = ' '
  }
  field[to.y][to.x] = field[from.y][from.x]
  field[from.y][from.x] = ' '
  return !!take
}

function makeMove(move, state) {
  const { score, activePlayer, field, lastJumpPiece } = state
  const from = new Vec2(move.from.x, move.from.y)
  const to = new Vec2(move.to.x, move.to.y)
  const allowableMove = availableMoves(
      activePlayer,
      field,
      lastJumpPiece && new Vec2(lastJumpPiece.x, lastJumpPiece.y)
    ).find(move => move.from.equal(from) && move.to.equal(to))
  if (allowableMove) {
    if (mutateField(allowableMove, field)) {
      score[activePlayer]++
    }
    checkKings(field)
    const { take } = allowableMove
    const canMakeAnotherMove = take &&
      possibleMovePositions(to, field).some(({ take }) => take)
    const newActivePlayer = (state.activePlayer + (canMakeAnotherMove ? 0 : 1)) % 2
    const lastJumpPiece = take && canMakeAnotherMove ? { x: to.x, y: to.y } : null
    return { state: { score, activePlayer: newActivePlayer, field, lastJumpPiece } }
  }

  return { error: 'Incorrect move' }
}

module.exports = makeMove
