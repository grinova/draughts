const uuid = require('uuid')

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

  close() {
    this.store.removeSession(id)
    this.remove()
  }

  async play() {
    this.notifier.wait()
    const opponentSessionData = await this.store.findStandbySessionForPlayer(this.id)
    if (opponentSessionData) {
      await this.store.updateSessionStatus(this.id, 'active')
      await this.store.updateSessionStatus(opponentSessionData.id, 'active')
      const gameID = uuid()
      const opponentSessionID = opponentSessionData.id
      await this.store.createGame(gameID, this.id, opponentSessionID)
      return { opponentSessionID, gameID }
    } else {
      this.store.updateSessionStatus(this.id, 'stand-by')
    }
  }

  makeMove(move) {
    this.game.makeMove(move)
  }

  leave() {
    if (this.game) {
      this.game.leave(this.id)
      this.game = null
      this._standBy()
    }
  }

  opponentLeave() {
    this._standBy()
    this.notifier.opponentLeave()
  }

  win() {
    this._standBy()
    this.notifier.win()
  }

  lose() {
    this._standBy()
    this.notifier.lose()
  }

  async join(game) {
    this.game = game
    await this.store.joinGame(this.id, this.game.id)
  }

  updateState(state) {
    this.notifier.state(state)
  }

  async _standBy() {
    await this.store.leaveGame(this.id)
    await this.store.updateSessionStatus(this.id, 'stand-by')
  }
}

module.exports = Session
