const foodPartnerSchmaModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodpartner = await foodPartnerSchmaModel.findById(decoded.id);

        if(!foodpartner) {
            return res.status(401).json({message: "Unauthorized"});
        }

        req.foodpartner = foodpartner;

        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid token"});
    }
}

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({message: "login first"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid token"});
    }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}
