import BlogPost from "../models/BlogPost.js";
import CaseStudy from "../models/CaseStudy.js";
import ContactInquiry from "../models/ContactInquiry.js";
import MediaAsset from "../models/MediaAsset.js";
import ServiceRequest from "../models/ServiceRequest.js";
import TeamMember from "../models/TeamMember.js";
import Subscriber from "../models/Subscriber.js";
import sendResponse from "../utils/sendResponse.js";

export async function getDashboardOverview(req, res) {
  const [
    totalTeamMembers, totalBlogs, publishedBlogs, draftBlogs, totalCaseStudies,
    publishedCaseStudies, totalMediaAssets, newServiceRequests, totalServiceRequests,
    newInquiries, totalInquiries, recentInquiries, recentServiceRequests, activeSubscribers
  ] = await Promise.all([
    TeamMember.countDocuments(), BlogPost.countDocuments(), BlogPost.countDocuments({ status: "published" }),
    BlogPost.countDocuments({ status: "draft" }), CaseStudy.countDocuments(), CaseStudy.countDocuments({ status: "published" }),
    MediaAsset.countDocuments(), ServiceRequest.countDocuments({ status: "new" }), ServiceRequest.countDocuments(),
    ContactInquiry.countDocuments({ status: "new" }), ContactInquiry.countDocuments(),
    ContactInquiry.find().sort({ createdAt: -1 }).limit(5).select("name email subject status createdAt").lean(),
    ServiceRequest.find().sort({ createdAt: -1 }).limit(5).select("name email serviceType status createdAt").lean(),
    Subscriber.countDocuments({ status: "subscribed" })
  ]);
  return sendResponse(res, 200, "Dashboard overview", {
    totalTeamMembers, totalBlogs, publishedBlogs, draftBlogs, totalCaseStudies, publishedCaseStudies,
    totalMediaAssets, newServiceRequests, totalServiceRequests, newInquiries, totalInquiries,
    recentInquiries, recentServiceRequests, activeSubscribers
  });
}
