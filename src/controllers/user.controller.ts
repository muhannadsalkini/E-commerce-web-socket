import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { Address } from "../models/address.model";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, surname, password, email, phone } = req.body;

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      surname,
      password: hashedPassword,
      email,
      phone,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        surname: savedUser.surname,
        email: savedUser.email,
        phone: savedUser.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read (get) a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User found",
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, surname, password, email, phone } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the password if it is being updated
    let updatedPassword = user.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedPassword = await bcrypt.hash(password, salt);
    }

    user.name = name || user.name;
    user.surname = surname || user.surname;
    user.password = updatedPassword;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        surname: updatedUser.surname,
        email: updatedUser.email,
        phone: updatedUser.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const users = await User.find()
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const totalUsers = await User.countDocuments();

    res.status(200).json({
      message: "Users found",
      users: users.map((user) => ({
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
      })),
      totalPages: Math.ceil(totalUsers / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Address

// Create a new address
export const addAddress = async (req: Request, res: Response) => {
  try {
    const { name, city, postcode, street, state, addressLine, type } = req.body;
    const userId = req.userId;

    const newAddress = new Address({
      name,
      city,
      postcode,
      street,
      state,
      addressLine,
      type,
      userId,
    });

    const savedAddress = await newAddress.save();
    res
      .status(201)
      .json({ message: "Address added successfully", address: savedAddress });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add address", error: error.message });
  }
};

// Update an existing address
export const updateAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const updatedData = req.body;

    // Check if the address belongs to the user
    const address = await Address.findOne({ _id: id, userId });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    Object.assign(address, updatedData); // Update the address fields
    const updatedAddress = await address.save();

    res
      .status(200)
      .json({
        message: "Address updated successfully",
        address: updatedAddress,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update address", error: error.message });
  }
};

// Get a single address by its ID (owned by the current user)
export const getAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const address = await Address.findOne({ _id: id, userId });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res
      .status(200)
      .json({ message: "Address retrieved successfully", address });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve address", error: error.message });
  }
};

// Get all addresses for the current user
export const getAllAddresses = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const addresses = await Address.find({ userId });

    res
      .status(200)
      .json({ message: "Addresses retrieved successfully", addresses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve addresses", error: error.message });
  }
};

// Delete an address by its ID (owned by the current user)
export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const address = await Address.findOneAndDelete({ _id: id, userId });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete address", error: error.message });
  }
};
