import { Router } from "express";
import { loginUser, register,getCurrentUser } from "../controllers/auth.controller.js";
import { authorizeUserRoles, verifyJWTToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(register)
router.route('/login').post(loginUser)
router.route('/me').get(verifyJWTToken,authorizeUserRoles(['USER']),getCurrentUser)
export default router;
