import CaseStudy from "../models/CaseStudy.js";
import ApiError from "../utils/ApiError.js";
import generateSlug from "../utils/generateSlug.js";
import sendResponse from "../utils/sendResponse.js";

async function uniqueSlug(value, excludeId) {
  const base = generateSlug(value) || `case-study-${Date.now()}`;
  let slug = base;
  let suffix = 2;
  while (await CaseStudy.exists({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) {
    slug = `${base}-${suffix++}`;
  }
  return slug;
}

export async function getPublicCaseStudies(req, res) {
  const items = await CaseStudy.find({ status: "published" }).sort({ featured: -1, publishedAt: -1, createdAt: -1 }).lean();
  return sendResponse(res, 200, "Published case studies", items);
}

export async function getPublicCaseStudy(req, res) {
  const item = await CaseStudy.findOne({ slug: req.params.slug, status: "published" }).lean();
  if (!item) throw new ApiError("Case study not found", 404);
  return sendResponse(res, 200, "Case study", item);
}

export async function getCaseStudies(req, res) {
  const filter = req.query.status ? { status: req.query.status } : {};
  const items = await CaseStudy.find(filter).sort({ updatedAt: -1 }).lean();
  return sendResponse(res, 200, "Case studies", items);
}

export async function createCaseStudy(req, res) {
  const slug = await uniqueSlug(req.body.slug || req.body.title || req.body.client);
  const item = await CaseStudy.create({ ...req.body, slug, publishedAt: req.body.status === "published" ? new Date() : null, createdBy: req.admin._id, updatedBy: req.admin._id });
  return sendResponse(res, 201, "Case study created", item);
}

export async function getCaseStudy(req, res) {
  const item = await CaseStudy.findById(req.params.id).lean();
  if (!item) throw new ApiError("Case study not found", 404);
  return sendResponse(res, 200, "Case study", item);
}

export async function updateCaseStudy(req, res) {
  const item = await CaseStudy.findById(req.params.id);
  if (!item) throw new ApiError("Case study not found", 404);
  const slug = await uniqueSlug(req.body.slug || req.body.title || item.title, item._id);
  Object.assign(item, req.body, { slug, updatedBy: req.admin._id });
  if (req.body.status === "published" && !item.publishedAt) item.publishedAt = new Date();
  if (req.body.status !== "published") item.publishedAt = null;
  await item.save();
  return sendResponse(res, 200, "Case study updated", item);
}

export async function deleteCaseStudy(req, res) {
  const item = await CaseStudy.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError("Case study not found", 404);
  return sendResponse(res, 200, "Case study deleted");
}

export async function updateCaseStudyStatus(req, res) {
  if (!["draft", "published", "archived"].includes(req.body.status)) throw new ApiError("Invalid status", 400);
  const item = await CaseStudy.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, publishedAt: req.body.status === "published" ? new Date() : null, updatedBy: req.admin._id },
    { new: true, runValidators: true }
  );
  if (!item) throw new ApiError("Case study not found", 404);
  return sendResponse(res, 200, "Case study status updated", item);
}
