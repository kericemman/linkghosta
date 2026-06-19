import { Router } from "express";
import { getDashboardOverview } from "../controllers/dashboardController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.get("/admin/dashboard", protectAdmin, asyncHandler(getDashboardOverview));

export default router;
