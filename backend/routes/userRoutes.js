const express = require('express')
const {
  userLogin,
  registerUser,
  updateUserProfile,
} = require( "components/users/controller.js")

const { protect } = require("../middleware/authMiddleware.js")

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", userLogin);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
