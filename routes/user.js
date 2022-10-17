const express = require("express");
const { signupUser, loginUser } = require("../controllers/userController");
//need to require "signupuser so that route will have a method attached"
const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;
