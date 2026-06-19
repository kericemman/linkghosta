import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  FolderKanban,
  Image,
  LogOut,
  Mail,
  MailCheck,
  PanelsTopLeft,
  User,
  Users
} from "lucide-react";
import { adminRoutes, publicRoutes } from "./routes";

export const publicNavigation = [
  { label: "Home", href: publicRoutes.home },
  { label: "About", href: publicRoutes.about },
  { label: "Services", href: publicRoutes.services },
  { label: "Portfolio", href: publicRoutes.results },
  { label: "Pricing", href: publicRoutes.pricing },
  { label: "Articles", href: publicRoutes.insights }
];

export const footerNavigationGroups = [
  {
    title: "Company",
    links: [
      { label: "About", href: publicRoutes.about },
      { label: "Process", href: publicRoutes.process },
      { label: "Results", href: publicRoutes.results },
      { label: "Clients", href: publicRoutes.clients }
    ]
  },
  {
    title: "Services",
    links: [
      { label: "LinkedIn Ghostwriting", href: publicRoutes.services },
      { label: "Personal Brand Strategy", href: publicRoutes.services },
      { label: "Profile Makeover", href: publicRoutes.services },
      { label: "LinkedIn Training", href: publicRoutes.services }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: publicRoutes.insights },
      { label: "Pricing", href: publicRoutes.pricing },
      { label: "Contact", href: publicRoutes.contact }
    ]
  }
];

export const adminNavigation = [
  { label: "Dashboard", href: adminRoutes.dashboard, icon: BarChart3 },
  { label: "Team", href: adminRoutes.team, icon: Users },
  { label: "Blogs", href: adminRoutes.blogs, icon: BookOpen },
  { label: "Case Studies", href: adminRoutes.caseStudies, icon: FolderKanban },
  { label: "Services & Pricing", href: adminRoutes.content, icon: PanelsTopLeft },
  { label: "Media", href: adminRoutes.media, icon: Image },
  { label: "Service Requests", href: adminRoutes.serviceRequests, icon: BriefcaseBusiness },
  { label: "Contact Inquiries", href: adminRoutes.inquiries, icon: Mail },
  { label: "Subscribers", href: adminRoutes.subscribers, icon: MailCheck },
  { label: "Profile", href: adminRoutes.profile, icon: User },
  { label: "Logout", href: "#logout", icon: LogOut }
];
