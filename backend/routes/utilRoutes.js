// const router = require('express').Router()
const express = require('express')
const router = express.Router();

const {
  getFileList,
  uploadFile,
  convert2Rf,
} = require("components/utils/controller.js")

const { protect } = require("../middleware/authMiddleware.js")

router.post('/upload', uploadFile);
router.get('/filelist', getFileList)
router.get('/convert2rf', convert2Rf)

module.exports = router;
