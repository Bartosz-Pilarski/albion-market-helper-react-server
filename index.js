const app = require('./app.js')
const { fetchAll } = require('./services/externalDataService.js')
const { updateCheck, updatePrices } = require('./services/internalDataService.js')
const { PORT, UPDATE_INTERVAL } = require('./utils/config.js')

app.listen(PORT, async () => {
  console.log('Ahoy!')
  const updateNeededTest = await updateCheck()
  const updateNeeded = (Date.now() - updateNeededTest.updatedAt) > UPDATE_INTERVAL
  if(updateNeeded) { 
    console.log('Resource data out of date, updating...')
    const freshPrices = await fetchAll()
    updatePrices(Object.values(freshPrices))
    console.log('Done.')
  }
})