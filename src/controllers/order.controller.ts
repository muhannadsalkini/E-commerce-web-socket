import { Request, Response } from "express";
import { Order } from "../models/order.model";
import { Variant } from "../models/variant.model";
import { User } from "../models/users.model";

// Place an order
export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { variants, total } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User ID not found in request" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if variants exist
    const existingVariants = await Variant.find({ _id: { $in: variants } });
    if (existingVariants.length !== variants.length) {
      return res.status(400).json({ message: "Invalid variants in the order" });
    }

    const newOrder = new Order({
      userId,
      variants,
      total,
      status: "pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", savedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order (status)
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order updated successfully", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List all orders of the user
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User ID not found in request" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userOrders = await Order.find({ userId }).populate("variants");
    res
      .status(200)
      .json({ message: "Orders fetched successfully", userOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single order
export const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("variants");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order found", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
