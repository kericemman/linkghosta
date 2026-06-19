import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

async function seedAdmin() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.log("ADMIN_EMAIL and ADMIN_PASSWORD are required to seed an admin.");
    return;
  }

  await connectDB();

  const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });

  if (existingAdmin) {
    console.log("Admin already exists.");
    return;
  }

  await Admin.create({
    name: ADMIN_NAME || "Admin",
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD
  });

  console.log("Admin seed completed.");
}

seedAdmin()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
