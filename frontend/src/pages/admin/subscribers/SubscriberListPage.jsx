import { Search, Trash2, UserCheck, UserMinus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import AdminPageHeader from "../../../components/admin/layout/AdminPageHeader.jsx";
import { subscriberService } from "../../../services/subscriberService.js";
import { formatDate } from "../../../utils/formatDate.js";
import { getErrorMessage } from "../../../utils/getErrorMessage.js";

export default function SubscriberListPage() {
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState({ active: 0, unsubscribed: 0, total: 0 });
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    subscriberService.getSubscribers().then(({ data }) => {
      setItems(data.data.items || []);
      setSummary(data.data.summary || {});
    }).catch((error) => toast.error(getErrorMessage(error)));
  }, []);

  const shown = useMemo(() => items.filter((item) => {
    const matchesStatus = filter === "all" || item.status === filter;
    const matchesQuery = `${item.name || ""} ${item.email}`.toLowerCase().includes(query.toLowerCase());
    return matchesStatus && matchesQuery;
  }), [items, query, filter]);

  async function changeStatus(item) {
    const status = item.status === "subscribed" ? "unsubscribed" : "subscribed";
    try {
      const { data } = await subscriberService.updateStatus(item._id, status);
      setItems((current) => current.map((entry) => entry._id === item._id ? data.data : entry));
      setSummary((current) => ({ ...current, active: current.active + (status === "subscribed" ? 1 : -1), unsubscribed: current.unsubscribed + (status === "unsubscribed" ? 1 : -1) }));
      toast.success(`Subscriber ${status === "subscribed" ? "reactivated" : "deactivated"}`);
    } catch (error) { toast.error(getErrorMessage(error)); }
  }

  async function remove(item) {
    if (!window.confirm(`Delete ${item.email} permanently?`)) return;
    try {
      await subscriberService.deleteSubscriber(item._id);
      setItems((current) => current.filter((entry) => entry._id !== item._id));
      setSummary((current) => ({ ...current, total: current.total - 1, [item.status === "subscribed" ? "active" : "unsubscribed"]: current[item.status === "subscribed" ? "active" : "unsubscribed"] - 1 }));
      toast.success("Subscriber deleted");
    } catch (error) { toast.error(getErrorMessage(error)); }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <AdminPageHeader title="Subscribers" description="People receiving new LinkGhosta article emails." />
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        {[ ["Active", summary.active], ["Unsubscribed", summary.unsubscribed], ["Total", summary.total] ].map(([label, value]) => <div key={label} className="rounded-lg border border-black/10 bg-white p-4"><p className="text-2xl font-extrabold">{value ?? 0}</p><p className="mt-1 text-sm font-semibold text-neutral-500">{label}</p></div>)}
      </div>
      <div className="mb-4 flex flex-col gap-3 rounded-lg border border-black/10 bg-white p-3 sm:flex-row">
        <label className="flex flex-1 items-center gap-2 px-2"><Search size={17} className="text-neutral-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search email or name" className="w-full border-0 py-2 outline-none" /></label>
        <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-md border border-neutral-300 px-3 py-2 text-sm"><option value="all">All subscribers</option><option value="subscribed">Active</option><option value="unsubscribed">Unsubscribed</option></select>
      </div>
      <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
        <div className="divide-y divide-black/5">
          {shown.map((item) => <article key={item._id} className="grid items-center gap-4 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
            <div className="min-w-0"><p className="truncate font-extrabold">{item.email}</p><p className="mt-1 text-xs text-neutral-500">{item.name || "No name provided"} · Joined {formatDate(item.subscribedAt || item.createdAt)}</p></div>
            <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-bold capitalize ${item.status === "subscribed" ? "bg-green-50 text-green-700" : "bg-neutral-100 text-neutral-600"}`}>{item.status}</span>
            <div className="flex gap-1"><button onClick={() => changeStatus(item)} title={item.status === "subscribed" ? "Deactivate" : "Reactivate"} aria-label={item.status === "subscribed" ? "Deactivate subscriber" : "Reactivate subscriber"} className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100">{item.status === "subscribed" ? <UserMinus size={17} /> : <UserCheck size={17} />}</button><button onClick={() => remove(item)} title="Delete" aria-label="Delete subscriber" className="rounded-md p-2 text-red-600 hover:bg-red-50"><Trash2 size={17} /></button></div>
          </article>)}
        </div>
        {!shown.length && <p className="p-10 text-center text-sm text-neutral-500">No matching subscribers.</p>}
      </div>
    </div>
  );
}
