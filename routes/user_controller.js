const express = require("express");

const Router = express.Router();

Router.post("/signup", signupUser)