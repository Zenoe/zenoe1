const express = require('express')
const {
  userLogin,
  registerUser,
  updateUserProfile,
  registerUserSchema,
} = require( "components/users/controller.js")

const { protect } = require("../middleware/authMiddleware.js")

const router = express.Router();
router.route("/").post(registerUserSchema,registerUser);
router.post("/login", userLogin);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
