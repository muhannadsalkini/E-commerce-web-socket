import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Validator for creating a new user
export const validateCreateUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),

  body("surname")
    .trim()
    .notEmpty()
    .withMessage("Surname is required")
    .isLength({ min: 2 })
    .withMessage("Surname must be at least 2 characters long"),

  body("email").isEmail().withMessage("Invalid email format"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\d+$/)
    .withMessage("Phone number must contain only digits")
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 to 15 digits long"),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for updating a user
export const validateUpdateUser = [
  param("id").isMongoId().withMessage("Invalid user ID format"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),

  body("surname")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Surname must be at least 2 characters long"),

  body("email").optional().isEmail().withMessage("Invalid email format"),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("phone")
    .optional()
    .trim()
    .matches(/^\d+$/)
    .withMessage("Phone number must contain only digits")
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 to 15 digits long"),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for getting a user by ID
export const validateGetUserById = [
  param("id").isMongoId().withMessage("User ID must be a valid MongoDB ID."),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
