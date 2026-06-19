import { Router } from "express";
import { getCurrentAdmin, loginAdmin, logoutAdmin } from "../controllers/authController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.post("/admin/auth/login", asyncHandler(loginAdmin));
router.get("/admin/auth/me", protectAdmin, getCurrentAdmin);
router.post("/admin/auth/logout", logoutAdmin);

export default router;
