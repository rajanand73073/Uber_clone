import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Ride } from "../models/ride.model.js";
import { ride, getFare } from "../services/ride.service.js";

const CreateRide = asyncHandler(async (req, res) => {
  try {
    const { pickup, destination, vehicleType } = req.body;
    const user = req.user?._id;
    const rideBooking = await ride({ pickup, destination, user, vehicleType });

    return res
      .status(200)
      .json(new ApiResponse(200, rideBooking, "Ride successfully created"));
  } catch (error) {
    console.error("error", error.message);
  }
});

const fare = asyncHandler(async (req, res) => {
  const { pickup, destination } = req.query;

  try {
    const fare = await getFare(pickup, destination);
    return res
      .status(200)
      .json(new ApiResponse(200, fare, "Fare calculated Successfully"));
  } catch (err) {
    console.error("Error fetching fare:", err.message);
    return res.status(500).json({ message: err.message });
  }
});
export { CreateRide, fare };
