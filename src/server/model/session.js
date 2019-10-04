class Session {
  constructor(id, /* username, status, meta,  */game, store, notifier, remove) {
    this.id = id
    this.game = game
    // this.username = username
    // this.status = status
    // this.meta = meta
    this.store = store
    this.notifier = notifier
    this.remove = remove
  }

  disconnect() {
    this.onLeave()
    this.store.removeSession(this.id)
    this.remove()
  }

  async onPlay(game) {
    if (game) {
      this.game = game
      await this.store.joinGame(this.id, this.game.id)
    } else {
      this.store.updateSessionStatus(this.id, 'stand-by')
    }
    this.notifier.wait()
  }

  async onMove(move) {
    this.game.onMove(move)
  }

  async onLeave() {
    if (this.game) {
      this.game.onLeave(this.id)
      this._exitGame()
    }
    this.notifier.leave()
  }

  async onOpponentLeave() {
    this._exitGame()
    this.notifier.opponentLeave()
  }

  async onWin() {
    this._exitGame()
    this.notifier.win()
  }

  async onLose() {
    this._exitGame()
    this.notifier.lose()
  }

  updateState(state) {
    this.notifier.state(state)
  }

  async _exitGame() {
    await this.store.exitGame(this.id)
    this.game = null
  }
}

module.exports = Session
