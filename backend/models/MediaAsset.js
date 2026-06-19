import mongoose from "mongoose";

const mediaAssetSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    publicId: { type: String, trim: true },
    url: { type: String, trim: true },
    resourceType: { type: String, default: "image" },
    format: { type: String, trim: true },
    bytes: Number,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
  },
  { timestamps: true }
);

export default mongoose.model("MediaAsset", mediaAssetSchema);
