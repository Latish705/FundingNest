import mongoose, { Schema, Mongoose } from "mongoose";

export interface IStartup extends Document {
  _id: string;
  name: string;
  description: string;
  founder: string;
  foundedIn: Date;
  funding: number;
  investors: string[];
  tags: string[];
}

const startupSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  founder: { type: String, required: true },
  foundedIn: { type: Date, required: true },
  funding: { type: Number, required: true },
  investors: { type: [String], required: true },
  tags: { type: [String], required: true },
});

const Startup = mongoose.model<IStartup>("Startup", startupSchema);

export default Startup;
