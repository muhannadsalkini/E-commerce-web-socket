import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

// Helper function to check if a value is a valid ObjectId
const isValidObjectId = (value: string) =>
  mongoose.Types.ObjectId.isValid(value);

// Place order validator
export const placeOrderValidator = [
  body("variants")
    .isArray({ min: 1 })
    .withMessage("Variants must be an array with at least one item")
    .custom((variants) => {
      if (!Array.isArray(variants)) return false;
      for (const variant of variants) {
        if (!isValidObjectId(variant)) {
          throw new Error("All variant IDs must be valid ObjectIds");
        }
      }
      return true;
    })
    .withMessage("Invalid variant ID(s)"),
  body("total").isNumeric().withMessage("Total must be a valid number"),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Update order validator
export const updateOrderValidator = [
  param("id")
    .custom((value) => isValidObjectId(value))
    .withMessage("Invalid order ID"),
  body("status")
    .isIn(["pending", "shipped", "delivered", "canceled"])
    .withMessage(
      "Status must be one of the following: pending, shipped, delivered, canceled"
    ),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Get single order validator
export const getSingleOrderValidator = [
  param("id")
    .custom((value) => isValidObjectId(value))
    .withMessage("Invalid order ID"),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
