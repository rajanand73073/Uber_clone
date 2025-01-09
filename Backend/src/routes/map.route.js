import { Router } from "express";
import {query} from "express-validator";
import { verifyJWTCaptain, verifyJwtUser } from "../middleware/authmiddleware.js";
import { getCoordinates } from "../controllers/maps.controller.js";


const router = Router()



router.route("/get-coordinates").get(
    query('address').isString().isLength({ min: 3 }),
    verifyJwtUser,
    getCoordinates
)

// router.get('/get-coordinates',
//     query('address').isString().isLength({ min: 3 }),
//     authMiddleware.authUser,
//     mapController.getCoordinates
// );


export default router