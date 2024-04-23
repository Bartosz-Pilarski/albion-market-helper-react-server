const mongoose = require('mongoose')

const resourceTierSchema = new mongoose.Schema({
  tier: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  raw: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource'
  },
  refined: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource'
  }
})

resourceTierSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

const ResourceTier = mongoose.model('ResourceTier', resourceTierSchema)

module.exports = ResourceTier