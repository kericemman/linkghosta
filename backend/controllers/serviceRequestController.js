import ServiceRequest from "../models/ServiceRequest.js";
import ApiError from "../utils/ApiError.js";
import sendResponse from "../utils/sendResponse.js";
import { sendServiceRequestEmails } from "../services/emailService.js";

export async function submitServiceRequest(req, res) {
  if (!req.body.name?.trim() || !req.body.email?.trim()) throw new ApiError("Name and email are required", 400);
  const item = await ServiceRequest.create(req.body);
  await sendServiceRequestEmails(item);
  return sendResponse(res, 201, "Service request submitted", item);
}

export async function getServiceRequests(req, res) {
  const filter = req.query.status ? { status: req.query.status } : {};
  const items = await ServiceRequest.find(filter).sort({ createdAt: -1 }).lean();
  return sendResponse(res, 200, "Service requests", items);
}

export async function getServiceRequest(req, res) {
  const item = await ServiceRequest.findById(req.params.id).lean();
  if (!item) throw new ApiError("Service request not found", 404);
  return sendResponse(res, 200, "Service request", item);
}

export async function updateServiceRequestStatus(req, res) {
  const allowed = ["new", "reviewing", "contacted", "qualified", "converted", "closed", "spam"];
  if (!allowed.includes(req.body.status)) throw new ApiError("Invalid status", 400);
  const item = await ServiceRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!item) throw new ApiError("Service request not found", 404);
  return sendResponse(res, 200, "Service request status updated", item);
}

export async function addServiceRequestNote(req, res) {
  if (!req.body.note?.trim()) throw new ApiError("Note is required", 400);
  const item = await ServiceRequest.findByIdAndUpdate(
    req.params.id,
    { $push: { adminNotes: { note: req.body.note.trim() } } },
    { new: true, runValidators: true }
  );
  if (!item) throw new ApiError("Service request not found", 404);
  return sendResponse(res, 200, "Note added", item);
}

export async function deleteServiceRequest(req, res) {
  const item = await ServiceRequest.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError("Service request not found", 404);
  return sendResponse(res, 200, "Service request deleted");
}
