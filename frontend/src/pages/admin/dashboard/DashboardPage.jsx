import { ArrowRight, BriefcaseBusiness, FilePlus2, FolderKanban, Mail, MailCheck, PenSquare, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminPageHeader from "../../../components/admin/layout/AdminPageHeader.jsx";
import { dashboardService } from "../../../services/dashboardService.js";
import { formatDate } from "../../../utils/formatDate.js";

const metrics = [
  { label: "Published case studies", key: "publishedCaseStudies", Icon: FolderKanban, href: "/admin/case-studies" },
  { label: "Team members", key: "totalTeamMembers", Icon: Users, href: "/admin/team" },
  { label: "New enquiries", key: "newInquiries", Icon: Mail, href: "/admin/inquiries" },
  { label: "New service requests", key: "newServiceRequests", Icon: BriefcaseBusiness, href: "/admin/service-requests" },
  { label: "Active subscribers", key: "activeSubscribers", Icon: MailCheck, href: "/admin/subscribers" }
];

function RecentList({ title, items, href, detailKey }) {
  return (
    <section className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
      <header className="flex items-center justify-between border-b border-neutral-200 px-5 py-4"><h2 className="font-extrabold">{title}</h2><Link to={href} className="inline-flex items-center gap-1 text-xs font-bold text-brand-700">View all <ArrowRight size={14} /></Link></header>
      <div className="divide-y divide-neutral-100">
        {items?.length ? items.map((item) => <Link key={item._id} to={`${href}/${item._id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-neutral-50"><div className="min-w-0"><p className="truncate text-sm font-bold">{item.name}</p><p className="mt-1 truncate text-xs text-neutral-500">{item[detailKey] || item.email}</p></div><div className="shrink-0 text-right"><span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold capitalize text-brand-700">{item.status}</span><p className="mt-1.5 text-xs text-neutral-400">{formatDate(item.createdAt)}</p></div></Link>) : <p className="px-5 py-10 text-center text-sm text-neutral-500">Nothing new right now.</p>}
      </div>
    </section>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  useEffect(() => { dashboardService.getOverview().then(({ data: response }) => setData(response.data)).catch(() => setData({})); }, []);
  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader title="Dashboard" description="Content, leads, and website activity at a glance." action={<div className="flex gap-2"><Link to="/admin/blogs/create" className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm font-bold shadow-sm hover:border-brand-400"><PenSquare size={16} />New article</Link><Link to="/admin/case-studies/create" className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-3 py-2.5 text-sm font-bold text-white hover:bg-brand-700"><FilePlus2 size={16} />New case study</Link></div>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map(({ label, key, Icon, href }) => <Link key={key} to={href} className="flex items-center gap-4 rounded-lg border border-black/10 bg-white p-5 shadow-sm transition hover:border-brand-300"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700"><Icon size={20} /></span><div><p className="text-2xl font-extrabold">{data ? data[key] ?? 0 : "-"}</p><p className="mt-0.5 text-sm font-semibold text-neutral-500">{label}</p></div></Link>)}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2"><RecentList title="Recent enquiries" items={data?.recentInquiries} href="/admin/inquiries" detailKey="subject" /><RecentList title="Recent service requests" items={data?.recentServiceRequests} href="/admin/service-requests" detailKey="serviceType" /></div>
    </div>
  );
}
