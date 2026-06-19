import { Router } from "express";
import { getSiteContent, updateSiteContent } from "../controllers/siteContentController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();
router.get("/site-content", asyncHandler(getSiteContent));
router.put("/site-content", protectAdmin, asyncHandler(updateSiteContent));
export default router;
