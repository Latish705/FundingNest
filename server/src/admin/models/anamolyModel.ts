import mongoose, { Schema, Document } from "mongoose";

export interface IAnamoly extends Document {
  startupId: string;
  reason: string;

  assignedTo: string;
  status: string;
}

const AnamolySchema: Schema = new Schema({
  startupId: { type: String, required: true },
  reason: { type: String, required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: "Admin" },
  status: { type: String, required: true },
});

const Anamoly = mongoose.model<IAnamoly>("Anamoly", AnamolySchema);

export default Anamoly;
