const captainController = require("../controllers/captian.controller");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity")
      .isLength({ min: 1 })
      .isNumeric()
      .withMessage("Capacity must be a number"),
    body("vehicle.vehicleType")
      .isIn(["car", "moto", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  captainController.registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  captainController.loginCaptain
);

router.get(
  "/profile",
  authMiddleware.authCaptain,
  captainController.getCaptainProfile
);

router.get(
  "/logout",
  authMiddleware.authCaptain,
  captainController.logoutCaptain
);

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// 1. Check current captain status
router.get('/captain-status', async (req, res) => {
    try {
        const pickupLat = 28.6430858;
        const pickupLng = 77.2192671;
        
        const captains = await captainModel.find({});
        
        const captainsWithDistance = captains.map(captain => {
            let distance = null;
            if (captain.location && captain.location.coordinates) {
                const [captainLng, captainLat] = captain.location.coordinates;
                if (captainLng !== 0 && captainLat !== 0) {
                    distance = calculateDistance(pickupLat, pickupLng, captainLat, captainLng);
                }
            }
            
            return {
                id: captain._id,
                name: captain.fullname?.firstname || 'No name',
                email: captain.email,
                status: captain.status,
                coordinates: captain.location?.coordinates || null,
                socketId: captain.socketId || null,
                vehicle: captain.vehicle,
                distanceFromPickup: distance ? `${distance.toFixed(2)}km` : 'No location'
            };
        });
        
        res.json({
            total: captains.length,
            active: captains.filter(c => c.status === 'active').length,
            inactive: captains.filter(c => c.status !== 'active').length,
            captains: captainsWithDistance
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Complete reset - delete all and create fresh captain
router.post('/complete-reset', async (req, res) => {
    try {
        // Step 1: Delete ALL existing captains
        const deleteResult = await captainModel.deleteMany({});
        console.log(`Deleted ${deleteResult.deletedCount} existing captains`);
        
        // Step 2: Create fresh test captain
        const pickupLat = 28.6430858;
        const pickupLng = 77.2192671;
        const captainLat = pickupLat + 0.0045; // ~0.5km away
        const captainLng = pickupLng + 0.0045;
        
        const hashedPassword = await captainModel.hashedPassword('password123');
        
        const testCaptain = await captainService.createCaptain({
            firstname: 'Active',
            lastname: 'TestCaptain',
            email: 'activecaptain@test.com',
            password: hashedPassword,
            color: 'White',
            plate: 'ACTIVE-01',
            capacity: 4,
            vehicleType: 'car'
        });
        
        // Step 3: Set as active with location and socket
        const activeCaptain = await captainModel.findByIdAndUpdate(
            testCaptain._id,
            {
                status: 'active',
                location: {
                    type: 'Point',
                    coordinates: [captainLng, captainLat]
                },
                socketId: 'active-socket-' + Date.now()
            },
            { new: true }
        );
        
        // Step 4: Calculate distance for verification
        const distance = calculateDistance(pickupLat, pickupLng, captainLat, captainLng);
        
        res.json({
            message: 'Complete reset successful!',
            summary: {
                deletedCaptains: deleteResult.deletedCount,
                createdActiveCaptain: 1,
                totalCaptains: 1
            },
            newCaptain: {
                id: activeCaptain._id,
                name: `${activeCaptain.fullname.firstname} ${activeCaptain.fullname.lastname}`,
                email: activeCaptain.email,
                status: activeCaptain.status,
                coordinates: activeCaptain.location.coordinates,
                socketId: activeCaptain.socketId,
                vehicle: activeCaptain.vehicle,
                distanceFromPickup: `${distance.toFixed(2)}km`
            },
            nextStep: 'Now test POST /rides/create - you should get 1 active captain!'
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Delete only inactive captains
router.delete('/cleanup-inactive', async (req, res) => {
    try {
        const result = await captainModel.deleteMany({ 
            status: { $ne: 'active' }
        });
        
        res.json({ 
            message: `Deleted ${result.deletedCount} inactive captains`,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
