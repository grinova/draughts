function isPiese(piese) {
  return piese == 'w' || piese == 'b'
}

function isEmptyTarget(target) {
  return target == ' '
}

function makeMove(move, field) {
  const piese = field[move.from.row][move.from.column]
  if (!isPiese(piese)) {
    return { error: 'It\'s not yout piese' }
  }
  const forward = piese == 'w' ? -1 : 1
  const target = field[move.to.row][move.to.column]
  if (!isEmptyTarget(target)) {
    return { error: 'Target not empty' }
  }
  if (move.to.row - move.from.row == forward) {
    field[move.to.row][move.to.column] = piese
    field[move.from.row][move.from.column] = target
    return { field }
  }
  return { error: 'Not implemented' }
}

module.exports = makeMove
