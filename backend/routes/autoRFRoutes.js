const express = require('express')
const router = express.Router()
const { generateRoutes } = require('utils/nodeUtil')

const {
  autoRF
} = require('components/autorf/controller.js')

const routetbl = [
  {
    method: router.post,
    endpoint: '/cli2rf',
    controller: autoRF
  }
]

generateRoutes(router, routetbl)
module.exports = router
