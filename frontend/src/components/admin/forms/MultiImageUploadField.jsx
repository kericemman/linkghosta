import { Images, LoaderCircle, Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { mediaService } from "../../../services/mediaService.js";

export default function MultiImageUploadField({ label = "Images", values = [], onChange, max = 8 }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  async function upload(event) {
    const files = Array.from(event.target.files || []).slice(0, Math.max(0, max - values.length));
    if (!files.length) return;
    setUploading(true);
    const results = await Promise.allSettled(files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name.replace(/\.[^.]+$/, ""));
      const { data } = await mediaService.uploadMedia(formData);
      return data.data.url;
    }));
    const uploaded = results.filter((result) => result.status === "fulfilled").map((result) => result.value);
    if (uploaded.length) {
      onChange([...values, ...uploaded]);
      toast.success(`${uploaded.length} image${uploaded.length === 1 ? "" : "s"} uploaded`);
    }
    const failures = results.length - uploaded.length;
    if (failures) toast.error(`${failures} image${failures === 1 ? "" : "s"} could not be uploaded`);
    setUploading(false);
    event.target.value = "";
  }

  function remove(index) {
    onChange(values.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3"><p className="text-sm font-bold">{label}</p><span className="text-xs text-neutral-400">{values.length}/{max}</span></div>
      {values.length > 0 && <div className="mt-3 grid grid-cols-2 gap-3">{values.map((url, index) => <div key={`${url}-${index}`} className="group relative overflow-hidden rounded-md border border-neutral-200 bg-neutral-50"><img src={url} alt={`Uploaded result ${index + 1}`} className="aspect-square w-full object-cover" /><button type="button" onClick={() => remove(index)} title="Remove image" className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md bg-white/95 text-red-600 opacity-100 shadow-sm sm:opacity-0 sm:group-hover:opacity-100"><X size={16} /></button></div>)}</div>}
      {values.length < max && <button type="button" disabled={uploading} onClick={() => inputRef.current?.click()} className="mt-3 flex min-h-24 w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 text-center hover:border-brand-400 hover:bg-brand-50 disabled:opacity-60">{uploading ? <LoaderCircle className="animate-spin text-brand-600" size={23} /> : values.length ? <Plus className="text-brand-600" size={23} /> : <Images className="text-brand-600" size={23} />}<span className="mt-2 text-sm font-bold">{uploading ? "Uploading..." : values.length ? "Add more images" : "Upload result images"}</span><span className="mt-1 text-xs text-neutral-500">Select one or multiple images</span></button>}
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={upload} className="sr-only" />
    </div>
  );
}
