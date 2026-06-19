import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/public/PublicLayout.jsx";
import HomePage from "../pages/public/HomePage.jsx";
import AboutPage from "../pages/public/AboutPage.jsx";
import ServicesPage from "../pages/public/ServicesPage.jsx";
import ProcessPage from "../pages/public/ProcessPage.jsx";
import ResultsPage from "../pages/public/ResultsPage.jsx";
import CaseStudyDetailsPage from "../pages/public/CaseStudyDetailsPage.jsx";
import ClientsPage from "../pages/public/ClientsPage.jsx";
import PricingPage from "../pages/public/PricingPage.jsx";
import InsightsPage from "../pages/public/InsightsPage.jsx";
import InsightDetailsPage from "../pages/public/InsightDetailsPage.jsx";
import ContactPage from "../pages/public/ContactPage.jsx";
import PrivacyPolicyPage from "../pages/public/PrivacyPolicyPage.jsx";
import TermsPage from "../pages/public/TermsPage.jsx";
import NotFoundPage from "../pages/public/NotFoundPage.jsx";
import UnsubscribePage from "../pages/public/UnsubscribePage.jsx";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="process" element={<ProcessPage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="results/:slug" element={<CaseStudyDetailsPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="insights/:slug" element={<InsightDetailsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="unsubscribe/:token" element={<UnsubscribePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
