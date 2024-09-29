import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const signupValidator = [
  body("name")
    .isString()
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must be between 2 and 30 characters long."),

  body("surname")
    .isString()
    .isLength({ min: 2, max: 30 })
    .withMessage("Surname must be between 2 and 30 characters long."),

  body("email").isEmail().withMessage("Email must be a valid email address."),

  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),

  body("phone")
    .optional()
    .isString()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 characters long."),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

export const loginValidator = [
  body("email").isEmail().withMessage("Email must be a valid email address."),

  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];
