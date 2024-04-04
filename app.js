const express = require('express')

const resourcesRouter = require('./controllers/resources.js')

const mongoose = require('mongoose')
const { MONGO_URL } = require('./utils/config.js')

mongoose.set('strictQuery', false)
mongoose
  .connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))

const app = express()

app.use('/api/resources', resourcesRouter)
app.use('/api', express.static('public/api.html'))

// Temporarily default redirect, TODO: Change to homepage
app.get('*', (req, res) => {
  res.redirect('/api')
})

module.exports = app