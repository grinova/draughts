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

  updateStateNotify() {
    for (let session of this.sessions) {
      session.updateState(this.state)
    }
  }
}

module.exports = Game
