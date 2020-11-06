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
    console.log('New Connection')
    socket.on('join', (options, callback) => {
        console.log(options)
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('userMessage', generateMessage('Admin', 'Welcome Hooman🎉'))
        socket.broadcast.to(user.room).emit('userMessage', generateMessage(`${user.username} has joined 🎉`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
        callback()
    })

    socket.on('sendMessage', (msg, callback) => {
        const user = getUser(socket.id)
        filter = new Filter()
        msg = filter.clean(msg)
        io.to(user.room).emit('userMessage', generateMessage(user.username, msg))
        callback()
    })


    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocation(user.username, coords))
        callback()
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('userMessage', generateMessage(`${user.username} has left the chat`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }

    })
})

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
