const Resource = require('../models/resource')
const { fetchAll } = require('./externalDataService')
const locale = require('../utils/items.json')

const updateCheck = async () => {
  const tester = await Resource.findOne({})
  return tester
}

const updatePrices = async (freshPrices) => {
  const operations = freshPrices.map(async (priceSet) => {
    const itemName = priceSet[0].item_id
    const oldResource = await Resource.findOne({ name: itemName})

    const pricesSeparated = priceSet.map(element => {
      return {
        location: element.city,
        sellPrice: element.sell_price_min > 0 ? element.sell_price_min : oldResource.prices.find((price) => price.location === element.city).sellPrice,
        buyPrice: element.buy_price_max > 0 ? element.buy_price_max : oldResource.prices.find((price) => price.location === element.city).buyPrice
      }
    })
  
    const update = ({
      prices: pricesSeparated
    })

    await Resource.findOneAndUpdate({ name: itemName }, update)
  })

  await Promise.all(operations)
}

module.exports = {
  updateCheck,
  updatePrices
}