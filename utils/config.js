require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  //UPDATE_INTERVAL: process.env.UPDATE_INTERVAL
  UPDATE_INTERVAL: 60000
}