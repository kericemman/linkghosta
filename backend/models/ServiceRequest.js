import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    role: { type: String, trim: true },
    serviceType: { type: String, trim: true },
    budgetRange: { type: String, trim: true },
    preferredContactMethod: { type: String, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ["new", "reviewing", "contacted", "qualified", "converted", "closed", "spam"],
      default: "new"
    },
    adminNotes: [{ note: String, createdAt: { type: Date, default: Date.now } }],
    source: { type: String, default: "website" }
  },
  { timestamps: true }
);

export default mongoose.model("ServiceRequest", serviceRequestSchema);
