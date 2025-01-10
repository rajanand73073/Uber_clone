import { Router } from "express";
import { body } from "express-validator";
const router = Router();
import { CreateRide, fare } from "../controllers/ride.controller.js";
import { verifyJwtUser } from "../middleware/authmiddleware.js";

router
  .route("/rideBooking")
  .post(
    verifyJwtUser,
    body("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid pickup address"),
    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid destination address"),
    body("vehicleType")
      .isString()
      .isIn(["auto", "car", "moto"])
      .withMessage("Invalid vehicle type"),
    CreateRide,
  );

router.route("/getfare").get(verifyJwtUser, fare);

export default router;
