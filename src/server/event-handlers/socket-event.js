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
        const gameID = await session.play()
        if (gameID) {
          const game = await this.gameManager.get(gameID)
          game.play()
        }
        break;
      case actions.USER_STEP:
        const { payload: move } = action
        const game = await this.gameManager.get(session.gameID)
        game.makeMove(move)
        break;
    }
  }
}


module.exports = SocketEventHandler
