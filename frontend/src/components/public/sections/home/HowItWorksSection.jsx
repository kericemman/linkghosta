import { ClipboardCheck, PenTool, RefreshCcw } from "lucide-react";
import Container from "../../../shared/Container.jsx";

const steps = [
  {
    number: "Step 1",
    title: "We learn you",
    icon: ClipboardCheck,
    description:
      "Deep onboarding. We study how you think, how you speak, what you believe, and what you're building. We don't start writing until we sound like you."
  },
  {
    number: "Step 2",
    title: "We build your content engine",
    icon: PenTool,
    description:
      "Strategy, content calendar, ghostwritten posts, profile optimisation, carousels, articles... everything mapped to your goals and audience."
  },
  {
    number: "Step 3",
    title: "We run it",
    icon: RefreshCcw,
    description:
      "We post, engage, track, report, and refine every month. You review, approve, and show up to the results."
  }
];

export default function HowItWorksSection() {
  return (
    <section className="-mx-4 bg-surface-warm py-10 text-ink sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">How it works</p>
          {/* <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Simple. Strategic. Done for you.
          </h2> */}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="relative overflow-hidden rounded-3xl border border-brand-500/15 bg-white p-6 shadow-[0_18px_55px_rgba(124,45,18,0.08)]"
              >
                <div className="absolute right-5 top-5 text-6xl font-extrabold leading-none text-brand-500/10" aria-hidden="true">
                  {step.number.replace("Step ", "0")}
                </div>
                <div className="relative">
                  <span className="inline-flex rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-700">
                    {step.number}
                  </span>
                  <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-[0_12px_30px_rgba(234,88,12,0.24)]">
                    <Icon size={22} strokeWidth={2.3} aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-extrabold text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-700 sm:text-base">{step.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
