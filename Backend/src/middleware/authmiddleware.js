import express from "express";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Captain } from "../models/captain.model.js";

export const verifyJwtUser = asyncHandler(async (req,_,next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized access");
    }

    const decodedTOken = jwt.verify(token, process.env.JWT_SECRETS);

    const user = await User.findById(decodedTOken?._id).select("-password");
    if (!user) {
      throw new ApiError(401, "Invalid User");
    }

    req.user = user; // Attach user data to the request
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const verifyJWTCaptain = asyncHandler(async(req,res,next)=>{
try {
  
  const token = req.cookies?.token||req.header("Authorization")?.replace("Bearer ","")
  
  if (!token) {
    throw new ApiError(402,"Unauthorized Access")
  }
  
  const decodedToken = jwt.verify(token,process.env.JWT_SECRETS)
  
  const captain = await Captain.findById(decodedToken?._id).select("-password")
  
  if (!captain) {
    throw new ApiError(401,"Invalid Captain");
  }
  
  req.captain = captain; // Attach user data to the request
  next(); // Pass control to the next middleware or route handler
  
} catch (error) {
  throw new ApiError(401, error?.message || "Invalid access token");
}
})
