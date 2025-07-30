const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const {sendMessageToSocketId} = require("../socket");


module.exports.createRide = async(req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try{
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        
        console.log(pickupCoordinates)
        
        const captainInRaidus = await mapService.getCaptainInTheRaidius(pickupCoordinates.latitude, pickupCoordinates.longitude, 5);

        ride.otp =""

        captainInRaidus.map(captain => {

            console.log(captain, ride)

            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: ride
            });
        })


    }catch(error){
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