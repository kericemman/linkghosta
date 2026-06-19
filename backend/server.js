import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || "127.0.0.1";

async function startServer() {
  const required = ["MONGODB_URI", "JWT_SECRET", "CLIENT_URL"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  if (process.env.NODE_ENV === "production" && process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters in production");
  }

  await connectDB();

  const server = app.listen(PORT, HOST, () => {
    console.log(`LinkGhosta API listening at http://${HOST}:${PORT}`);
  });

  async function shutdown(signal) {
    console.log(`${signal} received; shutting down gracefully.`);
    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10000).unref();
  }

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
