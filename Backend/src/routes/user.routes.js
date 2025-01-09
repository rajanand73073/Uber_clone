import { Router } from "express";
import { body } from "express-validator";
const router = Router();
import { registerUser, loginUser 
,getUserProfile,loggoutUser
} from "../controllers/user.controller.js";
import {  verifyJwtUser } from "../middleware/authmiddleware.js";


router
  .route("/register")
  .post(
    [
      [
        body("email").isEmail().withMessage("Invalid Email"),
        body("fullname.firstname")
          .isLength({ min: 3 })
          .withMessage("First name must be at least 3 characters long"),

        body("password")
          .isLength({ min: 8 })
          .withMessage("Password must be at least 8 characters long"),
      ],
    ],
    registerUser
  );

router
  .route("/login")
  .post(
    [
      [
        body("email").isEmail().withMessage("Invalid Email"),

        body("password")
          .isLength({ min: 8 })
          .withMessage("Password must be at least 8 characters long"),
      ],
    ],
    loginUser
  );

router.route("/user-profile").get(verifyJwtUser,getUserProfile)

router.route("/logout").get(verifyJwtUser,loggoutUser)



export default router;
