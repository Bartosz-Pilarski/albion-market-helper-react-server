const resourcesRouter = require('express').Router()

//Crashes on fetching data if not imported
const Resource = require('../models/resource.js')
const ResourceTier = require('../models/resourceTier.js')

const types = {
  METAL: {RAW: "ORE", REFINED: "METALBAR"}
}

resourcesRouter.get('/', async (req, res) => {
  const requestedResources = await ResourceTier.find({}).populate('raw').populate('refined')

  if(requestedResources) return res.status(200).json(requestedResources)
  res.status(404).json({ error: 'resources not found'})
})

resourcesRouter.get('/:type', async (req, res) => {
  const requestedType = req.params.type.toUpperCase()
  if(!Object.hasOwn(types, requestedType)) return res.status(400).json({ error: 'incorrect parameters' })

  const requestedResources = await ResourceTier.find({ type: requestedType }).populate('raw').populate('refined')

  if(requestedResources) return res.status(200).json(requestedResources)
  res.status(404).json({ error: 'resources not found' })
})

resourcesRouter.get('/:type/:tier', async (req, res) => {
  const requestedType = req.params.type.toUpperCase()
  const requestedTier = parseInt(req.params.tier)

  if(!Object.hasOwn(types, requestedType) || (1 > requestedTier) || (requestedTier > 8)) return res.status(400).json({ error: 'incorrect parameters' })

  const requestedResources = await ResourceTier.findOne({ tier: requestedTier, type: requestedType }).populate('raw').populate('refined')

  if(requestedResources) return res.status(200).json(requestedResources)
  res.status(404).json({ error: 'resource not found' })
})

module.exports = resourcesRouter