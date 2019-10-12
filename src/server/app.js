const uuid = require('uuid')
const express = require('express')
const socket = require('socket.io')
const mongodb = require('mongodb')

const SocketEventHandler = require('./event-handlers/socket-event')
const createManagers = require('./managers')
const Player = require('./model/player')
const SocketNotifier = require('./notifiers/socket')
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
  app.use('/index.html', (req, res) => res.redirect('/'))
  app.use(express.static('static'))
  app.use('*', (req, res) => res.redirect('/'))

  const notifiers = {}
  const managers = createManagers(store, notifiers)

  io.on('connection', async (socket) => {
    const sessionID = uuid()
    notifiers[sessionID] = new SocketNotifier(socket)
    const player = new Player(sessionID, store, managers)
    const handler = new SocketEventHandler(player)
    socket.on('disconnect', (socket) => {
      handler.onDisconnect()
      delete notifiers[sessionID]
    })
    socket.on('action', (action) => handler.onAction(action))
  })
})()
