import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, access denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    req.userId = (decoded as any).userId;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please log in again" });
    }
    return res.status(401).json({ message: "Invalid token, access denied" });
  }
};
