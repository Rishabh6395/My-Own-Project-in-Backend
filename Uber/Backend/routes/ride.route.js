const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/create",
  authMiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isIn(["auto", "car", "moto"])
    .withMessage("Invalid vehicle type"),
  authMiddleware.authUser,
  rideController.createRide
);

router.get('/get-fare', 
    authMiddleware.authUser,
    query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    query("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    rideController.getFare
)

router.post('/rides/create', 
    authMiddleware.authUser,
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    body("vehicleType").isString().isLength({ min: 3 }).withMessage("Invalid vehicle type"),
    authMiddleware.authUser,
    rideController.createRide
)

router.post('/confirm', 
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage("Invalid ride id"),
    rideController.confirmRide
  )

router.post("/start-ride",
  authMiddleware.authCaptain,
  [
    body('rideId').isMongoId().withMessage("Invalid ride id"),
    body('otp').isString().isLength({ min: 4, max: 6 }).withMessage("Invalid otp")
  ],
  rideController.startRide
); 

module.exports = router;
