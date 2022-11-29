const asyncHandler = require('express-async-handler')
const Joi = require('joi')
const Rfc = require('./model.js')
const validateSchema = require('middleware/validate-request')
const { logger } = require('init')

const { checkFileExists } = require('utils/fs')
const { translationSection } = require('tool/rfcExtraction/extractSection')
const { downloadFile } = require('utils/utils')

const rfcAdd = asyncHandler(async (req, res) => {
  const { rfcId } = req.body
  const savedFile = `${process.env.PWD}/components/rfc/rfcTxtLocal/rfc${rfcId}.txt`
  const url = `https://www.rfc-editor.org/rfc/rfc${rfcId}.txt`

  const fileExist = await checkFileExists(savedFile)

  if (!fileExist) {
    try {
      await downloadFile(url, savedFile)
      logger.info(`${rfcId} downloaded`)
    } catch (err) {
      logger.debug(`download failed: ${err.cause}`)
    }
  } else {
    logger.debug('file exists')
  }

  const lstRfcSection = await translationSection(savedFile)

  const rfcSection = lstRfcSection[1]
  rfcSection.rfcId = rfcId
  console.log(rfcSection)
  try {
    const rfc = await Rfc.create(rfcSection)
    logger.info(`insert rfc: ${rfc._id}`)
  } catch (e) {
    // throw new TrivialError(`insert rfc failed: ${e.message}`)
  }
  res.json({})
})

module.exports = { rfcAdd }
