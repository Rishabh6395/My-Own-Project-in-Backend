const userModel = require("../models/user.model");
const foodPartnerSchmaModel = require("../models/foodpartner.model");
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
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      address: user.address,
      contactName: user.contactName 
    },
  });
}

async function loginUser(req, res) {
  const {email, password} = req.body;

  const user = await userModel.findOne({email});

  if(!user){
    return res.status(400).json({message: "Invalid email or password"});
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
    return res.status(400).json({message: "Invalid email or password"});
  }

  const token = jwt.sign({
    id: user._id,
  }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
  });
}

async function logoutUser(req, res){
  res.clearCookie("token");
  res.status(200).json({message: "User logged out successfully"});
}

async function registerFoodPartner(req, res) {
  const { name, email, password, phone,address, contactName } = req.body;

  const isUserAlreadyExists = await foodPartnerSchmaModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodpartner = await foodPartnerSchmaModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    contactName
  });

  const token = jwt.sign(
    {
      id: foodpartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    foodpartner: {
      _id: foodpartner._id,
      name: foodpartner.name,
      email: foodpartner.email,
    },
  });
}

async function loginFoodPartener(req, res) {
  const {email, password} = req.body;

  const foodpartner = await foodPartnerSchmaModel.findOne({email});

  if(!foodpartner){
    return res.status(400).json({message: "Invalid email or password"});
  }

  const isPasswordValid = await bcrypt.compare(password, foodpartner.password);

  if(!isPasswordValid){
    return res.status(400).json({message: "Invalid email or password"});
  }

  const token = jwt.sign({
    id: foodpartner._id,
  }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    foodpartner: {
      _id: foodpartner._id,
      name: foodpartner.name,
      email: foodpartner.email,
    },
  });
}

function logoutFoodPartner(req, res){
  res.clearCookie("token");
  res.status(200).json({message: "Food partner logged out successfully"});
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartener,
  logoutFoodPartner
};
