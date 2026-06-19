import {
  ArrowRight,
  BarChart3,
  Check,
  ClipboardList,
  FileText,
  GraduationCap,
  MessageCircle,
  PenLine,
  Search,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../../../shared/Container.jsx";
import ServicesCtaSection from "./ServicesCtaSection.jsx";
import { siteContentService } from "../../../../services/siteContentService.js";

const services = [
  {
    eyebrow: "Service 1",
    title: "LinkedIn Ghostwriting & Management",
    subtitle: "Our flagship. Done for you, end to end.",
    price: "Starts at $809/month",
    image: "/assets/service-ghostwriting.jpg",
    icon: PenLine,
    description:
      "You share your ideas, we do everything else. Posts written in your voice, published on your schedule, optimised for your audience. Monthly reporting included.",
    includes: [
      "Deep onboarding and voice profiling",
      "Content strategy and monthly content calendar",
      "Ghostwritten posts (frequency depends on package)",
      "Profile optimisation",
      "Carousel and article writing",
      "Comment and engagement management",
      "Monthly performance report"
    ],
    note: "Most clients are on our Growth or Executive tiers. Book a call, and we'll recommend the right fit.",
    bestFor: "Founders, CEOs, executives, and public figures who want a premium, fully managed presence."
  },
  {
    eyebrow: "Service 2",
    title: "Personal Brand Strategy",
    subtitle: "For the leader who wants to understand the game before playing it.",
    price: "Starts at $530 one-time",
    image: "/assets/service-strategy.jpg",
    icon: ClipboardList,
    description:
      "A complete LinkedIn strategy built around your goals, your audience, and your positioning. We deliver a full strategic roadmap, you or your team execute it, or you hand it back to us.",
    includes: [
      "Audience and competitor audit",
      "Personal brand positioning framework",
      "Content pillars and messaging architecture",
      "Profile rewrite",
      "90-day content roadmap",
      "One strategy session (video call)"
    ],
    bestFor:
      "Leaders who want strategic clarity before committing to a full retainer, or who have an in-house team that needs direction."
  },
  {
    eyebrow: "Service 3",
    title: "Profile Makeover",
    subtitle: "One-time. High impact. Fast.",
    price: "Starts at $350 one-time",
    image: "/assets/service-profile-makeover.jpg",
    icon: Sparkles,
    description:
      "Your LinkedIn profile is your first impression. We rewrite it completely - headline, banner, about section, experience framing, featured section - so it works as a conversion tool.",
    includes: [
      "Full profile audit",
      "Rewritten headline, tagline, and about section",
      "Experience section repositioning",
      "Featured section strategy and copy",
      "Skills and keyword optimisation",
      "Delivery within 5 business days",
      "New banner"
    ],
    note: "The fastest way to make your first impression work harder.",
    bestFor:
      "Leaders preparing for a fundraise, a speaking circuit, a new market, or anyone whose profile hasn't been touched in years."
  },
  {
    eyebrow: "Service 4",
    title: "LinkedIn Training & Workshops",
    subtitle: "For teams, companies, and individuals who want to build the skill in-house.",
    price: "Starts at $530 per workshop",
    image: "/assets/service-training.jpg",
    icon: GraduationCap,
    description:
      "Live training sessions on LinkedIn strategy, personal branding, content creation, and ghostwriting. Delivered virtually or in person.",
    includes: [],
    bestFor:
      "Corporates, accelerators, government agencies, and organisations who want to upskill their leadership teams or executive cohorts.",
    cta: true
  }
];

const processPhases = [
  {
    phase: "Phase 1",
    title: "Discovery",
    timing: "Week 1",
    icon: Search,
    description:
      "We start with a 60-minute onboarding call. This is not a sales call; it's a deep listening session. We want to understand how you think, how you speak, what you believe, what you're building, and what you want LinkedIn to do for your life and business.",
    detail:
      "We follow that call with written questions, a voice profiling exercise, and a review of anything you've written, said, or shared publicly. We study you before we write a word."
  },
  {
    phase: "Phase 2",
    title: "Strategy",
    timing: "Week 2",
    icon: ClipboardList,
    description:
      "We build your content strategy. This includes your personal brand positioning, your content pillars, your target audience profile, and your 30-day content calendar.",
    detail: "You review it. We refine it. Nothing goes live without your sign-off."
  },
  {
    phase: "Phase 3",
    title: "Content Creation",
    timing: "Ongoing",
    icon: FileText,
    description:
      "Our ghostwriters produce your content in batches, typically two weeks ahead. You receive a batch for review via a shared document. You can approve as-is, leave comments, or request changes.",
    detail: "We offer unlimited revisions until it sounds exactly like you. Then we schedule and post."
  },
  {
    phase: "Phase 4",
    title: "Engagement & Management",
    timing: "Ongoing",
    icon: MessageCircle,
    description:
      "Depending on your package, we manage your comments, replies, and community engagement. We also identify opportunities - relevant conversations to join, profiles to connect with, content to respond to.",
    detail: "LinkedIn rewards active accounts. We keep yours active."
  },
  {
    phase: "Phase 5",
    title: "Reporting & Optimisation",
    timing: "Monthly",
    icon: BarChart3,
    description:
      "Every month, you receive a clean performance report: impressions, engagement rate, follower growth, top-performing content, and our strategic recommendations for the following month.",
    detail: "We use data to improve, not just to report."
  }
];

const timelineItems = [
  "Week 1 - Discovery",
  "Week 2 - Strategy",
  "Week 3 - First content batch",
  "Week 4 - Go live",
  "Month 2+ - Ongoing management and optimisation"
];

function ServiceBlock({ service, index }) {
  const Icon = service.icon;
  const serviceNumber = String(index + 1).padStart(2, "0");
  const isReversed = index % 2 === 1;

  return (
    <article className="overflow-hidden rounded-[2rem] border border-brand-500/15 bg-white shadow-[0_24px_70px_rgba(124,45,18,0.08)]">
      <div className="grid lg:min-h-[560px] lg:grid-cols-[0.92fr_1.08fr]">
        <div className={`relative min-h-[290px] overflow-hidden bg-ink-soft sm:min-h-[360px] lg:min-h-full ${isReversed ? "lg:order-2" : ""}`}>
          <img src={service.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-ink/78 via-ink/16 to-brand-500/26" aria-hidden="true" />
          <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2 sm:left-7 sm:top-7">
            <span className="rounded-full border border-white/15 bg-white/15 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">
              {service.eyebrow}
            </span>
            <span className="rounded-full border border-white/15 bg-white/90 px-3 py-1.5 text-sm font-extrabold text-ink">
              {service.price}
            </span>
          </div>
          <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
            <div className="flex items-end justify-between gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/14 text-white shadow-[0_16px_40px_rgba(11,11,11,0.18)] backdrop-blur lg:h-16 lg:w-16">
                <Icon size={24} strokeWidth={2.35} aria-hidden="true" />
              </div>
             <p className="text-5xl font-extrabold leading-none text-white sm:text-6xl lg:text-7xl" aria-hidden="true">
              {serviceNumber}
              </p>
            </div>
            <p className="mt-5 max-w-md text-xl font-extrabold leading-tight text-white sm:text-2xl">{service.subtitle}</p>
          </div>
        </div>

        <div className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12 ${isReversed ? "lg:order-1" : ""}`}>
          <div>
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
              {service.title}
            </h2>
            <div className="rich-content mt-4 text-base leading-8 text-neutral-700" dangerouslySetInnerHTML={{ __html: service.description }} />

            {service.note ? (
              <p className="mt-5 rounded-2xl border border-brand-500/15 bg-brand-50 px-4 py-3 text-sm font-bold leading-7 text-ink shadow-[0_14px_35px_rgba(249,115,22,0.07)]">
                {service.note}
              </p>
            ) : null}
          </div>

          <div className="mt-7 border-t border-ink/10 pt-7">
            {service.includes.length > 0 ? (
              <>
                <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink">Included</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-neutral-700">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-700">
                        <Check size={14} strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink">Workshop formats</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-700">
                  Delivered virtually or in person for teams, cohorts, companies, and organisations.
                </p>
              </div>
            )}

            <p className="mt-6 rounded-2xl border border-ink/10 bg-surface-warm px-4 py-3 text-sm leading-7 text-neutral-700">
              <span className="font-extrabold text-ink">Best for:</span> {service.bestFor}
            </p>

            {service.cta ? (
              <Link
                to="/contact"
                className="group/cta mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-300/30 bg-brand-gradient px-5 py-3 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(234,88,12,0.24),inset_0_1px_0_rgba(255,255,255,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 sm:w-auto"
              >
                <span>Get in touch to discuss</span>
                <ArrowRight
                  size={18}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/cta:translate-x-1"
                />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function ProcessPhase({ phase, index }) {
  const Icon = phase.icon;
  const isReversed = index % 2 === 1;

  return (
    <article className="relative">
      <div className="hidden lg:absolute lg:bottom-0 lg:left-1/2 lg:top-0 lg:block lg:w-px lg:-translate-x-1/2 lg:bg-brand-500/15" aria-hidden="true" />
      <div className="relative grid gap-5 lg:grid-cols-[1fr_96px_1fr] lg:items-center">
        <div className={`relative ${isReversed ? "lg:col-start-3" : "lg:col-start-1 lg:text-right"}`}>
          <span
            className={`pointer-events-none absolute -top-5 hidden text-8xl font-extrabold leading-none text-brand-500/10 lg:block ${
              isReversed ? "-left-3" : "-right-3"
            }`}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">{phase.phase}</p>
          <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">{phase.title}</h3>
          <span className="mt-4 inline-flex rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-sm font-extrabold text-brand-700">
            {phase.timing}
          </span>
        </div>

        <div className="hidden lg:col-start-2 lg:flex lg:justify-center">
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/70 bg-brand-gradient text-white shadow-[0_18px_45px_rgba(234,88,12,0.25)]">
            <Icon size={25} strokeWidth={2.35} aria-hidden="true" />
          </div>
        </div>

        <div
          className={`rounded-[1.75rem] border border-brand-500/15 bg-white p-5 shadow-[0_18px_50px_rgba(124,45,18,0.07)] sm:p-6 lg:p-7 ${
            isReversed ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-3"
          }`}
        >
          <div className="mb-5 flex items-center justify-between gap-4 lg:hidden">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-soft text-white shadow-[0_16px_35px_rgba(11,11,11,0.14)]">
              <Icon size={22} strokeWidth={2.35} aria-hidden="true" />
            </div>
            <span className="text-5xl font-extrabold leading-none text-brand-500/10" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <p className="text-sm leading-7 text-neutral-700 sm:text-base sm:leading-8">{phase.description}</p>
          <p className="mt-4 border-t border-ink/10 pt-4 text-sm font-bold leading-7 text-ink">{phase.detail}</p>
        </div>

      </div>
    </article>
  );
}

export default function ServicesPageContent() {
  const [displayServices, setDisplayServices] = useState(services);
  useEffect(() => {
    siteContentService.get().then(({ data }) => {
      const managed = data.data?.services?.filter((item) => item.isActive !== false);
      if (managed?.length) {
        setDisplayServices(managed.map((item, index) => ({
          ...services[index % services.length],
          ...item,
          title: item.name,
          subtitle: item.eyebrow || item.description,
          eyebrow: `Service ${index + 1}`,
          image: item.image || services[index % services.length].image,
          icon: services[index % services.length].icon,
          cta: index === managed.length - 1
        })));
      }
    }).catch(() => {});
  }, []);
  return (
    <div className="-mx-4 -mb-8 bg-white text-ink">
      <section className="overflow-hidden bg-white px-4 py-5 sm:py-15 lg:py-20">
        <Container>
          <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_0.72fr]">
            <div className="relative overflow-hidden rounded-[2rem] border border-brand-500/15 bg-surface-warm px-6 py-12 shadow-[0_24px_70px_rgba(124,45,18,0.10)] sm:px-10 lg:px-14 lg:py-16">
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(249,115,22,0.22),transparent_32%),linear-gradient(120deg,rgba(255,255,255,0.94),rgba(255,247,237,0.82))]"
                aria-hidden="true"
              />
              <div className="relative max-w-5xl">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Services</p>
                <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  Everything your LinkedIn presence needs. Nothing it doesn't.
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-700 sm:text-xl">
                  We offer three core services. Each one can stand alone or combine with the others depending on where
                  you are and where you want to go.
                </p>
              </div>
            </div>

            <div className="relative min-h-80 overflow-hidden rounded-[2rem] border border-ink/10 bg-ink-soft shadow-[0_24px_70px_rgba(11,11,11,0.16)]">
              <img src="/assets/service-strategy.jpg" alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/70 via-ink/10 to-brand-500/30" aria-hidden="true" />
              <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-white/10 p-4 text-white backdrop-blur">
                <p className="text-sm font-extrabold">Choose the support level that matches your stage.</p>
                <p className="mt-1 text-sm leading-6 text-white/75">Retainers, roadmaps, profile rebuilds, and training.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-warm px-4 py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mb-10 max-w-3xl lg:mb-12">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Choose your entry point</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              Four ways to build a serious LinkedIn presence.
            </h2>
          </div>

          <div className="grid gap-8 lg:gap-10">
            {displayServices.map((service, index) => (
              <ServiceBlock key={service.title} service={service} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <section id="how-we-work" className="scroll-mt-24 bg-white px-4 py-10 sm:py-15 lg:py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">How We Work</p>
              
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-neutral-700 sm:text-lg">
                We take our time at the start, so everything that follows is exactly right.
              </p>
          </div>

          {/* <div className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-[1.75rem] border border-brand-500/15 bg-surface-warm shadow-[0_18px_50px_rgba(124,45,18,0.07)] lg:mt-12 lg:grid lg:grid-cols-5">
                {timelineItems.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 border-t border-ink/10 px-5 py-4 first:border-t-0 lg:block lg:border-l lg:border-t-0 lg:px-5 lg:py-6 lg:first:border-l-0"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-extrabold text-white shadow-[0_12px_28px_rgba(234,88,12,0.22)] lg:mx-auto">
                      {index + 1}
                    </span>
                    <p className="text-sm font-extrabold leading-6 text-ink lg:mt-4 lg:text-center">{item}</p>
                  </div>
                ))}
              </div> */}

          <div className="mx-auto mt-12 grid max-w-6xl gap-8 lg:mt-16 lg:gap-12">
              {processPhases.map((phase, index) => (
                <ProcessPhase key={phase.title} phase={phase} index={index} />
              ))}
            </div>
        </Container>
      </section>

      <ServicesCtaSection />
    </div>
  );
}
