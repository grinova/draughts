const immutable = require('immutable')
const express = require('express')
const socket = require('socket.io')
const mongodb = require('mongodb')
const uuid = require('uuid')

const createDbAccessor = require('./db')
const createWebAdapter = require('./adapters/web-adapter')
const createActionHandler = require('./action-handler')

const PORT = process.env.PORT || 8080

;(async function() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://localhost:27017',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )

  const db = client.db('checkers')
  const dbAccessor = createDbAccessor(db, uuid)

  {
    const sessions = db.collection('sessions')
    const games = db.collection('games')
    await sessions.deleteMany({})
    await games.deleteMany({})
  }

  const app = express()
  const server = require('http').Server(app)
  const io = socket(server)

  server.listen(PORT)
  app.use(express.static('static'))

  let adapters = new immutable.Map()

  io.on('connection', (socket) => {
    const id = uuid()
    const adapter = createWebAdapter(socket)
    adapter.init(id)
    adapters = adapters.set(id, adapter)
    const getAdapter = opponentId => adapters.get(opponentId)
    socket.on('disconnect', (socket) => {
      adapters = adapters.remove(id)
    })
    socket.on('action', createActionHandler(id, dbAccessor, adapter, getAdapter))
  })
})()
