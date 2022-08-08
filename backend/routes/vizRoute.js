// const router = require('express').Router()
const express = require('express')
const router = express.Router();

const {
    getAll,
    getByFileName,
} = require("components/wc/controller.js")

const { protect } = require("../middleware/authMiddleware.js")

router.get('/', getAll);
router.get('/:fileName', getByFileName);


module.exports = router;
