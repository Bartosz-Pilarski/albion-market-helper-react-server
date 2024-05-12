/*
  This script completely resets the prices database.
  Use it to initialize the app, or to get a clean version of the data in case something's very wrong with it.
  Prices self-update, based on when they were last updated, as needed otherwise.

  TODO:
  - Extend initializing to cover all types instead of just ORE
*/

const Resource = require('./models/resource.js')
const ResourceTier = require('./models/resourceTier.js')
const resourceTiersService = require('./utils/resourceTiers.js')
const externalDataService = require('./services/externalDataService.js')

const mongoose = require('mongoose')
const { MONGO_URL } = require('./utils/config.js')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question('Are you sure you want to re-initialize the prices database? (y)', async (res) => {
  if(res === '' || res.toLowerCase().charAt(0)=== 'y') {
    console.log('Connecting to database...')
    mongoose.set('strictQuery', false)
    mongoose.connection.on('connected', () => console.log('Connected to MongoDB.'))
    await mongoose.connect(MONGO_URL)

    console.log('Wiping database...')
    await Resource.deleteMany({})
    await ResourceTier.deleteMany({})

    console.log('Fetching prices...')
    const prices = await externalDataService.fetchAll()

    console.log('Saving prices to database...')
    let operations = Object.keys(prices).map((item) => externalDataService.saveItemPrices(prices[item]))
    await Promise.all(operations)

    console.log('Creating ResourceTiers...')
    operations = Object.keys(resourceTiersService.resourceTypes).map((type) => resourceTiersService.createResouceTiers(type))
    await Promise.all(operations)

    console.log('Done.')
    mongoose.disconnect()
    return readline.close()
  }
  console.log('Cancelling.')
  readline.close()
})