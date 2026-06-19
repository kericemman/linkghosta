import ContactInquiry from "../models/ContactInquiry.js";
import ApiError from "../utils/ApiError.js";
import sendResponse from "../utils/sendResponse.js";
import { sendContactInquiryEmails } from "../services/emailService.js";

export async function submitContactInquiry(req, res) {
  if (!req.body.name?.trim() || !req.body.email?.trim() || !req.body.message?.trim()) {
    throw new ApiError("Name, email, and message are required", 400);
  }
  const inquiry = await ContactInquiry.create(req.body);
  await sendContactInquiryEmails(inquiry);
  return sendResponse(res, 201, "Contact inquiry submitted", inquiry);
}

export async function getInquiries(req, res) {
  const filter = req.query.status ? { status: req.query.status } : {};
  const items = await ContactInquiry.find(filter).sort({ createdAt: -1 }).lean();
  return sendResponse(res, 200, "Contact inquiries", items);
}

export async function getInquiry(req, res) {
  const item = await ContactInquiry.findById(req.params.id);
  if (!item) throw new ApiError("Inquiry not found", 404);
  if (item.status === "new") {
    item.status = "read";
    await item.save();
  }
  return sendResponse(res, 200, "Contact inquiry", item);
}

export async function updateInquiryStatus(req, res) {
  const allowed = ["new", "read", "responded", "closed", "spam"];
  if (!allowed.includes(req.body.status)) throw new ApiError("Invalid status", 400);
  const item = await ContactInquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!item) throw new ApiError("Inquiry not found", 404);
  return sendResponse(res, 200, "Inquiry status updated", item);
}

export async function addInquiryNote(req, res) {
  if (!req.body.note?.trim()) throw new ApiError("Note is required", 400);
  const item = await ContactInquiry.findByIdAndUpdate(
    req.params.id,
    { $push: { adminNotes: { note: req.body.note.trim() } } },
    { new: true, runValidators: true }
  );
  if (!item) throw new ApiError("Inquiry not found", 404);
  return sendResponse(res, 200, "Note added", item);
}

export async function deleteInquiry(req, res) {
  const item = await ContactInquiry.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError("Inquiry not found", 404);
  return sendResponse(res, 200, "Inquiry deleted");
}
