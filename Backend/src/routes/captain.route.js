import { Router } from "express";
import { captainRegister,captainLogin,capatainProfile ,captainLogout} from "../controllers/captain.controller.js";
import { body } from "express-validator";
import { verifyJWTCaptain } from "../middleware/authmiddleware.js";

const router = Router()


router.route("/captain-register").post([
    
          [
            body("email").isEmail().withMessage("Invalid Email"),
            body("fullname.firstname")
              .isLength({ min: 3 })
              .withMessage("First name must be at least 3 characters long"),
            body("password")
              .isLength({ min: 8 })
              .withMessage("Password must be at least 8 characters long"),
              body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
              body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
              body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
              body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')
 ],
],captainRegister)

router.route("/captain-login").post([
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
],captainLogin)


router.route("/captain-details").get(verifyJWTCaptain,capatainProfile)
router.route("/captain-logout").get(verifyJWTCaptain,captainLogout)


export default router