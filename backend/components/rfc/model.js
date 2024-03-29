const mongoose = require('mongoose')
const rfcSchema = mongoose.Schema(
  {
    rfcId: {
      type: String,
      required: true
      // unique: true   // this attr triggers index being created
    },
    sectionName: {
      type: String,
      required: true
      // unique: true
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
    cnContent: [
      {
        type: String
      }
    ],
    spec: [
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
