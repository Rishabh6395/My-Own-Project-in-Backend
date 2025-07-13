const express = require("express");
const router = express.Router();
const mapsController = require("../controllers/maps.controller");
const {query} = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");



router.get("/get-coordinate",
    query("address").isString().isLength({ min: 3 }),
    authMiddleware.authUser, mapsController.getCoordiates);

router.get('/get-distance-time', 
    query("origin").isString().isLength({ min: 3 }),
    query("destination").isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapsController.getDistanceTime
)

router.get('/get-suggestions',
    query("address").isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapsController.getSuggestions
)

module.exports = router;