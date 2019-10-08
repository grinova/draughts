const endGame = require('../game/end-game')
const makeMove = require('../game/make-move')
const { WHITE_MAN, BLACK_MAN } = require('../../common/game/common')

class Game {
  constructor(id, players, state, store, sessions, remove) {
    this.id = id
    this.players = players
    this.state = state
    this.store = store
    this.sessions = sessions
    this.remove = remove
  }

  close() {
    this.store.removeGame(this.id)
    this.remove()
  }

  async onPlay() {
    this.notify()
    const { state, players } = this
    const { activePlayer } = state
    this.sessions[players[activePlayer]].onGameInfo({ side: WHITE_MAN })
    this.sessions[players[(activePlayer + 1) % 2]].onGameInfo({ side: BLACK_MAN })
  }

  async onMove(sessionID, move) {
    const { state, players } = this
    const { activePlayer } = state
    if (sessionID != players[activePlayer]) {
      return 'Now the opponent\'s move'
    }
    const { error, field, canMakeAnotherMove } =
      makeMove(activePlayer, move, state.field)
    if (error) {
      return error
    }
    state.field = field
    if (!canMakeAnotherMove) {
      state.activePlayer = (state.activePlayer + 1) % 2
    }
    await this.store.updateGameState(this.id, state)
    this.notify()
    const { isEnd, winner } = endGame(state.activePlayer, field)
    if (isEnd) {
      this.close()
      const winnerID = players[winner]
      const loserID = players[(winner + 1) % 2]
      this.sessions[winnerID].onWin()
      this.sessions[loserID].onLose()
    }
  }

  async onLeave(sessionID) {
    for (let id in this.sessions) {
      const session = this.sessions[id]
      if (id != sessionID) {
        session.onOpponentLeave()
      }
    }
    this.close()
  }

  notify() {
    const { state, sessions, players } = this
    for (let id in sessions) {
      sessions[id].updateState(state)
    }
    const { activePlayer } = state
    sessions[players[activePlayer]].onYourStep()
    sessions[players[(activePlayer + 1) % 2]].onOpponentStep()
  }
}

module.exports = Game
