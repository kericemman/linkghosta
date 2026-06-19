import { BadgeCheck, Globe2, UsersRound } from "lucide-react";
import Container from "../../../shared/Container.jsx";

const leaderTypes = ["Founders", "CEOs", "Executives", "Public figures", "Celebrities", "Politicians"];

export default function WhoWeWorkWithSection() {
  return (
    <section className="-mx-4 bg-ink-soft px-2 py-5 text-white sm:py-20 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div className="max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-300">Who we work with</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Built for leaders who move fast
          </h2>

          <div className="mt-7 space-y-5 text-base leading-8 text-neutral-300 sm:text-lg">
            <p>
              We work with founders, CEOs, executives, public figures, celebrities, and politicians who want a LinkedIn
              presence that reflects the scale of what they're building, without adding another thing to their plate.
            </p>
            <p>
              Our clients are based in Africa, Australia, the Middle East, Europe, the UK, and the Americas. What they
              have in common is this: <span className="font-extrabold text-white">they're serious about being seen.</span>
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-5 rounded-[2rem] bg-brand-500/10 blur-3xl" aria-hidden="true" />
          <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur">
            <div className="flex items-center gap-3 rounded-3xl border border-brand-400/20 bg-brand-500/10 p-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white">
                <UsersRound size={23} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-white">Leaders with momentum</p>
                <p className="text-sm text-neutral-300">Visible brands, sharper presence.</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {leaderTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-bold text-neutral-100"
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <Globe2 className="text-brand-300" size={22} aria-hidden="true" />
                <p className="mt-3 text-sm font-extrabold text-white">Global reach</p>
                <p className="mt-1 text-sm leading-6 text-neutral-300">Africa, Australia, the Middle East, Europe, the UK, and the Americas.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <BadgeCheck className="text-brand-300" size={22} aria-hidden="true" />
                <p className="mt-3 text-sm font-extrabold text-white">Serious visibility</p>
                <p className="mt-1 text-sm leading-6 text-neutral-300">For people building reputations at speed and scale.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
