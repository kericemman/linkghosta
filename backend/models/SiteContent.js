import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    eyebrow: { type: String, trim: true },
    price: { type: String, trim: true },
    description: { type: String, trim: true },
    includes: [{ type: String, trim: true }],
    bestFor: { type: String, trim: true },
    image: { type: String, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { _id: true }
);

const pricingTierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    cadence: { type: String, trim: true },
    description: { type: String, trim: true },
    features: [{ type: String, trim: true }],
    bonus: { type: String, trim: true },
    bestFor: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { _id: true }
);

const siteContentSchema = new mongoose.Schema(
  {
    key: { type: String, default: "main", unique: true },
    services: [serviceSchema],
    pricingTiers: [pricingTierSchema],
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
  },
  { timestamps: true }
);

export default mongoose.model("SiteContent", siteContentSchema);
