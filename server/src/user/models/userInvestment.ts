import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./userModel";
import { IStartup } from "../../startup/models/startupModel";

export interface IUserInvestment extends Document {
  userId: IUser["_id"];
  investmentAmount: number;
  equity: number;
  startupId: IStartup["_id"];
}

const userInvestmentSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  investmentAmount: { type: Number, required: true },
  equity: { type: Number, required: true },
  startupId: { type: Schema.Types.ObjectId, ref: "Startup", required: true },
});

const UserInvestment = mongoose.model<IUserInvestment>(
  "UserInvestment",
  userInvestmentSchema
);

export default UserInvestment;
