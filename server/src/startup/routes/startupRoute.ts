import { Router } from "express";
import { verifyToken } from "../../middleware/auth";
import {
  createStartup,
  getAllStartups,
  getStartupById,
  updateStartup,
  deleteStartup
} from "../controller/startupController";

const startupRouter = Router();

// Public routes
startupRouter.get("/", getAllStartups);
startupRouter.get("/:id", getStartupById);

// Protected routes
startupRouter.post("/create", verifyToken, createStartup);
startupRouter.put("/:id", verifyToken, updateStartup);
startupRouter.delete("/:id", verifyToken, deleteStartup);

export default startupRouter;