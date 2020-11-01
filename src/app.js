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

io.on('connection', () => {
    console.log('New socket connection')
})

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
