const { STAND_BY } = require('../../common/state')

class Session {
  constructor(id, username, /* status, meta,  */game, store, notifier, remove) {
    this.id = id
    this.game = game
    this.username = username
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

  getUserName() {
    return this.username
  }

  setUsername(username) {
    this.username = username
    return this.store.updateSession(this.id, { username })
  }

  async onPlay(game) {
    if (game) {
      this.game = game
      await this.store.updateSessionStatus(this.id, 'active')
      await this.store.joinGame(this.id, this.game.id)
    } else {
      this.store.updateSessionStatus(this.id, STAND_BY)
      this.notifier.wait()
    }
  }

  async onGameInfo(gameInfo) {
    this.notifier.gameInfo(gameInfo)
  }

  async onMove(move) {
    if (this.game) {
      const error = await this.game.onMove(this.id, move)
      if (error) {
        this.notifier.error(error)
      }
    } else {
      this.notifier.error('You are not in the game')
    }
  }

  async onLeave() {
    if (this.game) {
      this.game.onLeave(this.id)
      this._exitGame()
      this.notifier.leave()
    }
  }

  async onOpponentLeave() {
    this._exitGame()
    this.notifier.opponentLeave()
  }

  async onYourStep() {
    this.notifier.yourStep()
  }

  async onOpponentStep() {
    this.notifier.opponentStep()
  }

  async onWin() {
    this._exitGame()
    this.notifier.win()
  }

  async onError(error) {
    this.notifier.error(error)
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
