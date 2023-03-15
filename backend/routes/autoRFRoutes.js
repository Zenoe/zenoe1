const express = require('express')
const router = express.Router()
const { generateRoutes } = require('utils/nodeUtil')

const {
  autoRF,
  addRFType,
  getRFType,
  addRFScript,
  getRFScript
} = require('components/autorf/controller.js')

const routetbl = [
  {
    method: router.post,
    endpoint: '/addrfscript',
    controller: addRFScript
  },
  {
    method: router.post,
    endpoint: '/getrfscript',
    controller: getRFScript
  },
  {
    method: router.post,
    endpoint: '/addrftype',
    controller: addRFType
  },
  {
    method: router.post,
    endpoint: '/getrftype',
    controller: getRFType
  },
  {
    method: router.post,
    endpoint: '/cli2rf',
    controller: autoRF
  }
]

generateRoutes(router, routetbl)
module.exports = router
