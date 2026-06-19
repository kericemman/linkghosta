import mongoose from "mongoose";

const contactInquirySchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    company: { type: String, trim: true },
    role: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ["new", "read", "responded", "closed", "spam"],
      default: "new"
    },
    adminNotes: [{ note: String, createdAt: { type: Date, default: Date.now } }]
  },
  { timestamps: true }
);

export default mongoose.model("ContactInquiry", contactInquirySchema);
