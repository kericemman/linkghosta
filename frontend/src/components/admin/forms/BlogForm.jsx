import { Save } from "lucide-react";
import { useState } from "react";
import ImageUploadField from "./ImageUploadField.jsx";
import RichTextEditor from "./RichTextEditor.jsx";

const inputClass = "mt-2 w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10";
const initialForm = { title: "", category: "Personal branding", excerpt: "", content: "", coverImage: "", author: "LinkGhosta", metaDescription: "", readTime: 5, status: "draft", featured: false };

export default function BlogForm({ initialValue = {}, onSubmit, submitting = false }) {
  const [form, setForm] = useState({ ...initialForm, ...initialValue });
  const [contentError, setContentError] = useState(false);
  const field = (name) => ({ value: form[name] ?? "", onChange: (event) => setForm((current) => ({ ...current, [name]: event.target.value })) });
  function submit(event) {
    event.preventDefault();
    const hasContent = form.content.replace(/<[^>]*>/g, "").trim().length > 0;
    setContentError(!hasContent);
    if (!hasContent) return;
    onSubmit({ ...form, readTime: Number(form.readTime) });
  }

  return (
    <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <section className="space-y-6 rounded-lg border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <div><label className="text-sm font-bold">Article title</label><input required {...field("title")} className={`${inputClass} text-base font-semibold`} placeholder="A clear, specific title" /></div>
        <div><label className="text-sm font-bold">Short excerpt</label><textarea required rows="3" {...field("excerpt")} className={inputClass} placeholder="A concise summary for article cards and search results." /></div>
        <div>
          <label className="text-sm font-bold">Article content</label>
          <RichTextEditor value={form.content} onChange={(content) => { setForm((current) => ({ ...current, content })); setContentError(false); }} placeholder="Write your article..." />
          {contentError && <p className="mt-2 text-sm font-semibold text-red-600">Article content is required.</p>}
        </div>
        <div><label className="text-sm font-bold">Search description</label><textarea rows="2" maxLength="160" {...field("metaDescription")} className={inputClass} placeholder="Up to 160 characters" /><p className="mt-1 text-right text-xs text-neutral-400">{form.metaDescription.length}/160</p></div>
      </section>

      <aside className="space-y-5">
        <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-extrabold">Publishing</h2>
          <label className="mt-4 block text-sm font-bold">Status<select {...field("status")} className={inputClass}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
          <label className="mt-4 flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} />Featured article</label>
          <button disabled={submitting} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-600 px-5 py-2.5 text-sm font-extrabold text-white hover:bg-brand-700 disabled:opacity-60"><Save size={17} />{submitting ? "Saving..." : "Save article"}</button>
        </section>
        <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm"><ImageUploadField label="Cover image" value={form.coverImage} onChange={(coverImage) => setForm((current) => ({ ...current, coverImage }))} /></section>
        <section className="space-y-4 rounded-lg border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-extrabold">Article details</h2>
          <label className="block text-sm font-bold">Category<input {...field("category")} className={inputClass} /></label>
          <label className="block text-sm font-bold">Author<input {...field("author")} className={inputClass} /></label>
          <label className="block text-sm font-bold">Read time<input type="number" min="1" {...field("readTime")} className={inputClass} /></label>
        </section>
      </aside>
    </form>
  );
}
