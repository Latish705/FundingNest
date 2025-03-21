import express from "express";
import { isFirstLogin, register, login, getAllStartups, getStartupById } from "../controller/authController";
import { queryRunner } from "../controller/queryController";

const userrouter = express.Router();

// User Routes
userrouter.get("/first-login", isFirstLogin);
userrouter.post("/register", register);
userrouter.post("/login", login);

// Startup Routes
userrouter.get("/startups", getAllStartups);
userrouter.get("/startups/:id", getStartupById);

// Query Route
userrouter.post("/query", queryRunner);

export default userrouter;
