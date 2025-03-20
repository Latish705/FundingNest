import { Request, Response } from "express";
import User from "../models/userModel";
import Startup from "../../startup/models/startupModel";
import Bid from "../../biding/models/bidModel";

export const isFirstLogin = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    //@ts-ignore
    const user = req.user;

    const dbUser = await User.find({ uid: user.uid });
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
    const { name, phone, interests } = req.body;

    const requiredFields = ["name", "phone", "interests"];

    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    const newUser = new User({
      name,
      phone,
      interests,
      uid: user.uid,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    //@ts-ignore
    const user = req.user;

    const dbUser = await User.find({ uid: user.uid });
    if (dbUser.length === 0) {
      return res.status(401).json({ message: "User not found" });
    } else {
      return res.status(200).json({ success: true });
    }
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllStartups = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // @ts-ignore
    const user = req.user;

    const startups = await Startup.find();
    return res.status(200).json({ success: true, startups });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getStartupById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // @ts-ignore
    const user = req.user;

    const { id } = req.params;

    const startup = await Startup.findById(id);

    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    return res.status(200).json({ success: true, startup });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
