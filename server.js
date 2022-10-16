const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require("./routes/user");

const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT;

// test route
app.get("/", (req, res) => {
  res.send("hello world, this is a test route");
});

app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
