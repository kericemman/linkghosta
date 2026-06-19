import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../../shared/Container.jsx";

export default function FinalCtaSection() {
  return (
    <section className="-mx-4 -mb-8 bg-white py-10 text-white sm:py-15 lg:py-18">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_20%_15%,rgba(249,115,22,0.30),transparent_32%),linear-gradient(135deg,#151210,#0b0b0b)] px-6 py-12 text-center shadow-[0_28px_90px_rgba(0,0,0,0.35)] sm:px-10 lg:px-14 lg:py-16">
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Your LinkedIn presence is either working for you or costing you.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
              There is no neutral. Every week without a presence is a week of missed conversations, missed opportunities,
              missed deals. Let's change that.
            </p>

            <div className="mt-9 flex flex-col items-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-300/30 bg-brand-gradient px-7 py-4 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(234,88,12,0.34),inset_0_1px_0_rgba(255,255,255,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-300 sm:w-auto"
              >
                <span>Book free discovery call</span>
                <ArrowRight
                  size={18}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <p className="text-sm font-semibold text-neutral-300">
                30 minutes. No pressure. We'll tell you honestly what we'd do with your profile.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
