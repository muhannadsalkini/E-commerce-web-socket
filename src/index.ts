import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routers/index";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err.message);
  });

app.use("/api", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// TODO: Add an error handle middleware
// TODO: Add the order functionality
// TODO: Add the ports functionality for the live orders
// TODO: Add roles to the user
// TODO: Add user basket functionality
// TODO: Add integration for payment gateways (izyco or param iframe)
// TODO: Add email verification and password reset functionality
// TODO: Add user activity logs (login attempts, actions, etc.)
// TODO: Add sorting and filtering for products and orders
// TODO: Add address management for users (shipping addresses)
// TODO: Add review and rating system for products
// TODO: Add wishlist functionality for users
// TODO: Implement file upload validation (image size, file type checks)
