import { Router } from "express";
import authRoutes from "./authRoutes.js";
import blogRoutes from "./blogRoutes.js";
import caseStudyRoutes from "./caseStudyRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import inquiryRoutes from "./inquiryRoutes.js";
import mediaRoutes from "./mediaRoutes.js";
import profileRoutes from "./profileRoutes.js";
import serviceRequestRoutes from "./serviceRequestRoutes.js";
import teamRoutes from "./teamRoutes.js";
import siteContentRoutes from "./siteContentRoutes.js";
import subscriberRoutes from "./subscriberRoutes.js";

const router = Router();

router.use(authRoutes);
router.use(blogRoutes);
router.use(caseStudyRoutes);
router.use(dashboardRoutes);
router.use(inquiryRoutes);
router.use(mediaRoutes);
router.use(profileRoutes);
router.use(serviceRequestRoutes);
router.use(teamRoutes);
router.use(siteContentRoutes);
router.use(subscriberRoutes);

export default router;
