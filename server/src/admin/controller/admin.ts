import Admin from "../models/adminModel";

import { Request, Response } from "express";
import Anomaly from "../models/anamolyModel";

export const assignAnomaly = async (req: Request, res: Response) => {
  try {
    const { cfaId, anamolyId } = req.body;

    const cfa = await Admin.findById(cfaId);
    if (!cfa) {
      return res.status(404).json({ message: "Cfa not found" });
    }

    const anomaly = await Anomaly.findById(anamolyId);
    if (!anomaly) {
      return res.status(404).json({ message: "Anomaly not found" });
    }

    anomaly.assignedTo = cfaId;
    await anomaly.save();

    console.log("Anomaly assigned to CFA");
    return res
      .status(200)
      .json({ success: true, message: "Anomaly assigned to CFA" });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
