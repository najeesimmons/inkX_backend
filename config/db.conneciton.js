const mongoose = require("mongoose");
require("dotenv").config();

const connectionStr = process.env.MONGO_URI;

mongoose.connect(connectionStr, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));
