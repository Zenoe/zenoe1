// const router = require('express').Router()
const express = require('express')
const router = express.Router();

const {
    getAll,
    getByFileName,
    getTimeStampData,
} = require("components/wc/controller.js")

const { protect } = require("../middleware/authMiddleware.js")

router.get('/wordcount/', getAll);
router.get('/wordcount/:fileName', getByFileName);
router.get('/gettimestampdata/', getTimeStampData);


module.exports = router;
