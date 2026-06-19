import mongoose from "mongoose";
import { CONTENT_STATUS } from "../utils/constants.js";

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    status: { type: String, enum: Object.values(CONTENT_STATUS), default: CONTENT_STATUS.DRAFT },
    featured: { type: Boolean, default: false },
    category: { type: String, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImage: { type: String, trim: true },
    author: { type: String, trim: true, default: "LinkGhosta" },
    metaDescription: { type: String, trim: true },
    readTime: { type: Number, min: 1, default: 5 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    publishedAt: Date,
    newsletterSentAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("BlogPost", blogPostSchema);
