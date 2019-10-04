const endGame = require('../game/end-game')
const makeMove = require('../game/make-move')

class Game {
  constructor(id, players, state, store, sessions, remove) {
    this.id = id
    this.players = players
    this.state = state
    this.store = store
    this.sessions = sessions
    this.remove = remove
  }

  close() {
    this.store.removeGame(this.id)
    this.remove()
  }

  async onPlay() {
    this.notify()
  }

  async onMove(move) {
    const { error, field } = makeMove(move, this.state.field)
    if (error) {
      return
    }
    const { isEnd, winner } = endGame(field)
    if (isEnd) {
      this.close()
      const winnerID = this.players[winner]
      const loserID = this.players[(winner + 1) % 2]
      this.sessions[winnerID].onWin()
      this.sessions[loserID].onLose()
    } else {
      this.state.field = field
      await this.store.updateGameState(this.id, this.state)
      this.notify()
    }
  }

  async onLeave(sessionID) {
    for (let id in this.sessions) {
      const session = this.sessions[id]
      if (id != sessionID) {
        session.onOpponentLeave()
      }
    }
    this.close()
  }

  notify() {
    for (let id in this.sessions) {
      this.sessions[id].updateState(this.state)
    }
  }
}

module.exports = Game
