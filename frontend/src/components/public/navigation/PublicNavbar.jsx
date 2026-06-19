import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { publicNavigation } from "../../../constants/navigation";
import MobileNavigation from "./MobileNavigation.jsx";
import NavigationLink from "./NavigationLink.jsx";
import PublicLogo from "./PublicLogo.jsx";

const menuId = "public-mobile-navigation";

export default function PublicNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 bg-ink-soft transition-shadow duration-200 ${
        isScrolled ? "shadow-lg shadow-black/20" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:h-24 sm:px-6 lg:px-8">
        <PublicLogo />

        <nav aria-label="Public navigation" className="hidden items-center gap-1 xl:flex">
          {publicNavigation.map((item) => (
            <NavigationLink key={item.href} item={item} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden items-center gap-2 rounded-full border border-brand-300/30 bg-brand-gradient px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(234,88,12,0.28),inset_0_1px_0_rgba(255,255,255,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-300 sm:inline-flex"
          >
            <span>Book a Discovery Call</span>
            <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden="true" />
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:border-brand-400 hover:bg-brand-500/10 hover:text-brand-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400 xl:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <MobileNavigation isOpen={isMenuOpen} menuId={menuId} onNavigate={closeMenu} />
    </header>
  );
}
