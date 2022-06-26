const express = require('express');
const router = express.Router();
const validateRequest = require('middleware/validate-request');
const wordCountService = require('./wordcount.service');

// routes
router.get('/', getAll);
router.get('/:fileName', getByFileName);

function getAll(req, res, next) {
    wordCountService.getAll(res)
        .then(users => res.json(users))
        .catch(next);
}

function getByFileName(req, res, next) {
    console.log(req.params);
    wordCountService.getByFileName(req.params.fileName)
        .then(user => res.json(user))
        .catch(next);
}

module.exports = router;
