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
  // rfcId = `rfc${rfcId}`
  const savedFile = `${process.env.PWD}/components/rfc/rfcTxtLocal/rfc${rfcId}.txt`
  const url = `https://www.rfc-editor.org/rfc/rfc${rfcId}.txt`

  // search from db first
  // if doesn't exist then go download from the internet
  //
  const rfcExists = await Rfc.findOne({ rfcId })

  if (rfcExists) {
    console.log('findOne')
    // const rfcContent = await Rfc.find({}).select({ rfcId, _id: 0, createAt: 0, updatedAt: 0 })
    // const rfcContent = await Rfc.find({}).select({ rfcId })
    const rfcContent = await Rfc.find({ rfcId }, { _id: 0, rfcId: 0, createAt: 0, updatedAt: 0 })
    logger.debug('get content from db')
    console.log(rfcContent)
    res.json(rfcContent)
    return
  }

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

  // logger.debug(lstRfcSection)
  for (const sec of lstRfcSection) {
    sec.rfcId = rfcId
    try {
      const rfc = await Rfc.create(sec)
      logger.info(`insert rfc: ${rfc._id}`)
    } catch (e) {
      logger.debug(e)
      // throw new TrivialError(`insert rfc failed: ${e.message}`)
    }
  }

  res.json({})
})

module.exports = { rfcAdd }
