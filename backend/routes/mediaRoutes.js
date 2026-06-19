import { Router } from "express";
import {
  createMediaAsset,
  deleteMediaAsset,
  getMediaAsset,
  getMediaAssets,
  updateMediaAsset
} from "../controllers/mediaController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { compressUploadedImage, upload } from "../middleware/uploadMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.get("/admin/media", protectAdmin, asyncHandler(getMediaAssets));
router.post("/admin/media", protectAdmin, upload.single("file"), compressUploadedImage, asyncHandler(createMediaAsset));
router.get("/admin/media/:id", protectAdmin, asyncHandler(getMediaAsset));
router.put("/admin/media/:id", protectAdmin, asyncHandler(updateMediaAsset));
router.delete("/admin/media/:id", protectAdmin, asyncHandler(deleteMediaAsset));

export default router;
