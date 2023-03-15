const asyncHandler = require('express-async-handler')
const Joi = require('joi')
const validateSchema = require('middleware/validate-request')
const { logger } = require('init')
const { cli2rf } = require('./service')
const { RFType, RFScript } = require('./model')
const {
  getData,
  addData,
  updateDataOne
} = require('utils/mongodbUtil')

const autoRF = asyncHandler(async (req, res) => {
  const { cli } = req.body
  // console.log(cli)
  const rfscript = cli2rf(cli)
  // console.log(rfscript)
  res.json(rfscript)
})

const addRFScript = asyncHandler(async (req, res) => {
  const { user, topName, RFType, desc, cli } = req.body
  console.log('addRFScript for topName, user', topName, user)
  try {
    const result = await addData(RFScript, { topName, RFType, desc, cli })
    logger.debug(`addRFScript result: ${result}`)
    res.json({ status: 1 })
  } catch (e) {
    logger.error(`addRFScript Error: ${e.message}`)
    res.json({ status: 0, message: e.message })
  }
})

const getRFScript = asyncHandler(async (req, res) => {
  try {
    const result = await getData(RFScript)
    res.json({ result, status: 1 })
  } catch (e) {
    logger.error(`getRFScript Error: ${e.message}`)
    res.json({ status: 0, message: e.message })
  }
})

const addRFType = asyncHandler(async (req, res) => {
  const { rftype } = req.body
  console.log('addRFType', rftype)
  try {
    const result = await addData(RFType, { RFTypeName: rftype })
    logger.debug(`addRFType result: ${result}`)
    res.json({ status: 1 })
  } catch (e) {
    logger.error(`addRFType Error: ${e.message}`)
    res.json({ status: 0, message: e.message })
  }
})

const getRFType = asyncHandler(async (req, res) => {
  try {
    const result = await getData(RFType)
    res.json({ result, status: 1 })
  } catch (e) {
    logger.error(`getRFType Error: ${e.message}`)
    res.json({ status: 0, message: e.message })
  }
})

module.exports = {
  autoRF,
  addRFType,
  getRFType,
  addRFScript,
  getRFScript
}
