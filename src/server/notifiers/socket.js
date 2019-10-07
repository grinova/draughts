const actions = require('../../common/actions')

class SocketNotifier {
  constructor(socket) {
    this.socket = socket
  }

  wait() {
    this.emit(actions.log('waiting'))
  }

  play() {
  }

  state(state) {
    this.emit(actions.gameState(state))
  }

  toss(side) {
    this.emit(actions.log(side))
  }

  leave() {
    this.emit(actions.log('you-leave'))
  }

  opponentLeave() {
    this.emit(actions.log('opponent-leave'))
  }

  yourStep() {
    this.emit(actions.log('your-step'))
  }

  opponentStep() {
    this.emit(actions.log('opponent-step'))
  }

  win() {
    this.emit(actions.log('you-win'))
  }

  lose() {
    this.emit(actions.log('you-lose'))
  }

  error(error) {
    this.emit(actions.log(`error{${error}}`))
  }

  emit(payload) {
    this.socket.emit('action', payload)
  }
}

module.exports = SocketNotifier
