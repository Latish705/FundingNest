import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  uid: string;
  role: string;
}

const AdminSchema: Schema = new Schema({
  name: { type: String, required: true },
  uid: { type: String, required: true },
  // hte role can be admin or cfa
  role: { type: String, required: true },
});

const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin;
