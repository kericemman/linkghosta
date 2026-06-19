import { Router } from "express";
import {
  deleteSubscriber,
  getSubscribers,
  subscribe,
  unsubscribe,
  updateSubscriberStatus
} from "../controllers/subscriberController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import validateObjectId from "../middleware/validateObjectId.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.post("/public/subscribers", asyncHandler(subscribe));
router.post("/public/subscribers/unsubscribe/:token", asyncHandler(unsubscribe));
router.get("/admin/subscribers", protectAdmin, asyncHandler(getSubscribers));
router.patch("/admin/subscribers/:id/status", protectAdmin, validateObjectId(), asyncHandler(updateSubscriberStatus));
router.delete("/admin/subscribers/:id", protectAdmin, validateObjectId(), asyncHandler(deleteSubscriber));

export default router;
