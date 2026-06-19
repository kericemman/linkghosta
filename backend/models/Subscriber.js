import crypto from "crypto";
import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    status: { type: String, enum: ["subscribed", "unsubscribed"], default: "subscribed" },
    source: { type: String, trim: true, default: "insights" },
    unsubscribeToken: {
      type: String,
      unique: true,
      default: () => crypto.randomBytes(24).toString("hex")
    },
    subscribedAt: { type: Date, default: Date.now },
    unsubscribedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("Subscriber", subscriberSchema);
