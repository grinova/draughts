const express = require('express')
const socket = require('socket.io')

const PORT = process.env.PORT || 8080
const app = express()
const server = require('http').Server(app)
const io = socket(server)

server.listen(PORT)
app.use(express.static('static'))

io.on('connection', (socket) => {
  socket.emit('my-server-event', { text: 'Event from server' })
  socket.on('my-client-event', (data) => {
    console.log(data)
  })
})
