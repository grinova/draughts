const Vec2 = require('../../common/vec2')

function forwardDirection(piese) {
  switch(piese) {
    case 'w':
    case 'wk':
      return -1
    case 'b':
    case 'bk':
      return 1
  }
}

function isPiese(piese) {
  return piese == 'w' || piese == 'b' || piese == 'wk' || piese == 'bk'
}

function isEmpty(target) {
  return target == ' '
}

function isMan(piese) {
  return piese == 'w' || piese == 'b'
}

function isKing(piese) {
  return piese == 'wk' || piese == 'bk'
}

function isOwnPiese(ownPiese, piese) {
  return (
    (ownPiese == 'w' || ownPiese == 'wk') &&
      (piese == 'w' || piese == 'wk') ||
    (ownPiese == 'b' || ownPiese == 'bk') &&
      (piese == 'b' || piese == 'bk')
  )
}

function isOpponentPiese(ownPiese, piese) {
  return (
    (ownPiese == 'w' || ownPiese == 'wk') &&
      (piese == 'b' || piese == 'bk') ||
    (ownPiese == 'b' || ownPiese == 'bk') &&
      (piese == 'w' || piese == 'wk')
  )
}

function movePiese(piese, move, field) {
  field[move.from.row][move.from.column] = ' '
  field[move.to.row][move.to.column] = piese
}

function makeMove(move, field) {
  const from = new Vec2(move.from.column, move.from.row)
  const to = new Vec2(move.to.column, move.to.row)
  const delta = to.sub(from)
  if (
    from.x < 0  || from.x > 7 || from.y < 0  || from.y > 7 ||
    to.x < 0    || to.x > 7   || to.y < 0    || to.y > 7 ||
    delta.x * delta.x != delta.y * delta.y ||
    from.equal(to)
  ) {
    return { error: 'Incorrect move' }
  }
  const piese = field[from.y][from.x]
  if (!isPiese(piese)) {
    return { error: 'Incorrect move' }
  }
  const target = field[to.y][to.x]
  if (!isEmpty(target)) {
    return { error: 'Incorrect move' }
  }
  if (isMan(piese)) {
    if (
      delta.y == forwardDirection(piese) &&
      (delta.x == 1 || delta.x == -1)
    ) {
    } else if (delta.y * delta.y + delta.x * delta.x == 8) {
      const opponentPiesePos = from.add(delta.div(2))
      const opponentPiese = field[opponentPiesePos.y][opponentPiesePos.x]
      if (isOpponentPiese(piese, opponentPiese)) {
        field[opponentPiesePos.y][opponentPiesePos.x] = ' '
      }
    } else {
      return { error: 'Incorrect move' }
    }
  } else if (isKing(piese)) {
    const direction = delta.sign()
    let opponentPiesePos
    let current = from.add(direction)
    while (current.notEqual(to)) {
      const cell = field[current.y][current.x]
      if (isEmpty(cell)) {
      } else if (isOwnPiese(piese, cell)) {
        return { error: 'You can\'t move over your pieses' }
      } else if (isOpponentPiese(piese, cell)) {
        if (opponentPiesePos) {
          return { error: 'You can\'t move over two or more opponent pieses' }
        }
        opponentPiesePos = current
      }
      current = current.add(direction)
    }
    if (opponentPiesePos) {
      field[opponentPiesePos.y][opponentPiesePos.x] = ' '
    }
  }
  movePiese(piese, move, field)
  for (let i = 0; i < 8; i += 2) {
    if (field[0][i + 1] == 'w') {
      field[0][i + 1] = 'wk'
    }
    if (field[7][i] == 'b') {
      field[7][i] = 'bk'
    }
  }
  return { field }
}

module.exports = makeMove
