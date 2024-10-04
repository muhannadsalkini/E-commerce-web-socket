import mongoose from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  category: string;
  brand: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
}

export const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    weight: { type: Number },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
