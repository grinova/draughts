const uuid = require('uuid')
const express = require('express')
const socket = require('socket.io')
const mongodb = require('mongodb')

const Manager = require('./manager')
const Game = require('./model/game')
const Session = require('./model/session')
const SocketNotifier = require('./notifiers/socket')
const SocketEventHandler = require('./event-handlers/socket-event')
const Store = require('./store')

const PORT = process.env.PORT || 8080

;(async function() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://localhost:27017',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )

  const db = client.db('checkers')
  const store = new Store(db)
  {
    await db.collection('sessions').deleteMany({})
    await db.collection('games').deleteMany({})
  }

  const app = express()
  const server = require('http').Server(app)
  const io = socket(server)

  server.listen(PORT)
  app.use(express.static('static'))

  const notifiers = {}

  const sessionManager = new Manager(async (id) => {
    const notifier = notifiers[id]
    if (!notifier) {
      return
    }
    const session = await store.getSession(id)
    if (!session) return
    // const { username, status, meta } = session
    const game = null
    return new Session(id, /* username, status, meta,  */game, store, notifier)
  })

  const gameManager = new Manager(async (id) => {
    const game = await store.getGame(id)
    if (!game) return
    const sessions = {}
    for (let id of game.players) {
      const session = await sessionManager.get(id)
      if (!session) {
        return
      }
      sessions[id] = session
    }
    return new Game(id, game.state, store, sessions)
  })

  io.on('connection', (socket) => {
    const sessionID = uuid()
    store.createSession(sessionID)
    notifiers[sessionID] = new SocketNotifier(socket)
    const socketEventHandler =
      new SocketEventHandler(sessionID, sessionManager, gameManager)
    socket.on('disconnect', (socket) => {
      db.collection('sessions').removeOne({ id: sessionID })
      db.collection('games').removeMany({})
    })
    socket.on('action', socketEventHandler.handle)
  })
})()
