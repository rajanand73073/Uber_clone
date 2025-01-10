import { Captain } from "../models/captain.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { createCaptain } from "../services/captain.service.js";

const captainRegister = asyncHandler(async (req, res) => {
  //todos: get the user data from the request body
  //validate the user data
  //already exists
  //hash the password
  //create a token
  //create userobject via user.srvice- entry in db
  //remove password and refresh token from the response
  //send the response
  //check the res data in postman

  const { email, password, fullname, vehicle } = req.body;

  const captain = await createCaptain({
    email,
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    password,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = await captain.generateAuthToken();

  const options = {
    expiresIn: process.env.JWT_EXPIRE,
    httpOnly: true,
    secure: true,
  };
  const registeredCaptain = await Captain.findById(captain?._id).select(
    "-password",
  );
  if (!registeredCaptain) {
    throw new ApiError(401, "Captain not registered");
  }
  console.log(registeredCaptain);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { registeredCaptain },
        "Captain registered Successfully",
      ),
    );
});

const captainLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(401, "Invalid email or password");
  }
  const captain = await Captain.findOne({ email });
  if (!captain) {
    throw new ApiError(401, "User doesn't exist");
  }
  console.log(captain);

  const passwordCheck = await captain.isPasswordCorrect(password);
  if (!passwordCheck) {
    throw new ApiError(401, "Wrong Password");
  }

  const token = await captain.generateAuthToken();

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
        { data: captain, token },
        "Captain Successfully LoggedIn",
      ),
    );
});

const capatainProfile = asyncHandler(async (req, res) => {
  const Profile = await Captain.findById(req.captain?._id).select("-password");

  if (!Profile) {
    throw new ApiError(400, "Unable to load Profile");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { Profile }, "captain Details successfully fetched"),
    );
});

const captainLogout = asyncHandler(async (req, res) => {
  //todo:verify captain
  //token:undefined from database
  //clearcookie

  const captain = await Captain.findByIdAndUpdate(
    req.captain?._id,
    {
      $set: {
        token: undefined,
      },
    },
    {
      new: true,
    },
  );

  if (!captain) {
    throw new ApiError(401, "Can't able to Logout");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "Successfully Logged Out"));
});

export { captainRegister, captainLogin, capatainProfile, captainLogout };
