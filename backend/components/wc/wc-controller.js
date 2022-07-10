const express = require('express');
const router = express.Router();
const validateRequest = require('middleware/validate-request');
const wordCountService = require('./wc-service');

// routes
router.get('/', getAll);
router.get('/:fileName', getByFileName);

function getAll(req, res, next) {
    wordCountService.getAll(res)
        .then(users => res.json(users))
}

function getByFileName(req, res, next) {
    wordCountService.getByFileName(req.params.fileName)
        .then(fileContent => res.json(fileContent))
}

module.exports = router;
