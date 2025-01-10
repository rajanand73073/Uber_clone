import mongoose from "mongoose";
import { User } from "./user.model.js";
import { Captain } from "./captain.model.js";

const { Schema } = mongoose;

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    req: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Captain,
  },
  pickup: {
    type: String,
    req: true,
  },
  destination: {
    type: String,
    req: true,
  },
  fare: {
    type: Number,
    req: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "ongoing", "accepted", "cancelled"],
    default: "pending",
  },
  duration: {
    type: Number, //in min
  },
  distance: {
    type: Number, //in meter
  },
  PaymentId: {
    type: String,
  },
  BookingId: {
    type: String,
  },
  Signature: {
    type: String,
  },
  otp: {
    type: String,
    select: false,
    required: true,
  },
});

export const Ride = mongoose.model("Ride", rideSchema);
