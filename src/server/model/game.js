const endGame = require('../game/end-game')
const makeMove = require('../game/make-move')
const { WHITE_MAN, BLACK_MAN, nextPlayerOrder } = require('../../common/game/common')

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
    const playersNames = players.map(id => this.sessions[id].getUserName())
    this.sessions[players[activePlayer]].onGameInfo({ side: WHITE_MAN, players: playersNames })
    this.sessions[players[nextPlayerOrder(activePlayer)]].onGameInfo({ side: BLACK_MAN, players: playersNames })
  }

  async onMove(sessionID, move) {
    const { players } = this
    const { activePlayer } = this.state
    if (sessionID != players[activePlayer]) {
      return 'Now the opponent\'s move'
    }
    const { error, state } = makeMove(move, this.state)
    if (error) {
      return error
    }
    this.state = state
    await this.store.updateGameState(this.id, this.state)
    this.notify()
    const { isEnd, winner } = endGame(this.state.activePlayer, this.state.field)
    if (isEnd) {
      this.close()
      const winnerID = players[winner]
      const loserID = players[nextPlayerOrder(winner)]
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
    sessions[players[nextPlayerOrder(activePlayer)]].onOpponentStep()
  }
}

module.exports = Game
