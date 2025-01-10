import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { userCreate } from "../services/user.service.js";

const registerUser = asyncHandler(async (req, res) => {
  //todos: get the user data from the request body
  //validate the user data
  //already exists
  //hash the password
  //create a token
  //create userobject via user.srvice- entry in db
  //remove password and refresh token from the response
  //send the response
  //check the res data in postman

  const { email, password, fullname } = req.body;

  // if (
  //     [firstname,email,password].some((field)=>field?.trim() ==="")
  // ) {
  //     throw new ApiError(401,"All fields are required");
  // }

  const user = await userCreate({
    email,
    password,

    firstname: fullname.firstname,
    lastname: fullname.lastname,
  });

  //we are creating service for interacting with the database
  const token = user.generateAuthToken();

  const options = {
    expiresIn: process.env.JWT_EXPIRE,
    httpOnly: true,
    secure: true,
  };
  if (!user) {
    throw new ApiError(401, "not registered");
  }
  return res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(200, { user, token }, "User registered successfully"),
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(401, "Please enter Valid Email id Or Password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "User doesnot exist ");
  }

  const passwordCheck = await user.isPasswordCorrect(password);

  if (!passwordCheck) {
    throw new ApiError(401, "Wrong Password");
  }

  const token = await user.generateAuthToken();

  const loggedInUser = await User.findById(user?._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
    expiresIn: process.env.JWT_EXPIRE,
  };

  return res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        200,
        { InUser: loggedInUser, token },
        "Logged In Successfully",
      ),
    );
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id).select("-password");

  if (!user) {
    throw new Error(401, "Unable to find User");
  }

  return res.status(200).json(new ApiResponse(200, { user }, "UserDetails"));
});

const loggoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        token: undefined,
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "Logged Out Successfully"));
});

export { registerUser, loginUser, getUserProfile, loggoutUser };
