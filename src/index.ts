import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import router from "./routers/index";
import Database from "./services/db.service";
import { errorHandler } from "./middlewares/errorHandler.middleware";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const dbService = Database.getInstance();

// Connect to the database and start the server
dbService
  .connect()
  .then(() => {
    // Use your routes only after successful DB connection
    app.use("/api", router);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the process
  });

app.use(errorHandler);

// TODO: Implement the order functionality
// TODO: Implement the ports functionality for the live orders
// TODO: Add roles to the user
// TODO: Implement user basket functionality
// TODO: Implement integration for payment gateways (izyco or param iframe)
// TODO: Implement email verification and password reset functionality
// TODO: Implement user activity logs (login attempts, actions, etc.)
// TODO: Implement sorting and filtering for products and orders
// TODO: Implement address management for users (shipping addresses)
// TODO: Implement review and rating system for products
// TODO: Implement wishlist functionality for users
// TODO: Implement file upload validation (image size, file type checks)
