const express = require('express')
const setCookie = require('../middleware/setCookie')
const {
  userLogin,
  registerUser,
  registerUserSchema
} = require('components/users/controller.js')

const { protect } = require('../middleware/authMiddleware.js')
// const { default: setCookie } = require('../middleware/setCookie.js')

const router = express.Router()
router.route('/').post(registerUserSchema, registerUser)
// set a cookie
router.use('/login', setCookie)
router.post('/login', userLogin)
// router.route('/profile').post(protect, updateUserProfile)

module.exports = router
