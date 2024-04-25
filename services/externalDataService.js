const axios = require('axios')

const Resource = require('../models/resource')
const locale = require('../utils/items.json')

const baseUrl = 'https://west.albion-online-data.com/api/v2/stats'


const fetchPricesByType = async (type) => {
  const prices = await axios.get(`${baseUrl}/prices/T1_${type},T2_${type},T3_${type},T4_${type},T5_${type},T6_${type},T7_${type},T8_${type}?locations=Caerleon,Bridgewatch,Martlock,Lymhurst,Thetford,FortSterling`)
  return Object.groupBy(prices.data, ({ item_id }) => item_id)
}
const fetchAll = async () => {
  const prices = await axios.get(
`${baseUrl}/prices/
T2_ORE,T3_ORE,T4_ORE,T5_ORE,T6_ORE,T7_ORE,T8_ORE,
T2_METALBAR,T3_METALBAR,T4_METALBAR,T5_METALBAR,T6_METALBAR,T7_METALBAR,T8_METALBAR
?locations=Caerleon,Bridgewatch,Martlock,Lymhurst,Thetford,FortSterling`
  )
  return Object.groupBy(prices.data, ({ item_id }) => item_id)
}

const saveItemPrices = async (prices) => {
  const itemName = prices[0].item_id

  console.log('Type:', itemName.substring(3), 'Tier:', itemName.charAt(1), 'Name:', locale[itemName].title)

  const pricesSeparated = prices.map(element => {
    return {
      location: element.city,
      sellPrice: element.sell_price_min,
      buyPrice: element.buy_price_max
    }
  })

  const resource = new Resource({
    name: itemName,
    title: locale[itemName].title,
    subtitle: locale[itemName].subtitle,
    tier: itemName.charAt(1),
    type: itemName.substring(3),
    prices: pricesSeparated
  })

  await resource.save()
}

module.exports = {
  fetchPricesByType,
  fetchAll,
  saveItemPrices
}