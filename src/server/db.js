const makeMove = require('./game/make-move')

function initiamGameState() {
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

function toss(firstPlayerId, secondPlayerId) {
  return Math.random() > 0.5 ?
    [firstPlayerId, secondPlayerId] : [firstPlayerId, secondPlayerId]
}

function createDbAccessor(db, uuid) {
  const sessions = db.collection('sessions')
  const games = db.collection('games')
  async function play(id, username, client) {
    const gameId = uuid()
    let res = await sessions.findOneAndUpdate(
      { status: 'stand-by' },
      { '$set': { status: 'active', gameId } }
    )
    const opponent = res.value
    if (opponent) {
      const user = { username, id, status: 'active', client, gameId }
      await sessions.insertOne(user)
      const game = {
        id: gameId,
        players: toss(user.id, opponent.id),
        state: initiamGameState()
      }
      await games.insertOne(game)
      return { game, user, opponent }
    } else {
      const user = { username, id, status: 'stand-by', client }
      await sessions.insertOne(user)
      return { user }
    }
  }
  async function move(id, move) {
    const session = await sessions.findOne({ id })
    const { gameId } = session
    const game = await games.findOne({ id: gameId })
    const { error, field } = makeMove(move, game.state.field)
    if (error) {
      return { error }
    }
    game.state.field = field
    await games.findOneAndUpdate({ id: gameId }, { '$set': { state: game.state }})
    return { state: game.state }
  }
  return {
    play,
    move
  }
}

module.exports = createDbAccessor
