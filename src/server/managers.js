const Manager = require('./manager')
const Game = require('./model/game')
const Session = require('./model/session')

function createManagers(store, notifiers) {
   const sessionManager = new Manager(async (id, remove) => {
    const notifier = notifiers[id]
    if (!notifier) {
      return
    }
    const session = await store.getSession(id)
    if (!session) return
    const { username/* , status, meta */ } = session
    const game = await gameManager.get(session.gameID)
    return new Session(
      id, username, /* status, meta,  */game, store, notifier, remove)
  })

  const gameManager = new Manager(async (id, remove) => {
    const game = await store.getGame(id)
    if (!game) return
    const { players, state } = game
    const sessions = {}
    for (let id of game.players) {
      const session = await sessionManager.get(id)
      if (!session) {
        return
      }
      sessions[id] = session
    }
    return new Game(id, players, state, store, sessions, remove)
  })

  return {
    session: sessionManager,
    game: gameManager
  }
}

module.exports = createManagers
