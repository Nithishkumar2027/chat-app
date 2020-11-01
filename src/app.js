const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
