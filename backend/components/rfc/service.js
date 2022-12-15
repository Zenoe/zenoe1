const { checkFileExists } = require('utils/fs')
const { translationSection } = require('tool/rfcExtraction/extractSection')
const { downloadFile } = require('utils/utils')

const { logger } = require('init')

const getRfcSections = async (rfcId) => {
  const url = `https://www.rfc-editor.org/rfc/rfc${rfcId}.txt`
  const savedFile = `${process.env.PWD}/components/rfc/rfcTxtLocal/rfc${rfcId}.txt`
  const fileExist = await checkFileExists(savedFile)

  if (!fileExist) {
    try {
      await downloadFile(url, savedFile)
      logger.info(`${rfcId} downloaded`)
    } catch (err) {
      logger.warn(`download failed: ${err}`)
      return null
    }
  } else {
    logger.debug('file exists')
  }

  const lstRfcSection = await translationSection(savedFile)
  return lstRfcSection
}

module.exports = { getRfcSections }
