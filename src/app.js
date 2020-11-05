// Packages
const http = require('http')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const socketio = require('socket.io')
const Filter = require('bad-words')

// utils
const { generateMessage, generateLocation } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

io.on('connection', (socket) => {

    socket.on('join', ({ username, room }, callback) => {
        console.log({ username, room })
        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('greetings', generateMessage('Welcome Hooman🎉'))
        socket.broadcast.to(user.room).emit('userMessage', generateMessage(`${user.username} has joined 🎉`))
        callback()
    })

    socket.on('sendMessage', (msg, callback) => {
        filter = new Filter()
        msg = filter.clean(msg)
        io.emit('userMessage', generateMessage(msg))
        callback()
    })


    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocation(coords))
        callback()
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('broadcastMessage', generateMessage(`${user.username} has left`))
        }

    })
})

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
