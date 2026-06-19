import { Link } from "react-router-dom";

const sizeClasses = {
  default: "h-14 w-[128px] sm:h-[68px] sm:w-[155px] lg:w-[178px]",
  small: "h-10 w-[91px] sm:h-11 sm:w-[100px]",
};

export default function PublicLogo({ size = "default", className = "" }) {
  return (
    <Link
      to="/"
      aria-label="LinkGhosta home"
      className={`group inline-flex shrink-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400 ${className}`}
    >
      <img
        src="/assets/logo-navbar.png"
        alt=""
        aria-hidden="true"
        className={`block shrink-0 object-contain object-center ${sizeClasses[size] || sizeClasses.default}`}
      />
    </Link>
  );
}
