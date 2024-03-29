const asyncHandler = require('express-async-handler')
const Joi = require('joi')
const User = require('./model.js')
const generateToken = require('utils/generateToken.js')
const validateSchema = require('middleware/validate-request')

const { appConfig } = require('config')
const { ApplicationError } = require('error/appErrors')

// @description     Auth the user
// @route           POST /api/users/login
// @access          Public
const maxAge = appConfig.JWT_EXPIRE * 1000

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id, maxAge)
    res.cookie('jwt', token, { httpOnly: true, maxAge })
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})

const registerSchemaMware = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required()
    // confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  })
  validateSchema(req, next, schema)
}

// @description     Register new user
// @route           POST /api/users/
// @access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body
  const userExists = await User.findOne({ email })

  if (userExists) {
    throw new ApplicationError('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    pic
  })

  if (user) {
    const token = generateToken(user._id, maxAge)
    res.cookie('jwt', token, { httpOnly: true, maxAge })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token
    })
  } else {
    res.status(400)
    throw new Error('User not found')
  }
})

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.pic = req.body.pic || user.pic
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

module.exports = { userLogin, updateUserProfile, registerUser, registerSchemaMware }
