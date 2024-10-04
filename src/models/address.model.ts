import mongoose from "mongoose";

export interface IAddress {
  name: string;
  city: string;
  postcode: string;
  street: string;
  state: string;
  addressLine: string;
  type: string;
  userId: string;
}

export const AddressSchema = new mongoose.Schema<IAddress>(
  {
    userId: { type: String, required: true, ref: "User" },
    name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    street: { type: String, required: true },
    postcode: { type: String, required: true },
    addressLine: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Address = mongoose.model<IAddress>("Address", AddressSchema);
