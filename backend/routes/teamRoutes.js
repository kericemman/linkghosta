import { Router } from "express";
import {
  createTeamMember,
  deleteTeamMember,
  getPublicTeam,
  getTeamMember,
  getTeamMembers,
  updateTeamMember
} from "../controllers/teamController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.get("/public/team", asyncHandler(getPublicTeam));
router.get("/admin/team", protectAdmin, asyncHandler(getTeamMembers));
router.post("/admin/team", protectAdmin, asyncHandler(createTeamMember));
router.get("/admin/team/:id", protectAdmin, asyncHandler(getTeamMember));
router.put("/admin/team/:id", protectAdmin, asyncHandler(updateTeamMember));
router.delete("/admin/team/:id", protectAdmin, asyncHandler(deleteTeamMember));

export default router;
