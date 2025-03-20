import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  phone: string;
  interests: string[];
  uid: string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  interests: { type: [String], required: true },
  uid: { type: String, required: true, unique: true },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
