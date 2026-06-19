import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AdminPageHeader from "../../../components/admin/layout/AdminPageHeader.jsx";
import { profileService } from "../../../services/profileService.js";
import { getErrorMessage } from "../../../utils/getErrorMessage.js";

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  async function save(event) {
    event.preventDefault();
    if (form.newPassword !== form.confirmPassword) return toast.error("New passwords do not match");
    try { await profileService.changeAdminPassword({ currentPassword: form.currentPassword, newPassword: form.newPassword }); toast.success("Password changed"); navigate("/admin/profile"); }
    catch (error) { toast.error(getErrorMessage(error)); }
  }
  return <div className="mx-auto max-w-2xl"><AdminPageHeader title="Change password"/><form onSubmit={save} className="space-y-5 rounded-lg border border-black/10 bg-white p-6">{[["currentPassword","Current password"],["newPassword","New password"],["confirmPassword","Confirm new password"]].map(([key,label]) => <label key={key} className="block text-sm font-bold">{label}<input required minLength={key === "currentPassword" ? 1 : 8} type="password" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2.5"/></label>)}<button className="rounded-md bg-brand-600 px-4 py-2.5 text-sm font-bold text-white">Update password</button></form></div>;
}
