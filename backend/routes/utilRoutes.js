const express = require('express')
const router = express.Router()

const {
  getFileList,
  uploadFile,
  convert2Rf,
  convertParam,
  updateDeviceBin,
  checkRFSyntax
} = require('components/utils/controller.js')

// const { protect } = require('../middleware/authMiddleware.js')

router.post('/upload', uploadFile)
router.get('/filelist', getFileList)
router.get('/convert2rf', convert2Rf)
router.get('/convertparam', convertParam)
router.post('/checkrfsyntax', checkRFSyntax)
router.post('/updatedevicebin', updateDeviceBin)

module.exports = router
