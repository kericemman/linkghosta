import Subscriber from "../models/Subscriber.js";
import ApiError from "../utils/ApiError.js";
import sendResponse from "../utils/sendResponse.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(req, res) {
  const email = String(req.body.email || "").trim().toLowerCase();
  const name = String(req.body.name || "").trim();
  if (!emailPattern.test(email)) throw new ApiError("Please enter a valid email address", 400);

  let subscriber = await Subscriber.findOne({ email });
  if (subscriber) {
    subscriber.name = name || subscriber.name;
    subscriber.status = "subscribed";
    subscriber.subscribedAt = new Date();
    subscriber.unsubscribedAt = null;
    await subscriber.save();
  } else {
    subscriber = await Subscriber.create({ email, name, source: req.body.source || "insights" });
  }

  return sendResponse(res, 200, "You are subscribed to LinkGhosta Insights", {
    email: subscriber.email,
    status: subscriber.status
  });
}

export async function unsubscribe(req, res) {
  const subscriber = await Subscriber.findOne({ unsubscribeToken: req.params.token });
  if (!subscriber) throw new ApiError("This unsubscribe link is invalid", 404);
  subscriber.status = "unsubscribed";
  subscriber.unsubscribedAt = new Date();
  await subscriber.save();
  return sendResponse(res, 200, "You have been unsubscribed from LinkGhosta Insights");
}

export async function getSubscribers(req, res) {
  const [items, active, unsubscribed] = await Promise.all([
    Subscriber.find().sort({ createdAt: -1 }).lean(),
    Subscriber.countDocuments({ status: "subscribed" }),
    Subscriber.countDocuments({ status: "unsubscribed" })
  ]);
  return sendResponse(res, 200, "Subscribers", { items, summary: { active, unsubscribed, total: active + unsubscribed } });
}

export async function updateSubscriberStatus(req, res) {
  if (!["subscribed", "unsubscribed"].includes(req.body.status)) throw new ApiError("Invalid subscriber status", 400);
  const changes = req.body.status === "subscribed"
    ? { status: "subscribed", subscribedAt: new Date(), unsubscribedAt: null }
    : { status: "unsubscribed", unsubscribedAt: new Date() };
  const subscriber = await Subscriber.findByIdAndUpdate(req.params.id, changes, { new: true, runValidators: true });
  if (!subscriber) throw new ApiError("Subscriber not found", 404);
  return sendResponse(res, 200, "Subscriber status updated", subscriber);
}

export async function deleteSubscriber(req, res) {
  const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
  if (!subscriber) throw new ApiError("Subscriber not found", 404);
  return sendResponse(res, 200, "Subscriber deleted");
}
