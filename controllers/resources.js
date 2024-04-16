const resourcesRouter = require('express').Router()

const Resource = require('../models/resource.js')

const types = {
  METAL: ["ORE", "METALBAR"]
}

resourcesRouter.get('/', async (req, res) => {
  const requestedResources = await Resource.find({})

  res.status(200).json(requestedResources)
})

resourcesRouter.get('/:type', async (req, res) => {
  const requestedType = req.params.type.toUpperCase()
  if(!Object.hasOwn(types, requestedType)) return res.status(400).json({ error: 'incorrect parameters' })

  const requestedResourcesRaw = await Resource.find({ type: types[requestedType][0] })
  const requestedResourcesRefined = await Resource.find({ type: types[requestedType][1] })

  const requestedResources = {
    raw: requestedResourcesRaw,
    refined: requestedResourcesRefined
  }

  if(requestedResources.raw[0] && requestedResources.refined[0]) return res.status(200).json(requestedResources)
  res.status(404).json({ error: 'resources not found' })
})

resourcesRouter.get('/:type/:tier', async (req, res) => {
  const requestedType = req.params.type.toUpperCase()
  const requestedTier = parseInt(req.params.tier)
  if(!Object.hasOwn(types, requestedType) || !(1 < requestedTier*1 < 9)) return res.status(400).json({ error: 'incorrect parameters' })

  const requestedResourceRaw = await Resource.findOne({ tier: requestedTier, type: types[requestedType][0] })
  const requestedResourceRefined = await Resource.findOne({ tier: requestedTier, type: types[requestedType][1] })

  const requestedResource = {
    raw: requestedResourceRaw,
    refined: requestedResourceRefined
  }

  if(requestedResource) return res.status(200).json(requestedResource)
  res.status(404).json({ error: 'resource not found' })
})

module.exports = resourcesRouter