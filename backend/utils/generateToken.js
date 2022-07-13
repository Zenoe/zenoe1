const jwt = require("jsonwebtoken")
const {appConfig} = require("config");

const generateToken = (id) => {
  return jwt.sign({ id }, appConfig.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
