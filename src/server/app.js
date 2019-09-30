const express = require('express')
const socket = require('socket.io')
const mongodb = require('mongodb')
const uuid = require('uuid')

const actions = require('../common/actions')

const PORT = process.env.PORT || 8080

mongodb.MongoClient.connect(
  'mongodb://localhost:27017',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    const db = client.db('checkers')
    const sessions = db.collection('sessions')
    const games = db.collection('games')

    const app = express()
    const server = require('http').Server(app)
    const io = socket(server)

    server.listen(PORT)
    app.use(express.static('static'))

    io.on('connection', (socket) => {
      const id = uuid()
      socket.on('disconnect', (socket) => {
        sessions.remove({ id })
      })
      socket.on('action', (action) => {
        console.log(action)
        if (action.type === actions.PLAY_GAME) {
          const { username } = action
          socket.emit('action', actions.sessionId(id))
          sessions.findOneAndUpdate(
            { status: 'stand-by' },
            { '$set': { status: 'active' } },
            (err, res) => {
              const opponent = res.value
              const status = opponent == null ? 'stand-by' : 'active'
              const session = { username, id, status }
              sessions.insertOne(session, (error, res) => {
                socket.emit('action', actions.status(status))
                if (status == 'active') {
                  games.insertOne({ players: [session.id, opponent.id] }, (err, res) => {
                    console.log(`Start game between ${session.username} and ${opponent.username} players`)
                  })
                }
              })
            }
          )
        }
      })
    })
  }
)
