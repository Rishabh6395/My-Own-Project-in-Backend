const rideModel = require("../models/ride.model");
const mapService = require("../services/maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination, vehicleType) {
  if (!pickup || !destination || !vehicleType) {
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
    auto: baseFare.auto + distance * perKmRate.auto + time * perMinRate.auto,
    car: baseFare.car + distance * perKmRate.car + time * perMinRate.car,
    moto: baseFare.moto + distance * perKmRate.moto + time * perMinRate.moto,
  };
  return fare;
}

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

module.exports.getFare = getFare;
