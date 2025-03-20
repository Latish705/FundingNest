import mongoose, { Schema, Document } from "mongoose";

export interface IBidReq extends Document {
  startupId: string;
  bidAmount: number;
  equity: number;
  userId: string;
  expire: Date;
}

const bidReqSchema: Schema = new Schema({
  startupId: { type: Schema.Types.ObjectId, ref: "Startup", required: true },
  bidAmount: { type: Number, required: true },
  equity: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  expire: { type: Date, required: true },
});

const BidReq = mongoose.model<IBidReq>("BidReq", bidReqSchema);

export default BidReq;
