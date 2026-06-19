import { Navigate, Route, Routes } from "react-router-dom";
import AdminAuthLayout from "../layouts/admin/AdminAuthLayout.jsx";
import AdminLayout from "../layouts/admin/AdminLayout.jsx";
import LoginPage from "../pages/admin/auth/LoginPage.jsx";
import DashboardPage from "../pages/admin/dashboard/DashboardPage.jsx";
import BlogListPage from "../pages/admin/blogs/BlogListPage.jsx";
import CreateBlogPage from "../pages/admin/blogs/CreateBlogPage.jsx";
import EditBlogPage from "../pages/admin/blogs/EditBlogPage.jsx";
import ViewBlogPage from "../pages/admin/blogs/ViewBlogPage.jsx";
import CaseStudyListPage from "../pages/admin/caseStudies/CaseStudyListPage.jsx";
import CreateCaseStudyPage from "../pages/admin/caseStudies/CreateCaseStudyPage.jsx";
import EditCaseStudyPage from "../pages/admin/caseStudies/EditCaseStudyPage.jsx";
import ViewCaseStudyPage from "../pages/admin/caseStudies/ViewCaseStudyPage.jsx";
import InquiryDetailsPage from "../pages/admin/inquiries/InquiryDetailsPage.jsx";
import InquiryListPage from "../pages/admin/inquiries/InquiryListPage.jsx";
import MediaLibraryPage from "../pages/admin/media/MediaLibraryPage.jsx";
import UploadMediaPage from "../pages/admin/media/UploadMediaPage.jsx";
import ViewMediaPage from "../pages/admin/media/ViewMediaPage.jsx";
import AdminProfilePage from "../pages/admin/profile/AdminProfilePage.jsx";
import ChangePasswordPage from "../pages/admin/profile/ChangePasswordPage.jsx";
import ServiceRequestDetailsPage from "../pages/admin/serviceRequests/ServiceRequestDetailsPage.jsx";
import ServiceRequestListPage from "../pages/admin/serviceRequests/ServiceRequestListPage.jsx";
import CreateTeamMemberPage from "../pages/admin/team/CreateTeamMemberPage.jsx";
import EditTeamMemberPage from "../pages/admin/team/EditTeamMemberPage.jsx";
import TeamListPage from "../pages/admin/team/TeamListPage.jsx";
import ViewTeamMemberPage from "../pages/admin/team/ViewTeamMemberPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import SiteContentPage from "../pages/admin/content/SiteContentPage.jsx";
import SubscriberListPage from "../pages/admin/subscribers/SubscriberListPage.jsx";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminAuthLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="team" element={<TeamListPage />} />
          <Route path="team/create" element={<CreateTeamMemberPage />} />
          <Route path="team/:id" element={<ViewTeamMemberPage />} />
          <Route path="team/:id/edit" element={<EditTeamMemberPage />} />
          <Route path="blogs" element={<BlogListPage />} />
          <Route path="blogs/create" element={<CreateBlogPage />} />
          <Route path="blogs/:id" element={<ViewBlogPage />} />
          <Route path="blogs/:id/edit" element={<EditBlogPage />} />
          <Route path="case-studies" element={<CaseStudyListPage />} />
          <Route path="case-studies/create" element={<CreateCaseStudyPage />} />
          <Route path="case-studies/:id" element={<ViewCaseStudyPage />} />
          <Route path="case-studies/:id/edit" element={<EditCaseStudyPage />} />
          <Route path="case-stdies" element={<Navigate to="/admin/case-studies" replace />} />
          <Route path="case-stdies/create" element={<Navigate to="/admin/case-studies/create" replace />} />
          <Route path="content" element={<SiteContentPage />} />
          <Route path="media" element={<MediaLibraryPage />} />
          <Route path="media/upload" element={<UploadMediaPage />} />
          <Route path="media/:id" element={<ViewMediaPage />} />
          <Route path="service-requests" element={<ServiceRequestListPage />} />
          <Route path="service-requests/:id" element={<ServiceRequestDetailsPage />} />
          <Route path="inquiries" element={<InquiryListPage />} />
          <Route path="inquiries/:id" element={<InquiryDetailsPage />} />
          <Route path="subscribers" element={<SubscriberListPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
          <Route path="profile/change-password" element={<ChangePasswordPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
