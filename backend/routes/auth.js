const express = require('express')
const router = express.Router()
const logger = require('services/logger')

router.post('/', (req, res) => {
  const { name } = req.body
  logger.info(`${name} login`)
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }

  res.status(401).send('Please Provide Credentials')
})

module.exports = router
