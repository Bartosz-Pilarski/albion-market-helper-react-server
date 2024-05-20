const lastUpdateRouter = require('express').Router()

const Resource = require('../models/resource.js')

lastUpdateRouter.get('/', async (req, res) => {
  const dummyResourceTimestamp = await Resource.findOne({})
  const updateDate = new Date(dummyResourceTimestamp.updatedAt)
  const epochDate = Date.parse(updateDate)
  let timeDifference = Math.floor(Date.now() - updateDate)/1000
  
  const secondsDifference = Math.floor(timeDifference % 60)
  timeDifference = Math.floor(timeDifference / 60)
  const minutesDifference = timeDifference % 60
  timeDifference = Math.floor(timeDifference / 60)
  const hoursDifference = timeDifference%24
  timeDifference = Math.floor(timeDifference / 24)

  res.status(200).json({ lastUpdate: updateDate, epoch: epochDate, humanReadable: `${hoursDifference}h ${minutesDifference}m ${secondsDifference}s` })
})

module.exports = lastUpdateRouter