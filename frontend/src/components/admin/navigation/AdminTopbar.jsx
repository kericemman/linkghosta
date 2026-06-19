import { ExternalLink } from "lucide-react";
import useAuth from "../../../hooks/useAuth.js";

export default function AdminTopbar() {
  const { admin } = useAuth();
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-black/10 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div><p className="text-sm font-extrabold text-ink">Workspace</p><p className="text-xs text-neutral-500">Signed in as {admin?.name || "Admin"}</p></div>
      <a href="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-sm font-bold text-neutral-700 hover:border-brand-300 hover:text-brand-700">View website <ExternalLink size={15} /></a>
    </header>
  );
}
