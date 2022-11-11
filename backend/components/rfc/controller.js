const asyncHandler = require('express-async-handler')
const Joi = require('joi')
const Rfc = require('./model.js')
const generateToken = require('utils/generateToken.js')
const validateSchema = require('middleware/validate-request')

const { ApplicationError } = require('error/appErrors')
// @description     Auth the rfc
// @route           POST /api/rfcs/add
// @access          Public
const rfcAdd = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const rfc = await Rfc.findOne({ email })

  if (rfc && (await rfc.matchPassword(password))) {
    res.json({
      _id: rfc._id,
      name: rfc.name,
      email: rfc.email,
      isAdmin: rfc.isAdmin,
      pic: rfc.pic,
      token: generateToken(rfc._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})

module.exports = { rfcAdd }
