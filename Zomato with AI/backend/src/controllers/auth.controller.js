const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { fullname, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullname,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    "f79251d80d03c569484366e54e9f0058"
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
  });
}

module.exports = {
  registerUser
};
