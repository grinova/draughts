const uuid = require('uuid')

class Player {
  constructor(id, store, managers) {
    this.id = id
    this.store = store
    this.managers = managers
  }

  async onPlay(username) {
    const session = await this._getSession()
    session.setUsername(username)
    session.onLeave()
    const opponentSessionData = await this.store.findStandbySessionForPlayer(this.id)
    if (opponentSessionData) {
      const opponentSessionID = opponentSessionData.id
      const gameID = uuid()
      await this.store.createGame(gameID, this.id, opponentSessionID)
      const game = await this.managers.game.get(gameID)
      const opponentSession = await this.managers.session.get(opponentSessionID)
      session.onPlay(game)
      opponentSession.onPlay(game)
      game.onPlay()
    } else {
      session.onPlay()
    }
  }

  async onMove(move) {
    const session = await this._getSession()
    session.onMove(move)
  }

  async onLeave() {
    const session = await this._getSession()
    session.onLeave()
  }

  async onDisconnect() {
    const session = await this._getSession()
    if (session) {
      session.disconnect()
    }
  }

  async _getSession() {
    this.session = this.session || await this.managers.session.get(this.id)
    if (this.session) {
      return this.session
    }
    await this.store.createSession(this.id)
    return await this.managers.session.get(this.id)
  }
}

module.exports = Player
