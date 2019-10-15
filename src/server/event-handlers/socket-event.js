const actions = require('../../common/actions')

class SocketEventHandler {
  constructor(player) {
    this.player = player
  }

  async onAction(action) {
    switch (action.type) {
      case actions.PLAY_GAME: {
          const { payload: username } = action
          this.player.onPlay(username)
        } break;
      case actions.MOVE: {
          const { payload: move } = action
          this.player.onMove(move)
        } break;
      case actions.LEAVE: {
          this.player.onLeave()
        } break;
    }
  }

  async onDisconnect() {
    this.player.onDisconnect()
  }
}

module.exports = SocketEventHandler
