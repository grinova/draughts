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

function possibleMovePositions(from, field) {
  const ownPiece = field[from.y][from.x]
  if (!isPiece(ownPiece)) {
    return []
  }
  const res = []
  const forward = getForwardDirection(ownPiece)
  if (isMan(ownPiece)) {
    for (let xDirection of [-1, 1]) {
      const direction  = new Vec2(xDirection, forward)
      const movePosition = from.add(direction)
      if (inField(movePosition)) {
        const moveTarget = field[movePosition.y][movePosition.x]
        if (isEmpty(moveTarget)) {
          res.push({ position: movePosition })
        } else {
          if (isEnemyPiece(ownPiece, moveTarget)) {
            const jumpPosition = movePosition.add(direction)
            if (inField(jumpPosition)) {
              const jumpTarget = field[jumpPosition.y][jumpPosition.x]
              if (isEmpty(jumpTarget)) {
                res.push({ position: jumpPosition, take: movePosition })
              }
            }
          }
        }
      }
    }
    for (let xDirection of [-1, 1]) {
      const direction = new Vec2(xDirection, -forward)
      const takePosition = from.add(direction)
      const jumpPosition = takePosition.add(direction)
      if (inField(takePosition) && inField(jumpPosition)) {
        const takePiece = field[takePosition.y][takePosition.x]
        const jumpTarget = field[jumpPosition.y][jumpPosition.x]
        if (isEnemyPiece(ownPiece, takePiece) && isEmpty(jumpTarget)) {
          res.push({ position: jumpPosition, take: takePosition })
        }
      }
    }
  } else if (isKing(ownPiece)) {
    for (let yDirection of [-1, 1]) {
      for (let xDirection of [-1, 1]) {
        const direction = new Vec2(xDirection, yDirection)
        let canMove = true
        let takePosition
        let movePosition = from
        while (canMove) {
          movePosition = movePosition.add(direction)
          if (!inField(movePosition)) {
            canMove = false
          } else {
            const target = field[movePosition.y][movePosition.x]
            if (isEmpty(target)) {
              res.push({ position: movePosition, take: takePosition })
            } else if (isOwnPiece(ownPiece, target)) {
              canMove = false
            } else if (isEnemyPiece(ownPiece, target)) {
              if (takePosition) {
                canMove = false
              } else {
                takePosition = movePosition
                const jumpPosition = takePosition.add(direction)
                if (isEmpty(jumpPosition)) {
                  res.push({ position: jumpPosition, take: takePosition })
                }
              }
            }
          }
        }
      }
    }
  }
  return res;
}

module.exports = possibleMovePositions
