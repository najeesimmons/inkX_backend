
/////////// DEPENDENCIES //////////*/////////// DEPENDENCIES //////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 3000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");


/////// DATABASE CONNECTION ////////*/////// DATABASE CONNECTION ////////
/////// Establish Connection ///////
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  // Connection Events
  mongoose.connection
    .on("open", () => console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error));
  
////////////// MODELS ///////////// * ////////////// MODELS /////////////

///////////Artist Model///////////
const ArtistSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    email: String,
    bio: String,
    profile_pic: String,
    city: String,
    state: String,
    phone: String,
});
      
    const Artist = mongoose.model("Artist", ArtistSchema);
    
///////////Piece Model///////////
const PieceSchema = new mongoose.Schema({
    title: {type: String, default: "Title Not Yet Provided"},
    artist: {
    type: mongoose.Types.ObjectId,
    ref: "Artist",
    }, 
    date: { type: Date, default: Date.now },
    description: String,
    image: String 
});

    const Piece = mongoose.model("Piece", PieceSchema);

///////////MiddleWare///////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

////////////// ROUTES ///////////// * ////////////// ROUTES /////////////

/////// create a test route ///////
app.get("/", (req, res) => {
    res.send("hello world");
});

///////////ARTIST ROUTES/////////// * ///////////ARTIST ROUTES///////////

/////// Artist Index Route ////////
app.get("/artist", async (req, res) => {
  try {
    // send all artists
    res.json(await Artist.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

////// Artist Create Route ////////
app.post("/artist", async (req, res) => {
  try {
    // add new artist to req.body
    res.json(await Artist.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

////// Artist Update Route ////////
app.put("/artist/:id", async (req, res) => {
  try {
    // update artist with req.body
    res.json(
      await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

////// Artist Delete Route ////////
app.delete("/artist/:id", async (req, res) => {
  try {
    // find and delete artist
    res.json(await Artist.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

///////////PIECE ROUTES///////////* ///////////PIECE ROUTES///////////
/////// Piece Index Route ////////

app.get("/piece", async (req, res) => {
  try {
    // send all pieces
    res.json(await Piece.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

////// Piece Create Route ////////
app.post("/piece", async (req, res) => {
  try {
    // add new piece to req.body
    res.json(await Piece.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

////// Piece Update Route ////////
app.put("/piece/:id", async (req, res) => {
  try {
    // update piece with req.body
    res.json(
      await Piece.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

////// Piece Delete Route ////////
app.delete("/piece/:id", async (req, res) => {
  try {
    // find and delete artist
    res.json(await Piece.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

//////////// LISTENER /////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));