const lastUpdateRouter = require('express').Router()

const Resource = require('../models/resource.js')

lastUpdateRouter.get('/', async (req, res) => {
  const dummyResourceTimestamp = await Resource.findOne({})
  const updateDate = new Date(dummyResourceTimestamp.updatedAt)
  const epochDate = Date.parse(updateDate)

  const timeDifference = Math.floor((Date.now() - updateDate)/1000)
  
  const secondsPassed = timeDifference%60
  const minutesPassed = Math.floor((timeDifference/60)%60)
  const hoursPassed = Math.floor((timeDifference/3600)%24)

  res.status(200).json({ lastUpdate: updateDate.toUTCString(), epoch: epochDate, humanReadable: `${hoursPassed}h ${minutesPassed}m ${secondsPassed}s` })
})

module.exports = lastUpdateRouter