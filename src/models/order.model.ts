import mongoose from "mongoose";

export interface IOrder {
  userId: string;
  variants: mongoose.Types.ObjectId[];
  total: number;
  status: string;
}

export const OrderSchema = new mongoose.Schema<IOrder>(
  {
    userId: { type: String, required: true, ref: "User" },
    variants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Variant", required: true },
    ],
    total: { type: Number, required: true },
    status: { type: String, required: true, default: "pending" },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
