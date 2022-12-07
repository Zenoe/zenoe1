const mongoose = require('mongoose')
const rfcSchema = mongoose.Schema(
  {
    rfcId: {
      type: String,
      required: true,
      unique: true
    },
    sectionName: {
      type: String,
      required: true,
      unique: true
    },
    translateFrom: {
      type: String,
      required: true,
      default: 'azure'
    },
    content: [
      {
        type: String
      }
    ],
    enContent: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const Rfc = mongoose.model('Rfc', rfcSchema)
module.exports = Rfc
