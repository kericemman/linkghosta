export default function Button({ children, className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-full border border-brand-300/30 bg-brand-gradient px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(234,88,12,0.22),inset_0_1px_0_rgba(255,255,255,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
