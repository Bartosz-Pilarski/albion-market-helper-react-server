const axios = require('axios')

const Resource = require('../models/resource')

const baseUrl = 'https://west.albion-online-data.com/api/v2/stats'

const fetchPricesByType = async (type) => {
  const prices = await axios.get(`${baseUrl}/prices/T1_${type},T2_${type},T3_${type},T4_${type},T5_${type},T6_${type},T7_${type},T8_${type}?locations=Caerleon,Bridgewatch,Martlock,Lymhurst,Thetford,FortSterling`)
  return Object.groupBy(prices.data, ({ item_id }) => item_id)
}

const saveItemPrices = async (prices) => {
  const itemName = prices[0].item_id

  console.log('Type:', itemName.substring(3), 'Tier:', itemName.charAt(1))

  const pricesSeparated = prices.map(element => {
    return {
      location: element.city,
      sellPrice: element.sell_price_min,
      buyPrice: element.buy_price_max
    }
  })

  const resource = new Resource({
    name: itemName,
    tier: itemName.charAt(1),
    type: itemName.substring(3),
    prices: pricesSeparated
  })

  await resource.save()
}

module.exports = {
  fetchPricesByType,
  saveItemPrices
}