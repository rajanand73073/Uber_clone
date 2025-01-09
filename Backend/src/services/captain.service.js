import { Captain } from "../models/captain.model.js";
import { ApiError } from "../utils/ApiError.js";

export const createCaptain = async ({
  email,
  firstname,
  lastname,
  password,color, plate, capacity, vehicleType
}) => {
  if (!email || !password || !firstname) {
    throw new ApiError(401, "All fields are required");
  }

  const existingUser = await Captain.findOne({ email: email });
  if (existingUser) {
    throw new ApiError(4011, "Captain already exists");
  }

const captain = await Captain.create({
    fullname:{
    firstname,
    lastname,
    },
    email,
    password,
    vehicle:
    {
        plate,
        color,
        capacity,
        vehicleType
    }
})
return captain

};
