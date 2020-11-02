const http = require('http')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const socketio = require('socket.io')

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
    console.log('New user connected')
    socket.emit('greetings', 'Welcome Hooman🎉')

    socket.on('sendMessage', (msg) => {
        io.emit('userMessage', msg)
    })

    socket.broadcast.emit('broadcastMessage', 'A user has joined')

    socket.on('sendLocation', (coords) => {
        io.emit('sendLocation', coords)
    })
    socket.on('disconnect', () => {
        io.emit('broadcastMessage', 'User left')
    })
})

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
