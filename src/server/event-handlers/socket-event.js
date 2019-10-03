const actions = require('../../common/actions')

class SocketEventHandler {
  constructor(id, sessionManager, gameManager) {
    this.id = id
    this.sessionManager = sessionManager
    this.gameManager = gameManager
    this.handle = this.handle.bind(this)
  }

  async handle(action) {
    const session = await this.sessionManager.get(this.id)
    switch (action.type) {
      case actions.PLAY_GAME:
        const res = await session.play()
        if (res) {
          const { gameID, opponentSessionID } = res
          const game = await this.gameManager.get(gameID)
          const opponentSession = await this.sessionManager.get(opponentSessionID)
          session.join(game)
          opponentSession.join(game)
          game.play()
        }
        break;
      case actions.USER_STEP: {
          const { payload: move } = action
          session.makeMove(move)
        } break;
      case actions.LEAVE: {
          session.leave()
        } break;
    }
  }
}

module.exports = SocketEventHandler
