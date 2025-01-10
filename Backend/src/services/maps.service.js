import { ApiError } from "../utils/ApiError.js";
import axios from "axios";

export const Location = async (address) => {
  const apikey = process.env.GOOGLE_MAP_API;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`;

  try {
    const response = await axios.get(url);
    console.log("response", response);

    if (response.data.status === "OK") {
      console.log("response", response.data);

      const location = response.data;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error("error", error.message);
  }
};
