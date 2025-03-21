import { Router } from "express";
import { verifyToken } from "../../middleware/auth";
import {
  createInvestment,
  getUserInvestments,
  getAllInvestments,
  approveInvestment,
  rejectInvestment
} from "../controller/investmentController";

const investmentRouter = Router();

// Protected routes
investmentRouter.post("/create", verifyToken, createInvestment);
investmentRouter.get("/user", verifyToken, getUserInvestments);
investmentRouter.get("/all", verifyToken, getAllInvestments);
investmentRouter.put("/approve/:id", verifyToken, approveInvestment);
investmentRouter.put("/reject/:id", verifyToken, rejectInvestment);

export default investmentRouter;