import mongoose from "mongoose";

class Database {
  private static instance: Database;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGODB_URL!);
      //   console.log("MongoDB connected successfully");
    } catch (err) {
      console.error("Failed to connect to MongoDB", err.message);
      process.exit(1); // Exit the process with failure code
    }
  }
}

export default Database;
