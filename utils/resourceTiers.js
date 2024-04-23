const ResourceTier = require('../models/resourceTier.js')
const Resource = require('../models/resource.js')

const resourceTypes = {
  METAL: {
    RAW: 'ORE',
    REFINED: 'METALBAR'
  }
}

const createResouceTiers = async (type) => {
  const savedResources = await Resource.find().or([{ type: resourceTypes[type].RAW }, { type: resourceTypes[type].REFINED }])
  console.log(savedResources)
  for(tier = 2; tier < 9; tier++) {
    console.log(savedResources.find((resource) => resource.tier === tier && resource.type.toUpperCase() === resourceTypes[type].REFINED))
    console.log(savedResources.find((resource) => resource.tier === tier && resource.type.toUpperCase() === resourceTypes[type].RAW))
    const resourceTier = new ResourceTier({
      type: type,
      tier: tier,
      raw: savedResources.find((resource) => resource.tier === tier && resource.type.toUpperCase() === resourceTypes[type].RAW),
      refined: savedResources.find((resource) => resource.tier === tier && resource.type.toUpperCase() === resourceTypes[type].REFINED)
    })

    await resourceTier.save()
  }
}

module.exports = {
  createResouceTiers,
  resourceTypes
}