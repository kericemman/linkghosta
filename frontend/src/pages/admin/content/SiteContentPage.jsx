import { GripVertical, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminPageHeader from "../../../components/admin/layout/AdminPageHeader.jsx";
import ImageUploadField from "../../../components/admin/forms/ImageUploadField.jsx";
import RichTextEditor from "../../../components/admin/forms/RichTextEditor.jsx";
import { siteContentService } from "../../../services/siteContentService.js";
import { getErrorMessage } from "../../../utils/getErrorMessage.js";

const starterServices = [
  { name: "LinkedIn Ghostwriting & Management", eyebrow: "Our flagship", price: "Starts at $809/month", description: "<p>Done for you, end to end.</p>", includes: [], bestFor: "Founders, CEOs, executives, and public figures.", image: "", isActive: true },
  { name: "Personal Brand Strategy", eyebrow: "Strategic clarity", price: "Starts at $530 one-time", description: "<p>A complete LinkedIn strategy built around your goals.</p>", includes: [], bestFor: "Leaders and in-house teams that need direction.", image: "", isActive: true },
  { name: "Profile Makeover", eyebrow: "One-time. High impact.", price: "Starts at $350 one-time", description: "<p>A complete rewrite that turns your profile into a conversion tool.</p>", includes: [], bestFor: "Leaders preparing for a new market, fundraise, or speaking circuit.", image: "", isActive: true },
  { name: "LinkedIn Training & Workshops", eyebrow: "Build the skill in-house", price: "Starts at $530/workshop", description: "<p>Live personal branding and content training.</p>", includes: [], bestFor: "Companies, accelerators, and government agencies.", image: "", isActive: true }
];
const starterPricing = [
  { name: "Starter", price: "$809", cadence: "/month", description: "For the leader building consistency", features: [], bestFor: "Founders and executives starting their LinkedIn journey.", featured: false, isActive: true },
  { name: "Growth", price: "$1,250", cadence: "/month", description: "Our most popular package", features: [], bestFor: "Founders and CEOs building pipeline and authority.", featured: true, isActive: true },
  { name: "Executive", price: "$1,799", cadence: "/month", description: "Full-service. Everything handled.", features: [], bestFor: "High-profile leaders who need a discreet managed presence.", featured: false, isActive: true }
];
const inputClass = "mt-1.5 w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10";

export default function SiteContentPage() {
  const [tab, setTab] = useState("services");
  const [content, setContent] = useState({ services: [], pricingTiers: [] });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    siteContentService.get().then(({ data }) => {
      const value = data.data || {};
      setContent({ services: value.services?.length ? value.services : starterServices, pricingTiers: value.pricingTiers?.length ? value.pricingTiers : starterPricing });
    }).catch((error) => toast.error(getErrorMessage(error)));
  }, []);

  const key = tab === "services" ? "services" : "pricingTiers";
  const items = content[key];
  const update = (index, field, value) => setContent((current) => ({ ...current, [key]: current[key].map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item) }));
  const remove = (index) => setContent((current) => ({ ...current, [key]: current[key].filter((_, itemIndex) => itemIndex !== index) }));
  function add() {
    const item = tab === "services"
      ? { name: "New service", eyebrow: "", price: "", description: "<p></p>", includes: [], bestFor: "", image: "", isActive: true }
      : { name: "New tier", price: "$0", cadence: "/month", description: "", features: [], bestFor: "", featured: false, isActive: true };
    setContent((current) => ({ ...current, [key]: [...current[key], item] }));
  }
  async function save() {
    setSaving(true);
    try { await siteContentService.update(content); toast.success("Website content saved"); }
    catch (error) { toast.error(getErrorMessage(error)); }
    finally { setSaving(false); }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <AdminPageHeader title="Services & pricing" description="Edit the offers shown on the public website." action={<button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-brand-700 disabled:opacity-60"><Save size={17} />{saving ? "Saving..." : "Save changes"}</button>} />
      <div className="mb-6 inline-flex rounded-md border border-black/10 bg-white p-1 shadow-sm">{[["services", "Services"], ["pricing", "Pricing tiers"]].map(([id, label]) => <button key={id} onClick={() => setTab(id)} className={`rounded px-4 py-2 text-sm font-bold ${tab === id ? "bg-ink text-white" : "text-neutral-600 hover:bg-neutral-50"}`}>{label}</button>)}</div>
      <div className="space-y-5">
        {items.map((item, index) => (
          <article key={item._id || index} className="rounded-lg border border-black/10 bg-white shadow-sm">
            <header className="flex items-center gap-3 border-b border-neutral-200 px-5 py-4"><GripVertical size={18} className="text-neutral-300" /><div className="min-w-0 flex-1"><p className="truncate font-extrabold">{item.name || `Item ${index + 1}`}</p><p className="text-xs text-neutral-500">{tab === "services" ? `Service ${index + 1}` : `Pricing tier ${index + 1}`}</p></div><label className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" checked={item.isActive !== false} onChange={(event) => update(index, "isActive", event.target.checked)} />Active</label><button type="button" onClick={() => remove(index)} title="Remove" className="flex h-9 w-9 items-center justify-center rounded-md text-red-600 hover:bg-red-50"><Trash2 size={17} /></button></header>
            <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-xs font-bold">Name<input value={item.name || ""} onChange={(event) => update(index, "name", event.target.value)} className={inputClass} /></label>
                  {tab === "services" ? <label className="text-xs font-bold">Short label<input value={item.eyebrow || ""} onChange={(event) => update(index, "eyebrow", event.target.value)} className={inputClass} /></label> : <label className="text-xs font-bold">Cadence<input value={item.cadence || ""} onChange={(event) => update(index, "cadence", event.target.value)} className={inputClass} /></label>}
                  <label className="text-xs font-bold">Price<input value={item.price || ""} onChange={(event) => update(index, "price", event.target.value)} className={inputClass} /></label>
                  {tab === "pricing" && <label className="flex items-end gap-2 pb-3 text-sm font-bold"><input type="checkbox" checked={item.featured || false} onChange={(event) => update(index, "featured", event.target.checked)} />Featured tier</label>}
                </div>
                {tab === "services" ? <div><p className="text-xs font-bold">Service description</p><RichTextEditor value={item.description || ""} onChange={(value) => update(index, "description", value)} minHeight="180px" /></div> : <label className="block text-xs font-bold">Description<textarea rows="3" value={item.description || ""} onChange={(event) => update(index, "description", event.target.value)} className={inputClass} /></label>}
                <label className="block text-xs font-bold">{tab === "services" ? "What's included" : "Features"} (one per line)<textarea rows="5" value={(item.includes || item.features || []).join("\n")} onChange={(event) => update(index, tab === "services" ? "includes" : "features", event.target.value.split("\n").filter(Boolean))} className={inputClass} /></label>
                <label className="block text-xs font-bold">Best for<textarea rows="2" value={item.bestFor || ""} onChange={(event) => update(index, "bestFor", event.target.value)} className={inputClass} /></label>
              </div>
              {tab === "services" && <ImageUploadField label="Service image" value={item.image || ""} onChange={(value) => update(index, "image", value)} />}
            </div>
          </article>
        ))}
      </div>
      <button onClick={add} className="mt-5 inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm font-bold shadow-sm hover:border-brand-400"><Plus size={17} />Add {tab === "services" ? "service" : "tier"}</button>
    </div>
  );
}
