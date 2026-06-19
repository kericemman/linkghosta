import { ImagePlus, LoaderCircle, UploadCloud, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { mediaService } from "../../../services/mediaService.js";
import { getErrorMessage } from "../../../utils/getErrorMessage.js";

export default function ImageUploadField({ label = "Image", value = "", onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  async function upload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", file.name.replace(/\.[^.]+$/, ""));
    setUploading(true);
    try {
      const { data } = await mediaService.uploadMedia(formData);
      onChange(data.data.url);
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div>
      <p className="text-sm font-bold">{label}</p>
      {value ? (
        <div className="mt-2 overflow-hidden rounded-md border border-neutral-200 bg-neutral-50">
          <img src={value} alt="Selected" className="aspect-[16/7] w-full object-cover" />
          <div className="flex items-center justify-between gap-3 p-3">
            <p className="min-w-0 truncate text-xs text-neutral-500">{value}</p>
            <button type="button" onClick={() => onChange("")} title="Remove image" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-red-600 hover:bg-red-50"><X size={17} /></button>
          </div>
        </div>
      ) : (
        <button type="button" disabled={uploading} onClick={() => inputRef.current?.click()} className="mt-2 flex min-h-32 w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 text-center hover:border-brand-400 hover:bg-brand-50 disabled:opacity-60">
          {uploading ? <LoaderCircle className="animate-spin text-brand-600" size={25} /> : <ImagePlus className="text-brand-600" size={25} />}
          <span className="mt-2 text-sm font-bold">{uploading ? "Uploading image..." : "Upload from computer"}</span>
          <span className="mt-1 text-xs text-neutral-500">JPG, PNG, WebP or GIF, up to 5 MB</span>
        </button>
      )}
      {value && <button type="button" disabled={uploading} onClick={() => inputRef.current?.click()} className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-brand-700"><UploadCloud size={16} />Replace image</button>}
      <input ref={inputRef} type="file" accept="image/*" onChange={upload} className="sr-only" />
    </div>
  );
}
