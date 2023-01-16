const express = require('express')
const router = express.Router()
const { generateRoutes } = require('utils/nodeUtil')
const { protect } = require('../middleware/authMiddleware.js')

const {
  getDevices,
  addDevice
} = require('components/device/controller.js')

// router.route('/').get(protect, getDevices)
router.route('/').get(getDevices)

const routetbl = [
  {
    method: router.post,
    endpoint: '/add',
    controller: addDevice
  },
  {
    method: router.post,
    endpoint: '/get',
    controller: getDevices
    // middleware: protect
  }
]

generateRoutes(router, routetbl)
module.exports = router
