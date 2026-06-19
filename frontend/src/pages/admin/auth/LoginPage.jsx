import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.js";
import { getErrorMessage } from "../../../utils/getErrorMessage.js";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(event) {
    event.preventDefault(); setLoading(true);
    try { await login(form); navigate(location.state?.from?.pathname || "/admin", { replace: true }); }
    catch (error) { toast.error(getErrorMessage(error)); }
    finally { setLoading(false); }
  }

  return (
    <section className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-black/10 bg-white shadow-2xl lg:grid-cols-[0.85fr_1fr]">
      <div className="hidden bg-ink p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3"><img src="/assets/logo.png" alt="LinkGhosta" className="h-12 w-12 rounded-md object-cover" /><span className="text-lg font-extrabold">LinkGhosta</span></div>
        <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-400">Private workspace</p><h1 className="mt-4 text-4xl font-extrabold leading-tight">Your content operation, in one calm place.</h1><p className="mt-4 text-sm leading-7 text-white/60">Manage stories, people, leads, and the website content clients see.</p></div>
      </div>
      <div className="p-6 sm:p-10 lg:p-14">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-700">Admin access</p><h2 className="mt-3 text-3xl font-extrabold">Welcome back</h2><p className="mt-2 text-sm text-neutral-600">Sign in to continue to your dashboard.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block"><span className="text-sm font-bold">Email address</span><span className="mt-2 flex items-center gap-3 rounded-md border border-neutral-300 px-3 focus-within:border-brand-500"><Mail size={18} className="text-neutral-400"/><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border-0 bg-transparent py-3 outline-none" placeholder="you@linkghosta.com" /></span></label>
          <label className="block"><span className="text-sm font-bold">Password</span><span className="mt-2 flex items-center gap-3 rounded-md border border-neutral-300 px-3 focus-within:border-brand-500"><LockKeyhole size={18} className="text-neutral-400"/><input required type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full border-0 bg-transparent py-3 outline-none" placeholder="Enter your password" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button></span></label>
          <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-600 px-5 py-3 font-extrabold text-white hover:bg-brand-700 disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}<ArrowRight size={18}/></button>
        </form>
      </div>
    </section>
  );
}
