import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const userCreate = async ({ email, password, firstname, lastname }) => {
  if (!email || !password || !firstname) {
    throw new ApiError(401, "All fields are required");
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    throw new ApiError(4011, "User already exists");
  }

  const user = await User.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};
