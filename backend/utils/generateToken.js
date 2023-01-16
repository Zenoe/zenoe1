const jwt = require('jsonwebtoken')
const { appConfig } = require('config')

const generateToken = (id, expiresIn = null) => {
  return jwt.sign({ id }, appConfig.JWT_SECRET, {
    expiresIn: expiresIn || appConfig.JWT_EXPIRE
  })
}

module.exports = generateToken
