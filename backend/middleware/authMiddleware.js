import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyToken } from "../services/tokenService.js";
import Admin from "../models/Admin.js";

export const protectAdmin = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : req.cookies?.adminToken;

  if (!token) {
    throw new ApiError("Authentication required", 401);
  }

  const decoded = verifyToken(token);
  const admin = await Admin.findById(decoded.id).select("-password");

  if (!admin || !admin.isActive) {
    throw new ApiError("Authentication required", 401);
  }

  req.admin = admin;
  next();
});

export function requireRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.admin?.role)) {
      return next(new ApiError("Permission denied", 403));
    }

    return next();
  };
}
