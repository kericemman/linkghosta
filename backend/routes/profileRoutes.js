import { Router } from "express";
import { changeAdminPassword, getAdminProfile, updateAdminProfile } from "../controllers/profileController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.get("/admin/profile", protectAdmin, getAdminProfile);
router.put("/admin/profile", protectAdmin, asyncHandler(updateAdminProfile));
router.patch("/admin/profile/password", protectAdmin, asyncHandler(changeAdminPassword));

export default router;
