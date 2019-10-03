const uuid = require('uuid')

class Session {
  constructor(id, /* username, status, meta,  */store, notifier) {
    this.id = id
    // this.username = username
    // this.status = status
    // this.meta = meta
    this.store = store
    this.notifier = notifier
  }

  async play() {
    this.notifier.wait()
    const opponentSession = await this.store.findStandbySessionForPlayer(this.id)
    if (opponentSession) {
      await this.store.updateSessionStatus(this.id, 'active')
      await this.store.updateSessionStatus(opponentSession.id, 'active')
      const gameID = uuid()
      await this.store.createGame(gameID, this.id, opponentSession.id)
      this.gameID = gameID
      opponentSession.gameID = gameID
      await this.store.linkSession(this.id, gameID)
      await this.store.linkSession(opponentSession.id, gameID)
      return gameID
    } else {
      this.store.updateSessionStatus(this.id, 'stand-by')
    }
  }

  updateState(state) {
    this.notifier.state(state)
  }
}

module.exports = Session
