const ResourceTier = require('../models/resourceTier.js')
const Resource = require('../models/resource.js')

const resourceTypes = {
  METAL: {
    RAW: 'ORE',
    REFINED: 'METALBAR'
  },
  WOOD: {
    RAW: 'WOOD',
    REFINED: 'PLANKS'
  },
  FIBER: {
    RAW: 'FIBER',
    REFINED: 'CLOTH'
  },
  STONE: {
    RAW: 'ROCK',
    REFINED: 'STONEBLOCK'
  },
  HIDE: {
    RAW: 'HIDE',
    REFINED: 'LEATHER'
  }
}

const createResouceTiers = async (type) => {
  console.log('Creating: ', type)
  const savedResources = await Resource.find().or([{ type: resourceTypes[type].RAW }, { type: resourceTypes[type].REFINED }])
  //console.log(savedResources)

  const tiers = [2,3,4,5,6,7,8]
  const operations = tiers.map(async (tier) => {
    const resourceTier = new ResourceTier({
      type: type,
      tier: tier,
      raw: savedResources.find((resource) => resource.tier === tier && resource.type.toUpperCase() === resourceTypes[type].RAW),
      refined: savedResources.find((resource) => resource.tier === tier && resource.type.toUpperCase() === resourceTypes[type].REFINED)
    })

    await resourceTier.save()
  })

  await Promise.all(operations)
}

module.exports = {
  createResouceTiers,
  resourceTypes
}