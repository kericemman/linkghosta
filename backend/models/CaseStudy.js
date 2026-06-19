import mongoose from "mongoose";
import { CONTENT_STATUS } from "../utils/constants.js";

const caseStudySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    client: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    challenge: { type: String, required: true, trim: true },
    whatWeDid: { type: String, required: true, trim: true },
    duration: { type: String, trim: true },
    followerGrowth: { type: String, trim: true },
    averageImpressions: { type: String, trim: true },
    keyOutcome: { type: String, required: true, trim: true },
    quote: { type: String, trim: true },
    image: { type: String, trim: true },
    images: [{ type: String, trim: true }],
    services: [{ type: String, trim: true }],
    status: { type: String, enum: Object.values(CONTENT_STATUS), default: CONTENT_STATUS.DRAFT },
    featured: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    publishedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("CaseStudy", caseStudySchema);
