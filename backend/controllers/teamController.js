import TeamMember from "../models/TeamMember.js";
import ApiError from "../utils/ApiError.js";
import sendResponse from "../utils/sendResponse.js";

export async function getPublicTeam(req, res) {
  const items = await TeamMember.find({ status: "published" }).sort({ order: 1, createdAt: 1 }).lean();
  return sendResponse(res, 200, "Published team", items);
}

export async function getTeamMembers(req, res) {
  const items = await TeamMember.find().sort({ order: 1, updatedAt: -1 }).lean();
  return sendResponse(res, 200, "Team members", items);
}

export async function createTeamMember(req, res) {
  const item = await TeamMember.create({ ...req.body, createdBy: req.admin._id, updatedBy: req.admin._id });
  return sendResponse(res, 201, "Team member created", item);
}

export async function getTeamMember(req, res) {
  const item = await TeamMember.findById(req.params.id).lean();
  if (!item) throw new ApiError("Team member not found", 404);
  return sendResponse(res, 200, "Team member", item);
}

export async function updateTeamMember(req, res) {
  const item = await TeamMember.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedBy: req.admin._id, publishedAt: req.body.status === "published" ? new Date() : undefined },
    { new: true, runValidators: true }
  );
  if (!item) throw new ApiError("Team member not found", 404);
  return sendResponse(res, 200, "Team member updated", item);
}

export async function deleteTeamMember(req, res) {
  const item = await TeamMember.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError("Team member not found", 404);
  return sendResponse(res, 200, "Team member deleted");
}
