const express = require('express')
const path = require('path')

const resourcesRouter = require('./controllers/resources.js')
const refiningRouter = require('./controllers/refining.js')

const mongoose = require('mongoose')
const { MONGO_URL } = require('./utils/config.js')
const lastUpdateRouter = require('./controllers/lastUpdate.js')

mongoose.set('strictQuery', false)
mongoose
  .connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB.'))

const app = express()

// app.use((req, res, next) => {
//   console.log(req.path)
//   next()
// })

// Explicit handling for trailing slash
const apiPagePath = path.join(__dirname, 'public', 'api.html')
app.get('/api/', (req, res) => {
  res.sendFile(apiPagePath)
})
app.get('/api', (req, res) => {
  res.sendFile(apiPagePath)
})

app.use('/api/resources', resourcesRouter)
app.use('/api/refining', refiningRouter)
app.use('/api/lastupdate', lastUpdateRouter)

app.use(express.static('public'))

// Temporarily default redirect, TODO: Change to homepage
app.get('*', (req, res) => {
  res.redirect('http://localhost:5173')
})

module.exports = app