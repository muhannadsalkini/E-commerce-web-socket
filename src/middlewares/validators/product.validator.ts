import { body, param, query, validationResult } from "express-validator";

import { Request, Response, NextFunction } from "express";

// Validation rules for creating a product
export const createProductValidator = [
  body("name").isString().isLength({ min: 1 }).withMessage("Name is required."),

  body("description")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Description is required."),

  body("category")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Category is required."),

  body("brand")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Brand is required."),

  body("weight").optional().isNumeric().withMessage("Weight must be a number."),

  body("dimensions")
    .optional()
    .isObject()
    .withMessage("Dimensions must be an object.")
    .custom((value) => {
      if (value.length < 1 || value.width < 1 || value.height < 1) {
        throw new Error(
          "Dimensions must contain positive numbers for length, width, and height."
        );
      }
      return true;
    }),
];

// Validation rules for updating a product
export const updateProductValidator = [
  body("name")
    .optional()
    .isString()
    .isLength({ min: 1 })
    .withMessage("Name must be a non-empty string."),

  body("description")
    .optional()
    .isString()
    .isLength({ min: 1 })
    .withMessage("Description must be a non-empty string."),

  body("category")
    .optional()
    .isString()
    .isLength({ min: 1 })
    .withMessage("Category must be a non-empty string."),

  body("brand")
    .optional()
    .isString()
    .isLength({ min: 1 })
    .withMessage("Brand must be a non-empty string."),

  body("weight").optional().isNumeric().withMessage("Weight must be a number."),

  body("dimensions")
    .optional()
    .isObject()
    .withMessage("Dimensions must be an object.")
    .custom((value) => {
      if (value.length < 1 || value.width < 1 || value.height < 1) {
        throw new Error(
          "Dimensions must contain positive numbers for length, width, and height."
        );
      }
      return true;
    }),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation rules for getting a single product
export const getSingleProductValidator = [
  param("id").isMongoId().withMessage("Product ID must be a valid MongoDB ID."),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
