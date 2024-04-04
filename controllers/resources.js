const resourcesRouter = require('express').Router()

const Resource = require('../models/resource.js')

resourcesRouter.get('/:type/:tier', async (req, res) => {
  const requestedResource = await Resource.findOne({ tier: req.params.tier, type: req.params.type.toUpperCase() })

  if(requestedResource) return res.status(200).json(requestedResource)
  res.status(404).json({ error: 'resource not found' })
})

resourcesRouter.get('/:type', async (req, res) => {
  const requestedResources = await Resource.find({ type: req.params.type.toUpperCase() })

  if(requestedResources[0]) return res.status(200).json(requestedResources)
  res.status(404).json({ error: 'resources not found' })
})

resourcesRouter.get('/', async (req, res) => {
  const requestedResources = await Resource.find({})

  res.status(200).json(requestedResources)
})

module.exports = resourcesRouter