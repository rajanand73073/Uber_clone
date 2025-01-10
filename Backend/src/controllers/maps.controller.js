import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Location } from "../services/maps.service.js";

const getCoordinates = asyncHandler(async (req, res) => {
  const { address } = req.query;

  const location = await Location(address);

  console.log(location);

  if (!location) {
    throw new ApiError(401, "please enter valid address");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, location, "Loaction Found successfully"));
});

export { getCoordinates };
