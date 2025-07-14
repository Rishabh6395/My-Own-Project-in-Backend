const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDb = require("./db/db");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const captianRoutes = require("./routes/captain.route");
const mapsRoutes = require("./routes/maps.route");
const rideRoutes = require("./routes/ride.route");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDb();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use(express.json());
app.use("/users", userRoutes);
app.use("/captains", captianRoutes);
app.use("/maps", mapsRoutes);
app.use("/rides", rideRoutes);

module.exports = app;
