import { Save } from "lucide-react";
import { useState } from "react";
import ImageUploadField from "./ImageUploadField.jsx";

const inputClass = "mt-2 w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10";

export default function TeamMemberForm({ initialValue = {}, onSubmit, submitting = false }) {
  const [form, setForm] = useState({ name: "", title: "", bio: "", profileImage: "", linkedinUrl: "", order: 0, status: "draft", featured: false, ...initialValue });
  const field = (name) => ({ value: form[name] ?? "", onChange: (event) => setForm((current) => ({ ...current, [name]: event.target.value })) });

  function submit(event) {
    event.preventDefault();
    onSubmit({ ...form, order: Number(form.order) });
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <section className="space-y-5 rounded-lg border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-bold">Name<input required {...field("name")} className={inputClass} /></label>
          <label className="text-sm font-bold">Role / title<input required {...field("title")} className={inputClass} /></label>
          <label className="text-sm font-bold">LinkedIn URL<input type="url" {...field("linkedinUrl")} className={inputClass} placeholder="https://linkedin.com/in/..." /></label>
          <label className="text-sm font-bold">Display order<input type="number" min="0" {...field("order")} className={inputClass} /></label>
          <label className="text-sm font-bold">Status<select {...field("status")} className={inputClass}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
          <label className="flex items-end gap-2 pb-3 text-sm font-bold"><input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} />Featured team member</label>
        </div>
        <label className="block text-sm font-bold">Bio<textarea required rows="8" {...field("bio")} className={inputClass} /></label>
        <div className="flex justify-end border-t border-neutral-200 pt-5"><button disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-600 px-5 py-2.5 text-sm font-extrabold text-white hover:bg-brand-700 disabled:opacity-60 sm:w-auto"><Save size={17} />{submitting ? "Saving..." : "Save member"}</button></div>
      </section>
      <aside className="rounded-lg border border-black/10 bg-white p-5 shadow-sm"><ImageUploadField label="Profile image" value={form.profileImage} onChange={(profileImage) => setForm((current) => ({ ...current, profileImage }))} /></aside>
    </form>
  );
}
