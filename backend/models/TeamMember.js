import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, trim: true },
    bio: { type: String, trim: true },
    profileImage: { type: String, trim: true },
    linkedinUrl: { type: String, trim: true },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    featured: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    publishedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("TeamMember", teamMemberSchema);
