import { Router } from "express";
import {
  addServiceRequestNote,
  deleteServiceRequest,
  getServiceRequest,
  getServiceRequests,
  submitServiceRequest,
  updateServiceRequestStatus
} from "../controllers/serviceRequestController.js";
import asyncHandler from "../utils/asyncHandler.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/public/service-requests", asyncHandler(submitServiceRequest));
router.get("/admin/service-requests", protectAdmin, asyncHandler(getServiceRequests));
router.get("/admin/service-requests/:id", protectAdmin, asyncHandler(getServiceRequest));
router.patch("/admin/service-requests/:id/status", protectAdmin, asyncHandler(updateServiceRequestStatus));
router.patch("/admin/service-requests/:id/notes", protectAdmin, asyncHandler(addServiceRequestNote));
router.delete("/admin/service-requests/:id", protectAdmin, asyncHandler(deleteServiceRequest));

export default router;
