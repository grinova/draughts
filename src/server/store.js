class Store {
  static initialGameState() {
    return {
      score: [0, 0],
      ativePlayer: 0,
      field: [
        [' ', 'b', ' ', 'b', ' ', 'b', ' ', 'b'],
        ['b', ' ', 'b', ' ', 'b', ' ', 'b', ' '],
        [' ', 'b', ' ', 'b', ' ', 'b', ' ', 'b'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['w', ' ', 'w', ' ', 'w', ' ', 'w', ' '],
        [' ', 'w', ' ', 'w', ' ', 'w', ' ', 'w'],
        ['w', ' ', 'w', ' ', 'w', ' ', 'w', ' '],
      ]
    }
  }

  constructor(db) {
    this.db = db
    this.sessions = db.collection('sessions')
    this.games = db.collection('games')
  }

  findStandbySessionForPlayer(id) {
    return this.sessions.findOne({ id: { '$ne': id }, status: { '$eq': 'stand-by' }})
  }

  createSession(id) {
    return this.sessions.insertOne({ id })
  }

  removeSession(id) {
    return this.sessions.removeOne({ id })
  }

  updateSession(id, username, status, gameID, meta) {
    const updateSession = { '$set': { username, status, meta, gameID } }
    return this.sessions.findOneAndUpdate({ id }, updateSession)
  }

  updateSessionStatus(id, status) {
    return this.sessions.updateOne({ id }, { '$set': { status }})
  }

  getSession(id) {
    return this.sessions.findOne({ id })
  }

  joinGame(id, gameID) {
    return this.sessions.updateOne({ id }, { '$set': { gameID }})
  }

  exitGame(id) {
    return this.sessions.updateOne({ id }, { '$unset': { status: 1, gameID: 1 }})
  }

  createGame(id, firstPlayerID, secondPlayerID) {
    const game = {
      id,
      players: [firstPlayerID, secondPlayerID],
      state: Store.initialGameState()
    }
    return this.games.insertOne(game)
  }

  removeGame(id) {
    this.games.removeOne({ id })
  }

  getGame(id) {
    return this.games.findOne({ id })
  }

  updateGameState(id, state) {
    return this.games.updateOne({ id }, { '$set': { state }})
  }
}

module.exports = Store
