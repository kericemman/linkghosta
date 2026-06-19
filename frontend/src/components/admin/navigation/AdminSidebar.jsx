import { LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { adminNavigation } from "../../../constants/navigation.js";
import useAuth from "../../../hooks/useAuth.js";

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  async function signOut() { await logout(); navigate("/admin/login", { replace: true }); }
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-black/10 bg-white p-4 lg:flex lg:flex-col">
      <NavLink to="/admin" className="flex items-center gap-3 px-2 pb-5 pt-1">
        <img src="/assets/logo.png" alt="LinkGhosta" className="h-10 w-10 rounded-md object-cover" />
        <div><p className="text-sm font-extrabold text-ink">LinkGhosta</p><p className="text-xs text-neutral-500">Admin workspace</p></div>
      </NavLink>
      <div className="h-px bg-neutral-200" />
      <nav aria-label="Admin navigation" className="mt-5 flex-1 space-y-1 overflow-y-auto">
        {adminNavigation.filter((item) => item.href !== "#logout").map((item) => {
          const Icon = item.icon;
          return <NavLink key={item.label} to={item.href} end={item.href === "/admin"} className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition ${isActive ? "bg-brand-50 text-brand-700" : "text-neutral-600 hover:bg-neutral-100 hover:text-ink"}`}><Icon size={18} aria-hidden="true" /><span>{item.label}</span></NavLink>;
        })}
      </nav>
      <div className="border-t border-neutral-200 pt-3"><button onClick={signOut} className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-red-50 hover:text-red-700"><LogOut size={18} />Sign out</button></div>
    </aside>
  );
}
