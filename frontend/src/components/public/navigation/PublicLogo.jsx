import { Link } from "react-router-dom";
import navbarLogo from "../../../assets/logo-icon-black.png";

const sizeClasses = {
  default: "h-12 w-9 sm:h-14 sm:w-10 lg:h-16 lg:w-12",
  small: "h-10 w-8 sm:h-11 sm:w-8",
};

export default function PublicLogo({ size = "default", className = "" }) {
  return (
    <Link
      to="/"
      aria-label="LinkGhosta home"
      className={`group inline-flex shrink-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400 ${className}`}
    >
      <img
        src={navbarLogo}
        alt="logo Image"
        aria-hidden="true"
        className={`block shrink-0 object-contain object-center ${sizeClasses[size] || sizeClasses.default}`}
      />
    </Link>
  );
}
