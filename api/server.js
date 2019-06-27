const express = require('express');
const cors = require('cors')

const logger = require('../api/functions/logger.js')
const authRouter = require('../api/routes/authRoute.js')
const restrictedRouter = require('../api/routes/restrictedRoute.js')

const server = express();

server.use(cors())
server.use(logger)
server.use(express.json())

server.use('/api/auth', authRouter)
server.use('/api', restrictedRouter)

server.get('/', (req, res) => {
    res.status(200).json({ message: `The server is on and waiting for requests...`})
})

module.exports = server;