import mongoose, { Schema, Document } from "mongoose";

export interface IBid extends Document {
  startupId: string;
  bidAmount: number;
  equity: number;
  startDate: Date;
  endDate: Date;
  status: boolean; // true: accepted, false: rejected
}

const bidSchema: Schema = new Schema({
  startupId: { type: Schema.Types.ObjectId, ref: "Startup", required: true },
  bidAmount: { type: Number, required: true },
  equity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: Boolean, required: true },
});

const Bid = mongoose.model<IBid>("Bid", bidSchema);

export default Bid;
