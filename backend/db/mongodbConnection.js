import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to mongoDB...");
  } catch (error) {
    console.log("Error connecting to mongoDB", error.message);
  }
};


export default connectToMongoDB