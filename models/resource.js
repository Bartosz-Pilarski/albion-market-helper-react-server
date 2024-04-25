const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  tier: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  prices: [
    {
      location: {
        type: String,
        required: true
      },
      sellPrice: {
        type: Number,
        required: true
      },
      buyPrice: {
        type: Number,
        required: true
      }
    }
  ]
},
{
  timestamps: true
})

resourceSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.createdAt
  }
})

const Resource = mongoose.model('Resource', resourceSchema)

module.exports = Resource