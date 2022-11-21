const mongoose = require('mongoose')
const rfcSchema = mongoose.Schema(
  {
    rfcId: {
      type: String,
      required: true
    },
    section: {
      type: String,
      required: true,
      unique: true
    },
    translateFrom: {
      type: String,
      required: true,
      default: 'azure'
    },
    translationText: {
      type: String,
      required: false,
      default: ''
    },
    paragraph: {
      type: String,
      required: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

const Rfc = mongoose.model('Rfc', rfcSchema)
module.exports = Rfc
