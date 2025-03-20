import { Request, Response } from "express";
import User from "../../user/models/userModel";
import Startup from "../models/startupModel";
import Bid from "../../biding/models/bidModel";

export const isFirstLogin = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    //@ts-ignore
    const user = req.user;

    const dbUser = await Startup.find({ uid: user.uid });
    if (dbUser.length === 0) {
      return res.status(200).json({ success: true, firstLogin: true });
    } else {
      return res.status(200).json({ success: true, firstLogin: false });
    }
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    //@ts-ignore
    const user = req.user;
    const { name, description, founder, foundedIn, funding, investors, tags } =
      req.body;

    const requiredFields = [
      "name",
      "description",
      "founder",
      "foundedIn",
      "funding",
      "investors",
      "tags",
    ];

    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    const newUser = new Startup({
      name,
      description,
      founder,
      foundedIn,
      funding,
      investors,
      tags,
    });
    newUser.save();

    return res.status(201).json({ success: true, newUser });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    //@ts-ignore
    const user = req.user;

    const dbStartup = await Startup.find({ uid: user.uid });
    if (dbStartup.length === 0) {
      return res.status(401).json({ message: "User not found" });
    } else {
      return res.status(200).json({ success: true });
    }
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const startBid = async (req: Request, res: Response): Promise<any> => {
  try {
    //@ts-ignore
    const user = req.user;
    const { startupId, bidAmount, equity, startDate, endDate } = req.body;

    const bid = new Bid({
      startupId,
      bidAmount,
      equity,
      startDate,
      endDate,
      status: "pending",
    });

    await bid.save();

    return res.status(201).json({ success: true, bid });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
