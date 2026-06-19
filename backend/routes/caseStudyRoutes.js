import { Router } from "express";
import {
  createCaseStudy,
  deleteCaseStudy,
  getCaseStudies,
  getCaseStudy,
  getPublicCaseStudies,
  getPublicCaseStudy,
  updateCaseStudy,
  updateCaseStudyStatus
} from "../controllers/caseStudyController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = Router();

router.get("/public/case-studies", asyncHandler(getPublicCaseStudies));
router.get("/public/case-studies/:slug", asyncHandler(getPublicCaseStudy));
router.get("/admin/case-studies", protectAdmin, asyncHandler(getCaseStudies));
router.post("/admin/case-studies", protectAdmin, asyncHandler(createCaseStudy));
router.get("/admin/case-studies/:id", protectAdmin, validateObjectId(), asyncHandler(getCaseStudy));
router.put("/admin/case-studies/:id", protectAdmin, validateObjectId(), asyncHandler(updateCaseStudy));
router.delete("/admin/case-studies/:id", protectAdmin, validateObjectId(), asyncHandler(deleteCaseStudy));
router.patch("/admin/case-studies/:id/status", protectAdmin, validateObjectId(), asyncHandler(updateCaseStudyStatus));

export default router;
