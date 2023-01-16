const asyncHandler = require('express-async-handler')
const Joi = require('joi')
const validateSchema = require('middleware/validate-request')
const deviceService = require('./service')

const getDevices = asyncHandler(async (req, res) => {
  const { deviceId } = req.body
  const deviceContent = await deviceService.getDevices(deviceId)
  res.json(deviceContent)
})

const addDevice = asyncHandler(async (req, res) => {
  const { name, user, password, ipaddr, port, location, os, desc } = req.body
  const device = deviceService.addDevice({
    name, user, password, ipaddr, port, location, os, desc
  })
  if (device) {
    res.status(201).json({
      status: 1
    })
  } else {
    // res.status(400)
    throw new Error('add device failed')
  }
})

module.exports = { getDevices, addDevice }
