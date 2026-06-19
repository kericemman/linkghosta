import { Crown, Megaphone, Route } from "lucide-react";
import Container from "../../../shared/Container.jsx";

const deliverables = [
  {
    title: "Presence",
    icon: Megaphone,
    description: "Consistent, high-quality content that keeps you visible to the people who matter."
  },
  {
    title: "Authority",
    icon: Crown,
    description: "Posts, articles, and a profile that position you as the go-to voice in your space."
  },
  {
    title: "Pipeline",
    icon: Route,
    description: "A LinkedIn presence that turns profile visitors into inbound enquiries, opportunities, and deals."
  }
];

export default function WhatWeDoSection() {
  return (
    <section className="-mx-4 bg-white px-2 py-5 text-ink sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">What we do</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              We become you. On LinkedIn.
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-neutral-700 sm:text-lg">
              We ghostwrite, strategise, and manage your LinkedIn presence from end to end, so your profile sounds like
              you on your best day, every day. Your ideas, your voice, your story. We just do the writing, the posting,
              the strategy, and the reporting.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {deliverables.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group rounded-3xl border border-brand-500/15 bg-surface-warm p-6 shadow-[0_18px_55px_rgba(124,45,18,0.07)] transition duration-200 hover:-translate-y-1 hover:border-brand-500/35 hover:bg-white"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-[0_12px_30px_rgba(234,88,12,0.24)]">
                  <Icon size={22} strokeWidth={2.3} aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-extrabold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-700 sm:text-base">{item.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
