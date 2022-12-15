const asyncHandler = require('express-async-handler')
const Joi = require('joi')
const Rfc = require('./model.js')
const validateSchema = require('middleware/validate-request')
const { logger } = require('init')
const { getRfcSections } = require('./service')

const rfcAdd = asyncHandler(async (req, res) => {
  const { rfcId } = req.body
  // rfcId = `rfc${rfcId}`

  // search from db first
  // if doesn't exist then go download from the internet
  //
  const rfcExists = await Rfc.findOne({ rfcId })

  if (rfcExists) {
    // const rfcContent = await Rfc.find({}).select({ rfcId, _id: 0, createAt: 0, updatedAt: 0 })
    // const rfcContent = await Rfc.find({}).select({ rfcId })
    const rfcContent = await Rfc.find({ rfcId }, { _id: 0, rfcId: 0, createAt: 0, updatedAt: 0 })
    // logger.debug('get content from db')
    // logger.debug(rfcContent)
    res.json(rfcContent)
    return
  }

  const lstRfcSection = await getRfcSections(rfcId)
  if (lstRfcSection === null) {
    res.json('rfc not found')
    return
  }

  // logger.debug(lstRfcSection)
  for (const sec of lstRfcSection) {
    sec.rfcId = rfcId
    try {
      const rfc = await Rfc.create(sec)
      // logger.info(`insert rfc: ${rfc._id}`)
    } catch (e) {
      logger.debug(e)
      // throw new TrivialError(`insert rfc failed: ${e.message}`)
    }
  }

  res.json(lstRfcSection)
})

module.exports = { rfcAdd }
