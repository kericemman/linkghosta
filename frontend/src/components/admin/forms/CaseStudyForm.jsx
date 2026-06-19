import { Save } from "lucide-react";
import { useState } from "react";
import ImageUploadField from "./ImageUploadField.jsx";
import MultiImageUploadField from "./MultiImageUploadField.jsx";

const empty = { title: "", client: "", location: "", challenge: "", whatWeDid: "", duration: "", followerGrowth: "", averageImpressions: "", keyOutcome: "", quote: "", image: "", images: [], services: "", status: "draft", featured: false };
const inputClass = "mt-2 w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10";

export default function CaseStudyForm({ initialValue, onSubmit, submitting = false }) {
  const [form, setForm] = useState({ ...empty, ...initialValue, services: Array.isArray(initialValue?.services) ? initialValue.services.join(", ") : initialValue?.services || "" });
  const field = (name) => ({ value: form[name], onChange: (event) => setForm((current) => ({ ...current, [name]: event.target.value })) });
  function submit(event) { event.preventDefault(); onSubmit({ ...form, services: form.services.split(",").map((value) => value.trim()).filter(Boolean) }); }

  return (
    <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-base font-extrabold">Client and engagement</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-bold">Internal title<input required {...field("title")} className={inputClass} /></label>
            <label className="text-sm font-bold">Client display name<input required {...field("client")} className={inputClass} placeholder="Fintech Founder, Nairobi" /></label>
            <label className="text-sm font-bold">Location<input {...field("location")} className={inputClass} /></label>
            <label className="text-sm font-bold">Duration<input {...field("duration")} className={inputClass} placeholder="6 months" /></label>
            <label className="text-sm font-bold sm:col-span-2">Services delivered<input {...field("services")} className={inputClass} placeholder="Ghostwriting, Profile optimisation" /><span className="mt-1 block text-xs font-normal text-neutral-500">Separate services with commas.</span></label>
          </div>
        </section>
        <section className="space-y-5 rounded-lg border border-black/10 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-base font-extrabold">The story</h2>
          <label className="block text-sm font-bold">Challenge<textarea required rows="6" {...field("challenge")} className={inputClass} /></label>
          <label className="block text-sm font-bold">What we did<textarea required rows="6" {...field("whatWeDid")} className={inputClass} /></label>
          <label className="block text-sm font-bold">Client quote<textarea rows="3" {...field("quote")} className={inputClass} /></label>
        </section>
        <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-base font-extrabold">Results</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <label className="text-sm font-bold">Follower growth<input {...field("followerGrowth")} className={inputClass} placeholder="2,400 to 18,000" /></label>
            <label className="text-sm font-bold">Average impressions<input {...field("averageImpressions")} className={inputClass} /></label>
            <label className="text-sm font-bold">Key outcome<input required {...field("keyOutcome")} className={inputClass} /></label>
          </div>
        </section>
      </div>

      <aside className="space-y-5">
        <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-extrabold">Publishing</h2>
          <label className="mt-4 block text-sm font-bold">Status<select {...field("status")} className={inputClass}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
          <label className="mt-4 flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} />Featured case study</label>
          <button disabled={submitting} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-600 px-5 py-2.5 text-sm font-extrabold text-white hover:bg-brand-700 disabled:opacity-60"><Save size={17} />{submitting ? "Saving..." : "Save case study"}</button>
        </section>
        <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm"><ImageUploadField label="Cover image" value={form.image} onChange={(image) => setForm((current) => ({ ...current, image }))} /></section>
        <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm"><MultiImageUploadField label="Results gallery" values={form.images || []} onChange={(images) => setForm((current) => ({ ...current, images }))} /></section>
      </aside>
    </form>
  );
}
