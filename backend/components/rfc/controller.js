const asyncHandler = require('express-async-handler')
const Joi = require('joi')
const Rfc = require('./model.js')
const validateSchema = require('middleware/validate-request')
const logger = require('init')

const { ApplicationError } = require('error/appErrors')
// @description     Auth the rfc
// @route           POST /api/rfcs/add
// @access          Public

const rfcAdd = asyncHandler(async (req, res) => {
  console.log('rfcADD!!', req.body)
  // const rfc = await Rfc.create(req.body)
  // logger.info(`add rfc: ${rfc._id}`)
  res.json({})
})

module.exports = { rfcAdd }
