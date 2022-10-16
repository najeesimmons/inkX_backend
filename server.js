// import express
const express = require("express");
// create application object
const app = express();
// load in .env variables
require("dotenv").config()
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////MiddleWare///////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

////////////// ROUTES ///////////// * ////////////// ROUTES /////////////

/////// create a test route ///////
app.get("/", (req, res) => {
    res.send("hello world");
});


//////////// LISTENER /////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));