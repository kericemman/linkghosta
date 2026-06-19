import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/shared/Container.jsx";
import { siteContentService } from "../../services/siteContentService.js";

const retainers = [
  {
    name: "Starter",
    price: "$809/month",
    tagline: "For the leader building consistency",
    featured: false,
    includes: [
      "12 ghostwritten posts per month",
      "Profile audit and headline rewrite",
      "Monthly content calendar",
      "One revision round per post",
      "Monthly performance summary"
    ],
    bonus: "Bonus included",
    bestFor: "Founders and executives starting their LinkedIn journey or returning after a long absence."
  },
  {
    name: "Growth",
    price: "$1,250/month",
    tagline: "Our most popular package",
    featured: true,
    includes: [
      "16 ghostwritten posts per month (4/week)",
      "Full profile optimisation",
      "Content strategy and monthly calendar",
      "Carousel or article (1 per month)",
      "Engagement management (comments and replies)",
      "Unlimited revisions",
      "Detailed monthly performance report"
    ],
    bonus: "Bonus: Full profile optimization",
    bestFor: "Founders and CEOs actively building pipeline and authority."
  },
  {
    name: "Executive",
    price: "$1,799/month",
    tagline: "Full-service. For leaders who want everything handled.",
    featured: false,
    includes: [
      "20-24 ghostwritten posts per month",
      "Full profile management",
      "Carousels, articles, and newsletters",
      "Full engagement and DM management",
      "Weekly content review calls",
      "Competitor and audience monitoring",
      "Priority turnaround",
      "Quarterly brand strategy session"
    ],
    bonus: "Bonus: Full profile optimization, and a weekly LinkedIn Newsletter",
    bestFor:
      "High-profile founders, CEOs, public figures, politicians, and celebrities who need a premium, discreet, fully managed presence."
  }
];

const oneTimePackages = [
  {
    name: "Profile Makeover",
    price: "$350",
    description: "Full profile rewrite and optimization. Delivered in 3 business days."
  },
  {
    name: "Brand Strategy Session",
    price: "$530",
    description:
      "90-minute strategy session plus a written personal brand roadmap. For leaders who want strategic clarity before committing to a retainer."
  }
];

function RetainerCard({ tier }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-[2rem] border p-6 shadow-[0_24px_70px_rgba(124,45,18,0.08)] sm:p-7 ${
        tier.featured
          ? "border-brand-500/35 bg-ink-soft text-white shadow-[0_28px_80px_rgba(11,11,11,0.20)]"
          : "border-brand-500/15 bg-white text-ink"
      }`}
    >
      {tier.featured ? (
        <span className="absolute right-5 top-5 rounded-full border border-brand-300/30 bg-brand-gradient px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(234,88,12,0.28)]">
          Popular
        </span>
      ) : null}

      <div className="pr-24">
        <h2 className="text-2xl font-extrabold tracking-tight">{tier.name}</h2>
        <p className={`mt-3 text-sm font-bold leading-6 ${tier.featured ? "text-white/70" : "text-neutral-600"}`}>
          {tier.tagline}
        </p>
      </div>

      <p className="mt-6 text-4xl font-extrabold tracking-tight">{tier.price}</p>

      <div className={`mt-7 border-t pt-7 ${tier.featured ? "border-white/10" : "border-ink/10"}`}>
        <ul className="grid gap-3">
          {tier.includes.map((item) => (
            <li key={item} className={`flex gap-3 text-sm leading-6 ${tier.featured ? "text-white/78" : "text-neutral-700"}`}>
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  tier.featured ? "bg-white/10 text-brand-200" : "bg-brand-500/10 text-brand-700"
                }`}
              >
                <Check size={14} strokeWidth={3} aria-hidden="true" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`mt-7 rounded-2xl border p-4 ${
          tier.featured ? "border-white/10 bg-white/[0.06]" : "border-brand-500/15 bg-brand-50"
        }`}
      >
        <p className={`text-sm font-extrabold leading-6 ${tier.featured ? "text-white" : "text-ink"}`}>{tier.bonus}</p>
      </div>

      <p className={`mt-5 text-sm leading-7 ${tier.featured ? "text-white/72" : "text-neutral-700"}`}>
        <span className={tier.featured ? "font-extrabold text-white" : "font-extrabold text-ink"}>Best for:</span>{" "}
        {tier.bestFor}
      </p>

      <Link
        to="/contact"
        className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
          tier.featured
            ? "border border-brand-300/30 bg-brand-gradient text-white shadow-[0_18px_45px_rgba(234,88,12,0.32),inset_0_1px_0_rgba(255,255,255,0.28)] hover:brightness-110 focus-visible:outline-brand-300"
            : "border border-ink/10 bg-ink-soft text-white shadow-[0_18px_45px_rgba(11,11,11,0.14)] hover:bg-ink focus-visible:outline-brand-500"
        }`}
      >
        <span>Choose {tier.name}</span>
        <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
      </Link>
    </article>
  );
}

export default function PricingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [displayRetainers, setDisplayRetainers] = useState(retainers);
  useEffect(() => {
    document.title = "Pricing - LinkGhosta";
    siteContentService.get().then(({ data }) => {
      const managed = data.data?.pricingTiers?.filter((item) => item.isActive !== false);
      if (managed?.length) setDisplayRetainers(managed.map((item) => ({
        ...item,
        price: `${item.price}${item.cadence || ""}`,
        tagline: item.description,
        includes: item.features || [],
        bonus: item.bonus || "Package bonus included"
      })));
    }).catch(() => {});
  }, []);

  return (
    <div className="-mx-4 -mb-8 bg-white text-ink">
      <section className="overflow-hidden bg-white  py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-brand-500/15 bg-surface-warm px-6 py-12 shadow-[0_24px_70px_rgba(124,45,18,0.10)] sm:px-10 lg:px-14 lg:py-16">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(249,115,22,0.22),transparent_32%),linear-gradient(120deg,rgba(255,255,255,0.94),rgba(255,247,237,0.82))]"
              aria-hidden="true"
            />
            <div className="relative max-w-5xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Pricing</p>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Transparent pricing. No surprises.
              </h1>
              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 sm:text-xl">
                We offer three retainer tiers and two one-time packages. All retainers are monthly, with a minimum
                3-month commitment, because personal branding compounds, and three months is the minimum to see real
                results.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-warm  py-10 sm:py-20 lg:py-24">
        <Container>
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Retainer tiers</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              Monthly support for leaders building serious visibility.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {displayRetainers.map((tier) => (
              <RetainerCard key={tier.name} tier={tier} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">One-time packages</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
                Focused help when you need a fast, strategic upgrade.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {oneTimePackages.map((item) => (
                <article
                  key={item.name}
                  className="rounded-[2rem] border border-brand-500/15 bg-white p-6 shadow-[0_24px_70px_rgba(124,45,18,0.08)] sm:p-7"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="text-2xl font-extrabold tracking-tight text-ink">{item.name}</h3>
                      <p className="mt-3 text-4xl font-extrabold tracking-tight text-brand-700">{item.price}</p>
                    </div>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-700">
                      <Sparkles size={22} strokeWidth={2.35} aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-neutral-700">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-brand-500/15 bg-brand-50 p-6 shadow-[0_18px_50px_rgba(124,45,18,0.06)] sm:p-7">
            <p className="text-base font-bold leading-8 text-ink">
              Custom packages available for organisations, government bodies, accelerators, and multi-executive
              retainers. Get in touch to discuss.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-surface-warm py-10 sm:py-20 lg:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_20%_15%,rgba(249,115,22,0.30),transparent_32%),linear-gradient(135deg,#151210,#0b0b0b)] px-6 py-12 text-center text-white shadow-[0_28px_90px_rgba(0,0,0,0.35)] sm:px-10 lg:px-14 lg:py-16">
            <div
              className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:48px_48px]"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Not sure which tier is right for you?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-neutral-300">
                Book a free 30-minute discovery call, and we'll tell you honestly.
              </p>
              <Link
                to="/contact"
                className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-300/30 bg-brand-gradient px-7 py-4 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(234,88,12,0.34),inset_0_1px_0_rgba(255,255,255,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-300 sm:w-auto"
              >
                <span>Book a free discovery call</span>
                <ArrowRight
                  size={18}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
