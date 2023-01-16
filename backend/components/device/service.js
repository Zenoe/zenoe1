
const Device = require('./model.js')

const { logger } = require('init')

const getDevices = async (deviceId) => {
  logger.debug('services:getDevices')
  let deviceContent
  if (deviceId) {
    deviceContent = await Device.find(
      { _id: deviceId }
      // { name: 1, ipaddr: 1, user: 1, port: 1, os: 1, location: 1, desc: 1 }
      // { createdAt: 0, updatedAt: 0 }
    )
  } else {
    deviceContent = await Device.find({}, { createdAt: 0, updatedAt: 0 })
  }
  return deviceContent
}

const addDevice = async (deviceObj) => {
  logger.debug('services:addDevice')
  return await Device.create(deviceObj)
}
module.exports = { getDevices, addDevice }
