import { Request, Response } from "express";

export const queryRunner = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // @ts-ignore
    const user = req.user;

    const { query } = req.body;

    const result = await query;

    return res.status(200).json({ success: true, result });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
