import Admin from "../models/Admin.js";
import { generateToken } from "../services/tokenService.js";
import ApiError from "../utils/ApiError.js";
import sendResponse from "../utils/sendResponse.js";

function safeAdmin(admin) {
  return {
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    lastLogin: admin.lastLogin
  };
}

export async function loginAdmin(req, res) {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;

  if (!email || !password) throw new ApiError("Email and password are required", 400);

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin || !admin.isActive || !(await admin.comparePassword(password))) {
    throw new ApiError("Invalid email or password", 401);
  }

  admin.lastLogin = new Date();
  await admin.save({ validateBeforeSave: false });

  const token = generateToken({ id: admin._id, role: admin.role });
  res.cookie("adminToken", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return sendResponse(res, 200, "Welcome back", { token, admin: safeAdmin(admin) });
}

export function getCurrentAdmin(req, res) {
  return sendResponse(res, 200, "Current admin", safeAdmin(req.admin));
}

export function logoutAdmin(req, res) {
  res.clearCookie("adminToken");
  return sendResponse(res, 200, "Logged out successfully");
}
