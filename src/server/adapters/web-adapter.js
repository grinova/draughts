const actions = require('../../common/actions')

function createWebAdapter(socket) {
  function getType() {
    return 'web'
  }

  function emit(payload) {
    socket.emit('action', payload)
  }

  function init(id) {
    emit(actions.sessionId(id))
  }

  function connect() {
    emit(actions.status('stand-by'))
  }

  function play(state) {
    emit(actions.status('active'))
    emit(actions.gameState(state))
  }

  function move(state) {
    emit(actions.gameState(state))
  }

  function error(message) {
    emit(actions.error(message))
  }

  return {
    getType,
    init,
    connect,
    play,
    move,
    error
  }
}

module.exports = createWebAdapter
