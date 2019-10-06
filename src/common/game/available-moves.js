const { isOwnPiece } = require('./common')
const possibleMovePositions = require('./possible-move-positions')
const Vec2 = require('../vec2')

const activePlayerMan = ['w', 'b']

function availableMoves(activePlayer, field) {
  const ownPiece = activePlayerMan[activePlayer]
  const moves = []
  const takeMoves = []
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const piece = field[y][x]
      if (isOwnPiece(ownPiece, piece)) {
        const from = new Vec2(x, y)
        for (let possibleMove of possibleMovePositions(from, field)) {
          const { position: to, take } = possibleMove
          if (take) {
            takeMoves.push({ from, to, take })
          } else {
            moves.push({ from, to })
          }
        }
      }
    }
  }
  if (takeMoves.length > 0) {
    return takeMoves
  } else {
    return moves
  }
}

module.exports = availableMoves
