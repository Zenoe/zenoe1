const express = require('express')
const router = express.Router()
const { generateRoutes } = require('utils/nodeUtil')

const {
  rfcAdd
} = require('components/rfc/controller.js')

const routetbl = [
  {
    method: router.post,
    endpoint: '/rfcadd',
    controller: rfcAdd
  }
]

generateRoutes(router, routetbl)
module.exports = router
