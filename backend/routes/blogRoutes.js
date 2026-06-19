import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  getPublicBlogs,
  getPublicBlog,
  updateBlog,
  updateBlogStatus
} from "../controllers/blogController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.get("/public/blogs", asyncHandler(getPublicBlogs));
router.get("/public/blogs/:slug", asyncHandler(getPublicBlog));
router.get("/admin/blogs", protectAdmin, asyncHandler(getBlogs));
router.post("/admin/blogs", protectAdmin, asyncHandler(createBlog));
router.get("/admin/blogs/:id", protectAdmin, asyncHandler(getBlog));
router.put("/admin/blogs/:id", protectAdmin, asyncHandler(updateBlog));
router.delete("/admin/blogs/:id", protectAdmin, asyncHandler(deleteBlog));
router.patch("/admin/blogs/:id/status", protectAdmin, asyncHandler(updateBlogStatus));

export default router;
