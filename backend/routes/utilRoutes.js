// const router = require('express').Router()
const express = require('express')
const router = express.Router();

const {
  getFileList,
  uploadFile,
} = require("components/utils/controller.js")

const { protect } = require("../middleware/authMiddleware.js")

router.post('/upload', uploadFile);
router.get('/filelist', getFileList)

module.exports = router;
