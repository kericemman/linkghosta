import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AdminPageHeader from "../../../components/admin/layout/AdminPageHeader.jsx";
import { profileService } from "../../../services/profileService.js";
import { getErrorMessage } from "../../../utils/getErrorMessage.js";

export default function AdminProfilePage() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [busy, setBusy] = useState(false);
  useEffect(() => { profileService.getAdminProfile().then(({ data }) => setForm({ name: data.data.name, email: data.data.email })); }, []);
  async function save(event) {
    event.preventDefault(); setBusy(true);
    try { await profileService.updateAdminProfile(form); toast.success("Profile updated"); }
    catch (error) { toast.error(getErrorMessage(error)); }
    finally { setBusy(false); }
  }
  return <div className="mx-auto max-w-2xl"><AdminPageHeader title="Profile" description="Manage your dashboard identity and security."/><form onSubmit={save} className="space-y-5 rounded-lg border border-black/10 bg-white p-6"><label className="block text-sm font-bold">Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2.5"/></label><label className="block text-sm font-bold">Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2.5"/></label><div className="flex items-center justify-between border-t pt-5"><Link to="/admin/profile/change-password" className="text-sm font-bold text-brand-700">Change password</Link><button disabled={busy} className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2.5 text-sm font-bold text-white"><Save size={16}/>Save profile</button></div></form></div>;
}
