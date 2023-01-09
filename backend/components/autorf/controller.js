const asyncHandler = require('express-async-handler')
const Joi = require('joi')
const validateSchema = require('middleware/validate-request')
const { logger } = require('init')
const { cli2rf } = require('./service')

const autoRF = asyncHandler(async (req, res) => {
  const { cli } = req.body
  // console.log(cli)
  // console.log(cli2rf)
  const rfscript = cli2rf(cli)
  // console.log(rfscript)
  res.json(rfscript)
})

module.exports = { autoRF }
