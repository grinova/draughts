const actions = require('../../common/actions')

class SocketNotifier {
  constructor(socket) {
    this.socket = socket
  }

  wait() {
    this.emit(actions.status('stand-by'))
  }

  play() {
    this.emit(actions.status('active'))
  }

  state(state) {
    this.emit(actions.gameState(state))
  }

  emit(payload) {
    this.socket.emit('action', payload)
  }
}

module.exports = SocketNotifier
