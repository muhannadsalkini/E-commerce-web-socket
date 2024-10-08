import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-validator";

(err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
};

export const errorHandler = (
  err: Error, //| ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  // Handle validation errors
  //   if (err instanceof ValidationError) {
  //     return res.status(400).json({
  //       message: "Validation Error",
  //       errors: err.errors, // Display the array of validation errors
  //     });
  //   }

  // Handle MongoDB cast errors (invalid object IDs)
  //   if (err.name === "CastError") {
  //     return res.status(400).json({
  //       message: `Invalid ${err.path}: ${err.value}`,
  //     });
  //   }

  // Handle duplicate key errors (e.g., unique fields in MongoDB)
  if (err.name === "MongoError" && (err as any).code === 11000) {
    return res.status(409).json({
      message: "Duplicate key error",
      error: err.message,
    });
  }

  // Custom application errors
  if (err.name === "AppError") {
    return res.status((err as any).statusCode || 500).json({
      message: err.message,
    });
  }

  // Default to 500 server error
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
};
