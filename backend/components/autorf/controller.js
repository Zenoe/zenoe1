const asyncHandler = require('express-async-handler')
const Joi = require('joi')
const validateSchema = require('middleware/validate-request')
const { logger } = require('init')
const { cli2rf } = require('./service')

const autoRF = asyncHandler(async (req, res) => {
  const { cli } = req.body
  // console.log(cli)
  const rfscript = cli2rf(cli)
  // console.log(rfscript)
  res.json(rfscript)
})

const addRFType = asyncHandler(async (req, res) => {
  const { rftype } = req.body
  console.log('addRFType', rftype)
  res.json({})
})

const getRFType = asyncHandler(async (req, res) => {
  res.json({})
})

module.exports = { autoRF, addRFType, getRFType }
