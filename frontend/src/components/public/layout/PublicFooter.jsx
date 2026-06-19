import { ArrowUpRight, Globe2, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { footerNavigationGroups } from "../../../constants/navigation";
import PublicLogo from "../navigation/PublicLogo.jsx";

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink-soft text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:px-8 lg:py-16">
        <section className="max-w-sm">
          
          <p className="mt-5 text-sm leading-6 text-neutral-300">
            LinkedIn personal branding, ghostwriting, and strategic content management for leaders building visible and
            credible brands.
          </p>

          <div className="mt-6 space-y-3 text-sm text-neutral-300">
            <p className="flex items-center gap-2">
              <MapPin size={16} aria-hidden="true" className="shrink-0 text-brand-400" />
              <span>Nairobi, Kenya</span>
            </p>
            <p className="flex items-center gap-2">
              <Globe2 size={16} aria-hidden="true" className="shrink-0 text-brand-400" />
              <span>Working with clients globally.</span>
            </p>
          </div>
        </section>

        {footerNavigationGroups.map((group) => (
          <nav key={group.title} aria-label={`${group.title} footer navigation`}>
            <h2 className="text-sm font-semibold text-white">{group.title}</h2>
            <ul className="mt-4 space-y-3">
              {group.links.map((item) => (
                <li key={`${group.title}-${item.label}`}>
                  <Link
                    to={item.href}
                    className="text-sm text-neutral-300 transition hover:text-brand-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <section>
          <h2 className="text-sm font-semibold text-white">Contact</h2>
          <div className="mt-4 space-y-4">
            <a
              href="mailto:hello@linkghosta.com"
              className="flex min-w-0 items-center gap-2 text-sm text-neutral-300 transition hover:text-brand-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
            >
              <Mail size={16} aria-hidden="true" className="shrink-0 text-brand-400" />
              <span className="break-all">hello@linkghosta.com</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-brand-300/30 bg-brand-gradient px-5 py-2.5 text-sm font-bold text-white text-sm shadow-[0_12px_30px_rgba(234,88,12,0.22),inset_0_1px_0_rgba(255,255,255,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-300"
            >
              <span>Contact Us</span>
              <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden="true" />
            </Link>

            <a href="tel:254718181952"
              className="flex min-w-0 items-center gap-2 text-sm text-neutral-300 transition hover:text-brand-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
            >
              <Phone size={16} aria-hidden="true" className="shrink-0 text-brand-400" />
              <span className="break-all">+254 718 181 952</span>
            </a>
          </div>
        </section>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-neutral-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <p>&copy; {currentYear} LinkGhosta. All rights reserved.</p>
            <a href="https://thedigitalagame.com" target="_blank" rel="noreferrer" className="transition hover:text-brand-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400">Designed by TDAG</a>
          </div>
          <nav aria-label="Legal navigation" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              to="/privacy-policy"
              className="transition hover:text-brand-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="transition hover:text-brand-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
