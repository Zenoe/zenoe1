const mongoose = require('mongoose')
const transRestorePtSc = mongoose.Schema(
  {
    rfcId: {
      type: String,
      required: true
      // unique: true   // this attr triggers index being created
    },
    sectionName: {
      type: String,
      required: true,
      default: ''
    },
    contentId: {
      type: String,
      required: true,
      default: '-1'
    },
    finishTrans: {
      type: Boolean,
      required: true,
      default: true
    }

  },
  {
    timestamps: true,
    versionKey: false
  }
)

const TransRestorePt = mongoose.model('transRestorePt', transRestorePtSc)
module.exports = TransRestorePt
