const mongoose = require('mongoose')
const rfcSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: false
    },
    ipaddr: {
      type: String,
      required: true
    },
    port: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: false,
      default: ''
    },
    os: {
      type: String,
      required: false,
      default: ''
    },

    desc: {
      type: String,
      required: false,
      default: ''
    }

  },
  {
    timestamps: false,
    versionKey: false
  }
)

const Device = mongoose.model('Device', rfcSchema)
module.exports = Device
