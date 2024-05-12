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
T2_METALBAR,T3_METALBAR,T4_METALBAR,T5_METALBAR,T6_METALBAR,T7_METALBAR,T8_METALBAR,
T2_WOOD,T3_WOOD,T4_WOOD,T5_WOOD,T6_WOOD,T7_WOOD,T8_WOOD,
T2_PLANKS,T3_PLANKS,T4_PLANKS,T5_PLANKS,T6_PLANKS,T7_PLANKS,T8_PLANKS,
T2_FIBER,T3_FIBER,T4_FIBER,T5_FIBER,T6_FIBER,T7_FIBER,T8_FIBER,
T2_CLOTH,T3_CLOTH,T4_CLOTH,T5_CLOTH,T6_CLOTH,T7_CLOTH,T8_CLOTH,
T2_HIDE,T3_HIDE,T4_HIDE,T5_HIDE,T6_HIDE,T7_HIDE,T8_HIDE,
T2_LEATHER,T3_LEATHER,T4_LEATHER,T5_LEATHER,T6_LEATHER,T7_LEATHER,T8_LEATHER,
T2_ROCK,T3_ROCK,T4_ROCK,T5_ROCK,T6_ROCK,T7_ROCK,T8_ROCK,
T2_STONEBLOCK,T3_STONEBLOCK,T4_STONEBLOCK,T5_STONEBLOCK,T6_STONEBLOCK,T7_STONEBLOCK,T8_STONEBLOCK
?locations=Caerleon,Bridgewatch,Martlock,Lymhurst,Thetford,FortSterling`
  )
  return Object.groupBy(prices.data, ({ item_id }) => item_id)
}

const saveItemPrices = async (prices) => {
  const itemName = prices[0].item_id

  //console.log('Type:', itemName.substring(3), 'Tier:', itemName.charAt(1), 'Name:', locale[itemName].title)

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