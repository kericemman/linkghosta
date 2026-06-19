import BlogPost from "../models/BlogPost.js";
import Subscriber from "../models/Subscriber.js";
import { sendArticleToSubscribers } from "../services/emailService.js";
import ApiError from "../utils/ApiError.js";
import generateSlug from "../utils/generateSlug.js";
import sendResponse from "../utils/sendResponse.js";

async function uniqueSlug(value, excludeId) {
  const base = generateSlug(value) || `article-${Date.now()}`;
  let slug = base;
  let number = 2;
  while (await BlogPost.exists({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) slug = `${base}-${number++}`;
  return slug;
}

async function notifySubscribers(item) {
  if (item.status !== "published" || item.newsletterSentAt) return;
  const subscribers = await Subscriber.find({ status: "subscribed" }).select("email unsubscribeToken").lean();
  if (!subscribers.length) return;
  const result = await sendArticleToSubscribers(item, subscribers);
  if (result.sent > 0) {
    item.newsletterSentAt = new Date();
    await item.save();
  }
}

export async function getPublicBlogs(req, res) {
  const items = await BlogPost.find({ status: "published" }).sort({ featured: -1, publishedAt: -1, createdAt: -1 }).lean();
  return sendResponse(res, 200, "Published articles", items);
}

export async function getPublicBlog(req, res) {
  const item = await BlogPost.findOne({ slug: req.params.slug, status: "published" }).lean();
  if (!item) throw new ApiError("Article not found", 404);
  return sendResponse(res, 200, "Article", item);
}

export async function getBlogs(req, res) {
  const items = await BlogPost.find().sort({ updatedAt: -1 }).lean();
  return sendResponse(res, 200, "Articles", items);
}

export async function createBlog(req, res) {
  const slug = await uniqueSlug(req.body.slug || req.body.title);
  const item = await BlogPost.create({
    ...req.body,
    slug,
    createdBy: req.admin._id,
    updatedBy: req.admin._id,
    publishedAt: req.body.status === "published" ? new Date() : null
  });
  if (item.status === "published") await notifySubscribers(item);
  return sendResponse(res, 201, "Article created", item);
}

export async function getBlog(req, res) {
  const item = await BlogPost.findById(req.params.id).lean();
  if (!item) throw new ApiError("Article not found", 404);
  return sendResponse(res, 200, "Article", item);
}

export async function updateBlog(req, res) {
  const item = await BlogPost.findById(req.params.id);
  if (!item) throw new ApiError("Article not found", 404);
  const wasPublished = item.status === "published";
  Object.assign(item, req.body, {
    slug: await uniqueSlug(req.body.slug || req.body.title || item.title, item._id),
    updatedBy: req.admin._id
  });
  if (!wasPublished && item.status === "published") item.publishedAt = new Date();
  await item.save();
  if (!wasPublished && item.status === "published") await notifySubscribers(item);
  return sendResponse(res, 200, "Article updated", item);
}

export async function deleteBlog(req, res) {
  const item = await BlogPost.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError("Article not found", 404);
  return sendResponse(res, 200, "Article deleted");
}

export async function updateBlogStatus(req, res) {
  if (!["draft", "published", "archived"].includes(req.body.status)) throw new ApiError("Invalid status", 400);
  const item = await BlogPost.findById(req.params.id);
  if (!item) throw new ApiError("Article not found", 404);
  const wasPublished = item.status === "published";
  item.status = req.body.status;
  item.updatedBy = req.admin._id;
  if (!wasPublished && item.status === "published") item.publishedAt = new Date();
  await item.save();
  if (!wasPublished && item.status === "published") await notifySubscribers(item);
  return sendResponse(res, 200, "Article status updated", item);
}
