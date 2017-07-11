/* eslint-disable no-console */

const http = require('http')
const express = require('express')
const compression = require('compression')
const socket = require('socket.io')

const app = express()
const server = http.Server(app)
const io = socket(server)

server.use(compression())

const PORT = process.env.PORT || 8080

server.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`),
)
