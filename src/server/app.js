const uuid = require('uuid')
const express = require('express')
const socket = require('socket.io')
const mongodb = require('mongodb')

const SocketEventHandler = require('./event-handlers/socket-event')
const createManagers = require('./managers')
const Player = require('./model/player')
const SocketNotifier = require('./notifiers/socket')
const Store = require('./store')
const ssr = require('../views/ssr')
const template = require('../views/template')

const PORT = process.env.PORT || 8080
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/default'

;(async function() {
  const client = await mongodb.MongoClient.connect(
    MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )

  const db = client.db('')
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
  app.use(/^\/$/, (req, res) => {
    const { state, content, styleTags } = ssr()
    res.send(template(state, content, styleTags))
  })
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
