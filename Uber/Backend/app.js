const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDb = require("./db/db");
app.use(cors());

connectToDb();

app.get("/", (req, res) => {
  res.send("Helllo world");
});

module.exports = app;
