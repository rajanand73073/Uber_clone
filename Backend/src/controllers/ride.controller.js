import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Ride } from "../models/ride.model.js";
import { ride, getFare } from "../services/ride.service.js";
import { Captain } from "../models/captain.model.js";
import { sendMessageToSocketId } from "../socket.server.js";
import { activeCaptain } from "../socket.server.js";

const CreateRide = asyncHandler(async (req, res) => {
  try {
    const { pickup, destination, vehicleType } = req.body;
    const user = req.user?._id;
    const rideBooking = await ride({ pickup, destination, user, vehicleType });

    const rideWithUser = await Ride.findOne(rideBooking._id).populate("user");

    console.log("ride", rideWithUser);

    console.log("activeCaptain ", activeCaptain);

    console.log("activeCaptain socketid", activeCaptain.socketId);

    sendMessageToSocketId(activeCaptain.socketId, {
      event: "new-ride",
      data: rideWithUser,
    });

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
