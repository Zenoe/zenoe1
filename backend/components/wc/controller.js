const express = require('express');
const router = express.Router();
const validateRequest = require('middleware/validate-request');
const _service = require('./service');

function getAll(req, res, next) {
    _service.getAll(res)
        .then(param => res.json(param))
}

function getByFileName(req, res, next) {
    _service.getByFileName(req.params.fileName)
        .then(fileContent => res.json(fileContent))
}

function getTimeStampData(req, res, next) {
    _service.getTimeStampData(res)
        .then(param => res.json(param))
}
module.exports = {
    getAll,
    getByFileName,
    getTimeStampData,
}
