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
  async function step(id, chain) {
    console.log(chain)
  }
  return {
    play,
    step
  }
}

module.exports = createDbAccessor
