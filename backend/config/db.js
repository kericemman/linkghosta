import mongoose from "mongoose";

export default async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI is not configured. Skipping MongoDB connection.");
    return null;
  }

  const connection = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB connected: ${connection.connection.host}`);
  return connection;
}
