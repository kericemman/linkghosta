import { Router } from "express";
import {
  addInquiryNote,
  deleteInquiry,
  getInquiries,
  getInquiry,
  submitContactInquiry,
  updateInquiryStatus
} from "../controllers/inquiryController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.post("/public/contact", asyncHandler(submitContactInquiry));
router.get("/admin/inquiries", protectAdmin, asyncHandler(getInquiries));
router.get("/admin/inquiries/:id", protectAdmin, asyncHandler(getInquiry));
router.patch("/admin/inquiries/:id/status", protectAdmin, asyncHandler(updateInquiryStatus));
router.patch("/admin/inquiries/:id/notes", protectAdmin, asyncHandler(addInquiryNote));
router.delete("/admin/inquiries/:id", protectAdmin, asyncHandler(deleteInquiry));

export default router;
