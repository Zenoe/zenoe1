const asyncHandler = require('express-async-handler')
const Joi = require('joi')
const validateSchema = require('middleware/validate-request')
const { logger } = require('init')
const { getRfcSections, getRfc, saveRfc } = require('./service')

const rfcAdd = asyncHandler(async (req, res) => {
  const { rfcId } = req.body
  // rfcId = `rfc${rfcId}`

  // search from db first
  // if doesn't exist then go download from the internet
  //
  const rfcContent = await getRfc(rfcId)

  if (rfcContent.length > 0) {
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
      saveRfc(sec)
    } catch (e) {
      logger.debug(e)
      // throw new TrivialError(`insert rfc failed: ${e.message}`)
    }
  }

  res.json(lstRfcSection)
})

module.exports = { rfcAdd }
