import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err.message);
  });

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json("hello world!");
  } catch (error) {
    next(error);
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});
