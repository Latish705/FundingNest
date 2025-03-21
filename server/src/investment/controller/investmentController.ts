import { Request, Response } from "express";
import Investment from "../models/investmentModel";
import Startup from "../../startup/models/startupModel";
import User from "../../user/models/userModel";

export const createInvestment = async (req: Request, res: Response): Promise<any> => {
  try {
    // @ts-ignore
    const user = req.user;
    const { startupId, amount } = req.body;

    if (!startupId || !amount) {
      return res.status(400).json({ message: "Startup ID and amount are required" });
    }

    const startup = await Startup.findById(startupId);
    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    const dbUser = await User.findOne({ uid: user.uid });
    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate equity percentage (simplified example)
    const equity = (amount / startup.latest_post_money_valuation) * 100;

    const newInvestment = new Investment({
      userId: dbUser._id,
      startupId,
      investmentAmount: amount,
      equity,
      status: "pending"
    });

    await newInvestment.save();

    return res.status(201).json({ success: true, investment: newInvestment });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getUserInvestments = async (req: Request, res: Response): Promise<any> => {
  try {
    // @ts-ignore
    const user = req.user;

    const dbUser = await User.findOne({ uid: user.uid });
    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const investments = await Investment.find({ userId: dbUser._id }).populate("startupId");

    return res.status(200).json({ success: true, investments });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllInvestments = async (req: Request, res: Response): Promise<any> => {
  try {
    // @ts-ignore
    const user = req.user;

    // Check if user is admin
    const dbUser = await User.findOne({ uid: user.uid });
    if (!dbUser || dbUser.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const investments = await Investment.find().populate("startupId").populate("userId");

    return res.status(200).json({ success: true, investments });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const approveInvestment = async (req: Request, res: Response): Promise<any> => {
  try {
    // @ts-ignore
    const user = req.user;
    const { id } = req.params;

    // Check if user is admin
    const dbUser = await User.findOne({ uid: user.uid });
    if (!dbUser || dbUser.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const investment = await Investment.findById(id);
    if (!investment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    investment.status = "approved";
    await investment.save();

    return res.status(200).json({ success: true, investment });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const rejectInvestment = async (req: Request, res: Response): Promise<any> => {
  try {
    // @ts-ignore
    const user = req.user;
    const { id } = req.params;

    // Check if user is admin
    const dbUser = await User.findOne({ uid: user.uid });
    if (!dbUser || dbUser.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const investment = await Investment.findById(id);
    if (!investment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    investment.status = "rejected";
    await investment.save();

    return res.status(200).json({ success: true, investment });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};