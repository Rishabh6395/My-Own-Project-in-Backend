const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const {sendMessageToSocketId} = require("../socket");
const rideModel = require("../models/ride.model");


module.exports.createRide = async(req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    // try{
    //     const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
    //     // res.status(201).json(ride);

        
    //     const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        
    //     console.log(pickupCoordinates)
        
    //     const captainInRaidus = await mapService.getCaptainInTheRaidius(pickupCoordinates.latitude, pickupCoordinates.longitude, 40);


    //     const activeCaptains = captainInRaidus.filter(captain => 
    //         captain.status === 'active' && 
    //         captain.socketId && 
    //         captain.location && 
    //         captain.location.coordinates &&
    //         captain.location.coordinates[0] !== 0 &&
    //         captain.location.coordinates[1] !== 0
    //     );

    //     console.log('Active captains with valid location:', activeCaptains.length);

    //     if (activeCaptains.length === 0) {
    //         return res.status(404).json({ 
    //             message: 'No active captains found in your area',
    //             totalCaptainsFound: captainInRaidus.length,
    //             activeCaptainsFound: activeCaptains.length
    //         });
    //     }

    //     console.log(captainInRaidus)

    //     ride.otp =""

    //     const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate("userId");

    //     captainInRaidus.map(captain => {

    //         console.log(captain, ride)

    //         sendMessageToSocketId(captain.socketId, {
    //             event: "new-ride",
    //             data: rideWithUser
    //         });
    //     })

    //     res.status(201).json(ride);

    // }catch(error){
    //     console.error(error)
    //     res.status(400).json({ message: error.message });
    // }

    try{
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        console.log('🎯 Pickup coordinates:', pickupCoordinates);
        
        const captainsInRadius = await mapService.getCaptainInTheRaidius(
            pickupCoordinates.latitude, 
            pickupCoordinates.longitude, 
            50 // Increased radius
        );

        console.log('\n=== DETAILED CAPTAIN DEBUG ===');
        console.log(`📊 Total captains found in radius: ${captainsInRadius.length}`);

        // Debug each captain in detail
        captainsInRadius.forEach((captain, index) => {
            console.log(`\n--- Captain ${index + 1} Debug ---`);
            console.log(`👤 Name: ${captain.fullname?.firstname || 'No name'}`);
            console.log(`📧 Email: ${captain.email}`);
            console.log(`📱 Status: "${captain.status}" (type: ${typeof captain.status})`);
            console.log(`🔌 SocketId: ${captain.socketId || 'None'}`);
            console.log(`📍 Has location: ${!!captain.location}`);
            
            if (captain.location) {
                console.log(`📍 Location type: ${captain.location.type}`);
                console.log(`📍 Has coordinates: ${!!captain.location.coordinates}`);
                if (captain.location.coordinates) {
                    console.log(`📍 Coordinates: [${captain.location.coordinates[0]}, ${captain.location.coordinates[1]}]`);
                    console.log(`📍 Coordinates valid: ${captain.location.coordinates[0] !== 0 && captain.location.coordinates[1] !== 0}`);
                }
            }
            
            // Test each filter condition individually
            const checks = {
                statusActive: captain.status === 'active',
                hasSocketId: !!captain.socketId,
                hasLocation: !!captain.location,
                hasCoordinates: !!(captain.location && captain.location.coordinates),
                validCoordinates: !!(captain.location && 
                                   captain.location.coordinates &&
                                   captain.location.coordinates[0] !== 0 &&
                                   captain.location.coordinates[1] !== 0)
            };
            
            console.log('✅ Filter checks:', checks);
            console.log(`🎯 Passes all filters: ${Object.values(checks).every(Boolean)}`);
        });

        // Apply the filter
        const activeCaptains = captainsInRadius.filter(captain => 
            captain.status === 'active' && 
            captain.socketId && 
            captain.location && 
            captain.location.coordinates &&
            captain.location.coordinates[0] !== 0 &&
            captain.location.coordinates[1] !== 0
        );

        console.log(`\n🎯 Final result: ${activeCaptains.length} active captains with valid location`);
        console.log('=== END DEBUG ===\n');

        if (activeCaptains.length === 0) {
            return res.status(404).json({ 
                message: 'No active captains found in your area',
                debug: {
                    totalCaptainsFound: captainsInRadius.length,
                    activeCaptainsFound: activeCaptains.length,
                    captains: captainsInRadius.map(c => ({
                        name: c.fullname?.firstname,
                        email: c.email,
                        status: c.status,
                        hasSocketId: !!c.socketId,
                        hasValidLocation: !!(c.location && c.location.coordinates && c.location.coordinates[0] !== 0)
                    }))
                }
            });
        }

        ride.otp = "";
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate("userId");

        console.log('🔍 Populated ride data:', JSON.stringify(rideWithUser, null, 2));
        console.log('🔍 User data in ride:', rideWithUser?.userId);

        // Validate that the user data was populated correctly
        if (!rideWithUser || !rideWithUser.userId) {
            console.error('❌ Failed to populate user data in ride');
            return res.status(500).json({ message: 'Failed to populate ride with user data' });
        }

        activeCaptains.forEach(captain => {

            console.log("Ye mera console hai",captain, ride)

            console.log(`📤 Sending ride to: ${captain.fullname?.firstname} (${captain.socketId})`);
            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: rideWithUser
            });
        });

        res.status(201).json(ride);

    } catch(error) {
        console.error('❌ Error creating ride:', error);
        res.status(400).json({ message: error.message });
    }
}

module.exports.getFare  = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.query;
    try {
        const fare = await rideService.getFare(pickup, destination, vehicleType);
        res.status(200).json(fare);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        const ride =  await rideService.confirmRide(rideId, req.captain._id);

        sendMessageToSocketId(ride.userId.socketId, {
            event: "ride-confirmed",
            data: ride
        });

        res.status(200).json(ride);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}