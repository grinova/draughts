const {
  isEmpty,
  isPiece,
  isOwnPiece,
  isEnemyPiece,
  isMan,
  isKing,
  getForwardDirection
} = require('./common')
const Vec2 = require('../../common/vec2')

function inField(pos) {
  return pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8
}

function* possibleMovePositions(pos, field) {
  const ownPiece = field[pos.y][pos.x]
  if (!isPiece(ownPiece)) {
    return
  }
  const forward = getForwardDirection(ownPiece)
  if (isMan(ownPiece)) {
    for (let xDirection of [-1, 1]) {
      const direction  = new Vec2(xDirection, forward)
      const movePosition = pos.add(direction)
      if (inField(movePosition)) {
        const moveTarget = field[movePosition.y][movePosition.x]
        if (isEmpty(moveTarget)) {
          yield { position: movePosition }
        } else {
          if (isEnemyPiece(ownPiece, moveTarget)) {
            const jumpPosition = movePosition.add(direction)
            if (inField(jumpPosition)) {
              const jumpTarget = field[jumpPosition.y][jumpPosition.x]
              if (isEmpty(jumpTarget)) {
                yield { position: jumpPosition, take: movePosition }
              }
            }
          }
        }
      }
    }
    for (let xDirection of [-1, 1]) {
      const direction = new Vec2(xDirection, -forward)
      const takePosition = pos.add(direction)
      const jumpPosition = takePosition.add(direction)
      const takePiece = field[takePosition.y][takePosition.x]
      const jumpTarget = field[jumpPosition.y][jumpPosition.x]
      if (isEnemyPiece(ownPiece, takePiece) && isEmpty(jumpTarget)) {
        yield { position: jumpPosition, take: takePosition }
      }
    }
  } else if (isKing(ownPiece)) {
    for (let yDirection of [-1, 1]) {
      for (let xDirection of [-1, 1]) {
        const direction = new Vec2(xDirection, yDirection)
        let canMove = true
        let takePosition
        let movePosition = pos
        while (canMove) {
          movePosition = movePosition.add(direction)
          if (!inField(movePosition)) {
            canMove = false
          } else {
            const target = field[movePosition.y][movePosition.x]
            if (isEmpty(target)) {
              yield { position: movePosition, take: takePosition }
            } else if (isOwnPiece(ownPiece, target)) {
              canMove = false
            } else if (isEnemyPiece(ownPiece, target)) {
              if (takePosition) {
                canMove = false
              } else {
                takePosition = movePosition
                const jumpPosition = takePosition.add(direction)
                if (isEmpty(jumpPosition)) {
                  yield { position: jumpPosition, take: takePosition }
                }
              }
            }
          }
        }
      }
    }
  }
}

module.exports = possibleMovePositions
