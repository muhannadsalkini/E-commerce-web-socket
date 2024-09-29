import mongoose from "mongoose";

export interface IModelDocumentMetas extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  __t: string;
  timestamps: boolean;
}

export interface IModelUserMetas extends IModelDocumentMetas {
  lastLogin: Date;
  // Will be add pasword reset link and other metas
}
