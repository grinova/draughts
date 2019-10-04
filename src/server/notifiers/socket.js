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

  leave() {
    this.emit(actions.state('you-leave'))
  }

  opponentLeave() {
    this.emit(actions.state('opponent-leave'))
  }

  win() {
    this.emit(actions.state('you-win'))
  }

  lose() {
    this.emit(actions.state('you-lose'))
  }

  emit(payload) {
    this.socket.emit('action', payload)
  }
}

module.exports = SocketNotifier
