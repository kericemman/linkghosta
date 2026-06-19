import { Globe2, Linkedin, MessageSquareText, Sparkles, TrendingUp, Users } from "lucide-react";

const proofItems = [
  {
    icon: TrendingUp,
    emphasis: "100,000+ LinkedIn followers",
    text: "built organically across founder and executive brands"
  },
  {
    icon: Globe2,
    emphasis: "Clients across Africa, Australia, Europe,",
    text: "the Middle East & the Americas"
  },
  {
    icon: Sparkles,
    emphasis: "Personal brands",
    text: "that attract deals, press, and opportunities"
  }
];

export default function SocialProofBar() {
  return (
    <section className="-mx-4 -mb-8 border-y border-ink/10 bg-white text-ink">
      <div className="mx-auto grid max-w-7xl gap-6 px-2 py-6 sm:px-6 lg:grid-cols-[0.78fr_1fr] lg:items-center lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-ink-soft via-brand-900 to-brand-600 p-4 text-white shadow-[0_22px_60px_rgba(234,88,12,0.20)]">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
          <div className="relative flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-lg shadow-black/15">
              <Linkedin size={24} strokeWidth={2.4} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/70">LinkedIn visibility engine</p>
              <p className="mt-1 text-sm font-bold text-white">Authority, reach, and reputation in motion</p>
            </div>
          </div>

          <div className="relative mt-5 grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-white/12 p-3 backdrop-blur">
              <Users size={17} aria-hidden="true" />
              <div className="mt-3 h-2 w-10 rounded-full bg-white/60" />
            </div>
            <div className="rounded-2xl bg-white/12 p-3 backdrop-blur">
              <MessageSquareText size={17} aria-hidden="true" />
              <div className="mt-3 h-2 w-12 rounded-full bg-white/60" />
            </div>
            <div className="rounded-2xl bg-white/12 p-3 backdrop-blur">
              <TrendingUp size={17} aria-hidden="true" />
              <div className="mt-3 h-2 w-9 rounded-full bg-white/60" />
            </div>
          </div>
        </div>

        <div className="grid gap-0 rounded-3xl border border-brand-500/15 bg-white/90 shadow-[0_18px_55px_rgba(124,45,18,0.08)] backdrop-blur lg:grid-cols-3">
          {proofItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.emphasis}
                className={`flex gap-3 p-5 ${index > 0 ? "border-t border-ink/10 lg:border-l lg:border-t-0" : ""}`}
              >
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-500/20 bg-brand-500/10 text-brand-600">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <p className="text-sm leading-6 text-neutral-700">
                  <span className="font-extrabold text-ink">{item.emphasis}</span> {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
