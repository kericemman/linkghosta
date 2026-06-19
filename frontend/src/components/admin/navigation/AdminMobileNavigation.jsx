import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { adminNavigation } from "../../../constants/navigation.js";

export default function AdminMobileNavigation() {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/10 bg-ink px-4 py-3 text-white lg:hidden">
      <div className="flex items-center justify-between"><span className="font-extrabold">LinkGhosta Admin</span><button aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)} className="p-2">{open ? <X /> : <Menu />}</button></div>
      {open && <nav className="mt-3 grid gap-1 border-t border-white/10 pt-3">{adminNavigation.filter((item) => item.href !== "#logout").map((item) => <NavLink key={item.href} to={item.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-semibold text-white/75 hover:bg-white/10">{item.label}</NavLink>)}</nav>}
    </div>
  );
}
