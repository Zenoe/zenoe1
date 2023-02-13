const mongoose = require('mongoose')
const updateDeviceStateSchema = mongoose.Schema(
  {
    deviceIp: {
      type: String,
      required: true,
      default: ''
    },
    updatingDeviceResult: {
      type: String,
      required: true,
      default: ''
    },
    smokeDate: {
      type: String,
      required: true,
      default: ''
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
)

const UpdateDeviceState = mongoose.model('UpdateDeviceState', updateDeviceStateSchema)
module.exports = UpdateDeviceState
