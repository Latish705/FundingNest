import { Request, Response } from "express";
import Bid from "../../biding/models/bidModel";
import User from "../models/userModel";
import UserInvestment from "../models/userInvestment";

export const getAllBids = async (req: Request, res: Response): Promise<any> => {
  try {
    // @ts-ignore
    const user = req.user;

    const bids = await Bid.find();
    return res.status(200).json({ success: true, bids });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getBidById = async (req: Request, res: Response): Promise<any> => {
  try {
    // @ts-ignore
    const user = req.user;

    const { id } = req.params;

    const bid = await Bid.findById(id);

    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    return res.status(200).json({ success: true, bid });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const addBidReq = async (req: Request, res: Response): Promise<any> => {
  try {
    // @ts-ignore
    const user = req.user;
    const { startupId, bidAmount, equity, startDate, endDate } = req.body;

    const bid = new Bid({
      startupId,
      bidAmount,
      equity,
      startDate,
      endDate,
    });

    await bid.save();

    return res.status(201).json({ success: true, bid });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getPortfolio = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // @ts-ignore
    const user = req.user;

    const dbUser = await User.findOne({ uid: user.uid });

    const investments = await UserInvestment.find({
      userId: dbUser?._id,
    }).populate("startupId");

    return res.status(200).json({ success: true, investments });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
