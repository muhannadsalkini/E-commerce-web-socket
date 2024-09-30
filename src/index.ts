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
