import mongoose from "mongoose";

export interface IReview {
  stars: number;
  userId: string;
  orderId: string;
}

export const ReviewSchema = new mongoose.Schema<IReview>(
  {
    stars: { type: Number, required: true },
    userId: { type: String, required: true, ref: "User" },
    orderId: { type: String, required: true, ref: "Order" },
  },
  {
    timestamps: true,
  }
);

export const Review = mongoose.model<IReview>("Review", ReviewSchema);
