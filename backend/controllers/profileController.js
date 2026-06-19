import Admin from "../models/Admin.js";
import ApiError from "../utils/ApiError.js";
import sendResponse from "../utils/sendResponse.js";

export function getAdminProfile(req, res) {
  return sendResponse(res, 200, "Admin profile", req.admin);
}

export async function updateAdminProfile(req, res) {
  const name = req.body.name?.trim();
  const email = req.body.email?.trim().toLowerCase();
  if (!name || !email) throw new ApiError("Name and email are required", 400);
  const duplicate = await Admin.exists({ email, _id: { $ne: req.admin._id } });
  if (duplicate) throw new ApiError("Email is already in use", 409);
  const admin = await Admin.findByIdAndUpdate(req.admin._id, { name, email }, { new: true, runValidators: true });
  return sendResponse(res, 200, "Profile updated", admin);
}

export async function changeAdminPassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 8) throw new ApiError("Use a new password with at least 8 characters", 400);
  const admin = await Admin.findById(req.admin._id).select("+password");
  if (!(await admin.comparePassword(currentPassword))) throw new ApiError("Current password is incorrect", 400);
  admin.password = newPassword;
  await admin.save();
  return sendResponse(res, 200, "Password changed successfully");
}
