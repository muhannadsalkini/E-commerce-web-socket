import mongoose from "mongoose";

export interface IVariant extends mongoose.Document {
  productId: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "Product";
    required: true;
  };
  variantName: string;
  price: number;
  costPrice: number;
  discountPrice: number | null;
  image: string | null;
  status: string;
  stock: number;
}

export const VariantSchema = new mongoose.Schema<IVariant>(
  {
    productId: { type: String },
    price: { type: Number, required: true },
    costPrice: { type: Number, required: true },
    discountPrice: { type: Number },
    image: { type: String },
    status: { type: String, required: true, default: "active" },
    stock: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Variant = mongoose.model<IVariant>("Variant", VariantSchema);
