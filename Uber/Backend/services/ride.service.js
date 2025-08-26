const rideModel = require("../models/ride.model");
const mapService = require("../services/maps.service");
const crypto = require("crypto");
const { sendMessageToSocketId } = require("../socket");

async function getFare(pickup, destination, vehicleType) {
  if (!pickup || !destination) {
    throw new Error("All fields are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  // Extract numbers from strings
  const distance = parseFloat(distanceTime.distance); // '19.99 km' -> 19.99
  const time = parseFloat(distanceTime.duration); // '23 mins' -> 23

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 5,
  };
  const perMinRate = {
    auto: 5,
    car: 10,
    moto: 5,
  };

  const fare = {
    auto: Math.round(baseFare.auto + distance * perKmRate.auto + time * perMinRate.auto),
    car: Math.round(baseFare.car + distance * perKmRate.car + time * perMinRate.car),
    moto: Math.round(baseFare.moto + distance * perKmRate.moto + time * perMinRate.moto),
  };
  return fare;
}

module.exports.getFare = getFare;

function getOtp(num) {
  const min = Math.pow(10, num - 1);
  const max = Math.pow(10, num) - 1;
  const otp = crypto.randomInt(min, max + 1);
  return otp.toString(); // Convert to string for schema
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }
  const fareObj = await getFare(pickup, destination, vehicleType);
  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const ride = new rideModel({
    userId: user._id,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fareObj[vehicleType], // Only the selected vehicle's fare
    vehicleType,
    distance: parseFloat(distanceTime.distance), // Save distance if your schema requires it
  });
  return await ride.save();
};

module.exports.confirmRide = async (rideId, captainId) => {
  // const ride = await rideModel.findById(rideId);
  if (!rideId || !captainId) {
    throw new Error("Ride or captain not found");
  }

  await rideModel.findOneAndUpdate({
    _id: rideId
  }, {
    status: 'accepted',
    captain: captainId
  });

  const ride = await rideModel.findOne({
    _id: rideId
  }).populate('userId').populate('captain').select('+otp');

  if (!ride) {
    throw new Error("Ride not found");
  }

  console.log("Populated ride userId", ride.userId);

  return ride;
};

module.exports.startRide = async ({rideId, otp, captain}) => {
  if (!rideId || !otp) {
    throw new Error("Ride or otp or captain not found");
  } 

  const ride = await rideModel.findOne({
    _id: rideId
  }).populate('userId').populate('captain').select('+otp');

  if (!ride) {
    throw new Error("Ride not found");
  }

  if(ride.status !== 'accepted') {
    throw new Error("Ride not accepted");
  }

  if(ride.otp !== otp) {
    throw new Error("Invalid otp");
  }

  await rideModel.findOneAndUpdate({
    _id: rideId
  }, {
    status: 'started'
  });

  const updatedRide = await rideModel.findOne({
    _id: rideId
  }).populate('userId').populate('captain');

  console.log('✅ Ride started successfully:', JSON.stringify(updatedRide, null, 2));

  // Send message to user with the UPDATED ride data
  sendMessageToSocketId(ride.userId.socketId, {
    event: "ride-started",
    data: updatedRide  // ✅ Send updated ride with captain data
  });

  return updatedRide;  // ✅ Return updated ride
}

module.exports.endRide = async ({rideId, captain}) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  } 

  const ride = await rideModel.findOne({
    _id: rideId,
    captain: captain._id
  }).populate('userId').populate('captain').select('+otp');

  if (!ride) {
    throw new Error("Ride not found");
  }

  if(ride.status !== 'started') {
    throw new Error("Ride not started");
  }

  await rideModel.findOneAndUpdate({
    _id: rideId
  }, {
    status: 'completed'
  });
  // return ride;

  // Return the updated ride with completed status
  const updatedRide = await rideModel.findOne({
    _id: rideId
  }).populate('userId').populate('captain');

  console.log('✅ Ride ended successfully:', JSON.stringify(updatedRide, null, 2));

  return updatedRide;
}

module.exports.getFare = getFare;
