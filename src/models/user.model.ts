import mongoose, { Document, Schema } from "mongoose";
import { IModelDocumentMetas } from "../types/meta";

export interface IUser extends IModelDocumentMetas {
  name: string;
  surname: string;
  password: string;
  email: string;
  phone: string;
  role: string;
}

export const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", UserSchema);
