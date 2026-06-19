import SiteContent from "../models/SiteContent.js";
import sendResponse from "../utils/sendResponse.js";

const defaultContent = { key: "main", services: [], pricingTiers: [] };

export async function getSiteContent(req, res) {
  const content = await SiteContent.findOne({ key: "main" }).lean();
  return sendResponse(res, 200, "Site content", content || defaultContent);
}

export async function updateSiteContent(req, res) {
  const content = await SiteContent.findOneAndUpdate(
    { key: "main" },
    { $set: { services: req.body.services || [], pricingTiers: req.body.pricingTiers || [], updatedBy: req.admin._id } },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );
  return sendResponse(res, 200, "Site content updated", content);
}
