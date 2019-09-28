const express = require('express')
const socket = require('socket.io')

const actions = require('../common/actions')

const PORT = process.env.PORT || 8080
const app = express()
const server = require('http').Server(app)
const io = socket(server)

server.listen(PORT)
app.use(express.static('static'))

io.on('connection', (socket) => {
  socket.on('action', (action) => {
    console.log(action)
    if (action.type === actions.PLAY_GAME) {
      socket.emit('action', actions.opponentName('some-opponent-name'));
    }
  })
})
