import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { publicNavigation } from "../../../constants/navigation";
import NavigationLink from "./NavigationLink.jsx";

export default function MobileNavigation({ isOpen, menuId, onNavigate }) {
  return (
    <div
      id={menuId}
      aria-hidden={!isOpen}
      inert={isOpen ? undefined : ""}
      className={`xl:hidden overflow-hidden border-t border-white/10 bg-ink-soft transition-[max-height,opacity] duration-200 ${
        isOpen ? "max-h-[calc(100vh-76px)] opacity-100" : "pointer-events-none max-h-0 opacity-0"
      }`}
    >
      <nav aria-label="Mobile public navigation" className="max-h-[calc(100vh-76px)] overflow-y-auto px-4 py-4">
        <div className="space-y-1">
          {publicNavigation.map((item) => (
            <NavigationLink key={item.href} item={item} variant="mobile" onClick={onNavigate} />
          ))}
        </div>

        <Link
          to="/contact"
          onClick={onNavigate}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-300/30 bg-brand-gradient px-5 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(234,88,12,0.24),inset_0_1px_0_rgba(255,255,255,0.28)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
        >
          <span>Book a Discovery Call</span>
          <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden="true" />
        </Link>
      </nav>
    </div>
  );
}
