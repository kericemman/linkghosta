import { NavLink } from "react-router-dom";

const variantClasses = {
  desktop:
    "rounded-md px-2.5 py-2 text-sm font-medium text-neutral-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400",
  mobile:
    "block rounded-md px-3 py-3 text-base font-medium text-neutral-200 transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
};

const activeClasses = {
  desktop: "text-brand-300",
  mobile: "bg-brand-500/10 text-brand-300"
};

export default function NavigationLink({ item, variant = "desktop", onClick }) {
  const isHome = item.href === "/";

  return (
    <NavLink
      to={item.href}
      end={isHome}
      onClick={onClick}
      className={({ isActive }) =>
        `${variantClasses[variant] || variantClasses.desktop} ${isActive ? activeClasses[variant] || activeClasses.desktop : ""}`
      }
    >
      {item.label}
    </NavLink>
  );
}
