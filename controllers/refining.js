const refiningRouter = require('express').Router()

const refiningTable = require('../utils/refining.json')

refiningRouter.get('/', (req, res) => {
  res.status(200).json(refiningTable)
})

module.exports = refiningRouter