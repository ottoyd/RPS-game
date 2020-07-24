const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const PORT = 4000
const server = http.createServer(app)
const io = require('socket.io')(server)

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

let users = []
let msg = []
let room = []

io.on('connection', function(socket) {
  socket.on('user-connect', (data) => {
    users.push(data)
    io.emit('user-connect-list', users)
  })

  socket.on('send-message', (data) => {
    msg.push(data)
    console.log(msg)
    io.emit('all-messages', msg)
  })

  socket.on('create-room', (data) => {
    room.push(data)
    console.log(room)
    io.emit('all-room', room)
  })
})

server.listen(PORT, function() {
  console.log('tis on', PORT)
})