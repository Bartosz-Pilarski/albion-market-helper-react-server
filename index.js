const app = require('./app.js')
const { PORT } = require('./utils/config.js')

app.listen(PORT, async () => {
  console.log('Ahoy!')
})