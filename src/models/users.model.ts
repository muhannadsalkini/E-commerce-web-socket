import mongoose, { Document, Schema } from "mongoose";
import { IModelDocumentMetas } from "../types/meta";

export interface IUser extends IModelDocumentMetas {
  name: string;
  surname: string;
  password: string;
  email: string;
  phone: string;
}

export const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  timestamps: true,
});

export const User = mongoose.model<IUser>("User", UserSchema);
