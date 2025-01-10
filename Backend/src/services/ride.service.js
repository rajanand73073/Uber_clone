import { Ride } from "../models/ride.model.js";
import crypto from "crypto";

export const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const distanceInKm = 10;
  const timeInMinutes = 20; // Assuming a fixed time for the calculation

  const fare = {
    auto: Math.round(
      baseFare.auto +
        distanceInKm * perKmRate.auto +
        timeInMinutes * perMinuteRate.auto,
    ),
    car: Math.round(
      baseFare.car +
        distanceInKm * perKmRate.car +
        timeInMinutes * perMinuteRate.car,
    ),
    moto: Math.round(
      baseFare.moto +
        distanceInKm * perKmRate.moto +
        timeInMinutes * perMinuteRate.moto,
    ),
  };

  return fare;
};

const getotp = (num) => {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
};

export const ride = async ({ pickup, destination, user, vehicleType }) => {
  try {
    if (!user || !pickup || !destination || !vehicleType) {
      throw new ApiError("All fields are required");
    }

    const fare = await getFare(pickup, destination);

    const rideInfo = await Ride.create({
      user,
      pickup,
      destination,
      vehicleType,
      fare: fare[vehicleType],
      otp: getotp(6),
    });

    return rideInfo;
  } catch (error) {
    console.error("error", error.message);
  }
};
