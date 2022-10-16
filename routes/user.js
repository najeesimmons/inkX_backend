const express = require("express");
const { signupUser } = require("../controllers/userController")
//need to require "signupuser so that route will have a method attached"
const router = express.Router();

router.post("/signup", signupUser)

module.exports = router;