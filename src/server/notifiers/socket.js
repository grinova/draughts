const actions = require('../../common/actions')
const { DEFAULT, STAND_BY, PLAY } = require('../../common/state')

class SocketNotifier {
  constructor(socket) {
    this.socket = socket
  }

  wait() {
    this.emit(actions.log('waiting'))
    this.emit(actions.state(STAND_BY))
  }

  gameInfo(gameInfo) {
    this.emit(actions.state(PLAY))
    this.emit(actions.gameInfo(gameInfo))
  }

  state(state) {
    this.emit(actions.gameState(state))
  }

  leave() {
    this.emit(actions.state(DEFAULT))
    this.emit(actions.log('you-leave'))
  }

  opponentLeave() {
    this.emit(actions.state(DEFAULT))
    this.emit(actions.log('opponent-leave'))
  }

  yourStep() {
    this.emit(actions.log('your-step'))
  }

  opponentStep() {
    this.emit(actions.log('opponent-step'))
  }

  win() {
    this.emit(actions.state(DEFAULT))
    this.emit(actions.log('you-win'))
  }

  lose() {
    this.emit(actions.state(DEFAULT))
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
