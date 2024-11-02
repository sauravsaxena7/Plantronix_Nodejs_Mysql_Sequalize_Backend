import { Router } from "express";
import { loginUser, register } from "../controllers/auth.controller.js";

const router = Router();

router.route('/register').post(register)
router.route('/login').post(loginUser)
export default router;
