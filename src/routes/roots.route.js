import { Router } from "express";
import router from "./auth.routes";
import userRouter from "./auth.routes"
const router = Router();
router.use('/user',userRouter);
export default router;