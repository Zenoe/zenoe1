const jwt = require('jsonwebtoken')
const { appConfig } = require('config')

const generateToken = (id) => {
  return jwt.sign({ id }, appConfig.JWT_SECRET, {
    expiresIn: appConfig.JWT_EXPIRE
  })
}

module.exports = generateToken
