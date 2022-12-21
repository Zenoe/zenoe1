const { checkFileExists } = require('utils/fs')
const { translationSection } = require('tool/rfcExtraction/extractSection')
const { downloadFile } = require('utils/utils')

const Rfc = require('./model.js')
const TransRestorePtModel = require('./transRestorePtModel')

const { logger } = require('init')

const getRfc = async (rfcId) => {
  const rfcContent = await Rfc.find({ rfcId }, { _id: 0, rfcId: 0, createAt: 0, updatedAt: 0 })
  // const rfcContent = await Rfc.find({}).select({ rfcId, _id: 0, createAt: 0, updatedAt: 0 })

  // return [] if empty
  return rfcContent
}

const saveRestorePt = async ({ rfcId, sectionName, contentId, finishTrans }) => {
  return await TransRestorePtModel.findOneAndUpdate({
    rfcId
  },
  {
    $set: {
      rfcId,
      sectionName,
      contentId,
      finishTrans
    }
  },
  { upsert: true }
  )
}

const getRestorePt = async (rfcId) => {
  console.log('getRestorePt:', rfcId)
  return await TransRestorePtModel.findOne(
    {
      rfcId
    },
    {
      _id: 0,
      sectionName: 1,
      contentId: 1,
      finishTrans: 1
    }
  )
}

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

  let sectionName = ''
  let contentId = '0'
  const oldRestorePt = await getRestorePt(rfcId)
  if (oldRestorePt && oldRestorePt.finishTrans === false) {
    sectionName = oldRestorePt.sectionName
    contentId = oldRestorePt.contentId
  }

  const [lstRfcSection, restorePt] = await translationSection(savedFile, sectionName, contentId)

  await saveRestorePt(restorePt)

  return lstRfcSection
}

const saveRfc = async (sec) => {
  await Rfc.create(sec)
}

module.exports = { saveRfc, getRfcSections, getRfc, getRestorePt }
