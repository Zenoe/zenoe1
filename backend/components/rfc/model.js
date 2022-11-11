const mongoose = require('mongoose')
const rfcSchema = mongoose.Schema(
  {
    rfcId: {
      type: String,
      required: true
    },
    sectionTitle: {
      type: String,
      required: true,
      unique: true
    },
    translateFrom: {
      type: String,
      required: true
    },
    cnText: {
      type: String,
      required: false,
      default: ''
    },
    enText: {
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
