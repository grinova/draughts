const makeMove = require('../game/make-move')

class Game {
  constructor(id, state, store, sessions) {
    this.id = id
    this.state = state
    this.store = store
    this.sessions = sessions
  }

  play() {
    this.updateStateNotify()
  }

  async makeMove(move) {
    const { error, field } = makeMove(move, this.state.field)
    if (error) {
      return
    }
    this.state.field = field
    await this.store.updateGameState(this.id, this.state)
    this.updateStateNotify()
  }

  leave(sessionID) {
    for (let id in this.sessions) {
      const session = this.sessions[id]
      if (id != sessionID) {
        session.opponentLeave()
      }
    }
    this.store.removeGame(this.id)
  }

  updateStateNotify() {
    for (let id in this.sessions) {
      this.sessions[id].updateState(this.state)
    }
  }
}

module.exports = Game
