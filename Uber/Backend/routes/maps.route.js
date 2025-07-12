const express = require("express");
const router = express.Router();
const mapsController = require("../controllers/maps.controller");
const {query} = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");



router.get("/get-coordinate",
    query("address").isString().isLength({ min: 3 }),
    authMiddleware.authUser, mapsController.getCoordiates);

module.exports = router;