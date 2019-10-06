const Vec2 = require('../../common/vec2')
const availableMoves = require('../../common/game/available-moves')

function endGame(activePlayer, field) {
  if (availableMoves(activePlayer, field).length == 0) {
    return { isEnd: true, winner: (activePlayer + 1) % 2 }
  }
  return { isEnd: false }
}

module.exports = endGame
