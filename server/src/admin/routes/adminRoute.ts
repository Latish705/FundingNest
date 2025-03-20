import { Router } from "express";
import { isFirstLogin } from "../controller/authController";

const adminRouter = Router();

adminRouter.post("/isFirstLogin", isFirstLogin);
adminRouter.post("/register", isFirstLogin);

export default adminRouter;
