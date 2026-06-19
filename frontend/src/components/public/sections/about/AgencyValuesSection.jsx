import { BadgeCheck, Globe2, LockKeyhole, Mic2 } from "lucide-react";
import Container from "../../../shared/Container.jsx";

const values = [
  {
    title: "Voice first.",
    icon: Mic2,
    description:
      "We study how you think, how you speak, what you believe, and we write from that place. Every post sounds like you on your best day."
  },
  {
    title: "Results over vanity.",
    icon: BadgeCheck,
    description:
      "Follower counts are a side effect. Our real work is inbound leads, speaking invitations, investor conversations, and opportunities that trace back directly to LinkedIn."
  },
  {
    title: "Africa-rooted, globally fluent.",
    icon: Globe2,
    description:
      "We were built in Nairobi. We work across the world. We understand both contexts, and we don't ask our clients to choose."
  },
  {
    title: "Discretion, always.",
    icon: LockKeyhole,
    description: "Ghostwriting requires trust. What we do for you stays between us."
  }
];

export default function AgencyValuesSection() {
  return (
    <section className="-mx-4 -mb-8 bg-surface-warm px-4 py-10 text-ink sm:py-20 lg:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Agency values</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            The principles behind the work.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article key={value.title} className="rounded-3xl border border-brand-500/15 bg-white p-6 shadow-[0_18px_55px_rgba(124,45,18,0.07)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-extrabold text-ink">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-700 sm:text-base">{value.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
