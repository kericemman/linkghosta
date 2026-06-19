import { ArrowRight, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../../shared/Container.jsx";

export default function ServicesCtaSection() {
  return (
    <section className="bg-surface-warm px-4 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid overflow-hidden rounded-[2rem] border border-brand-500/15 bg-white shadow-[0_28px_80px_rgba(124,45,18,0.10)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative overflow-hidden bg-[radial-gradient(circle_at_18%_16%,rgba(249,115,22,0.28),transparent_34%),linear-gradient(135deg,#151210,#0b0b0b)] px-6 py-12 text-white sm:px-10 lg:px-12 lg:py-14">
            <div
              className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:44px_44px]"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-200">Ready when you are</p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Your LinkedIn presence is either working for you or costing you.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
                There is no neutral. Every week without a presence is a week of missed conversations, missed
                opportunities, missed deals. Let's change that.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-[0_18px_45px_rgba(234,88,12,0.25)]">
              <CalendarCheck size={24} strokeWidth={2.35} aria-hidden="true" />
            </div>
            <p className="mt-6 text-xl font-extrabold leading-8 text-ink">
              Book your free discovery call and we will tell you honestly what we would do with your profile.
            </p>
            <p className="mt-4 text-sm leading-7 text-neutral-700">
              30 minutes. No pressure. Just clear direction on the strongest next move for your LinkedIn presence.
            </p>

            <Link
              to="/contact"
              className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-300/30 bg-brand-gradient px-7 py-4 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(234,88,12,0.28),inset_0_1px_0_rgba(255,255,255,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 sm:w-auto"
            >
              <span>Book your free discovery call</span>
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
  );
}
