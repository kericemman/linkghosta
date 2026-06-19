import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../../shared/Container.jsx";

export default function HomeHero() {
  return (
    <section className="relative -mx-4 -mt-8 overflow-hidden bg-white text-ink">
      <div
        className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.96)_42%,rgba(255,247,237,0.88)_72%,rgba(249,115,22,0.20)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[right_-8rem_top_2rem] bg-no-repeat opacity-[0.055] mix-blend-multiply sm:bg-[right_-5rem_top_1rem] md:bg-right-top md:opacity-[0.07]"
        style={{ backgroundImage: "url('/assets/logo.jpeg')", backgroundSize: "clamp(520px, 72vw, 980px) auto" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(249,115,22,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.10)_1px,transparent_1px)] [background-size:44px_44px] sm:[background-size:52px_52px]"
        aria-hidden="true"
      />
      <div className="absolute left-0 top-24 h-px w-2/3 bg-gradient-to-r from-brand-500/35 to-transparent sm:w-1/3" aria-hidden="true" />
      <div className="absolute bottom-16 right-0 h-px w-1/2 bg-gradient-to-l from-brand-600/25 to-transparent sm:w-1/4" aria-hidden="true" />

      <Container className="relative flex min-h-[calc(80svh-80px)] max-w-7xl items-center py-14 sm:min-h-[calc(80svh-96px)] sm:py-10 md:py-15 lg:py-20 xl:py-25">
        <div className="w-full max-w-4xl">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-500/25 bg-white/85 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.13em] text-brand-700 shadow-[0_10px_30px_rgba(124,45,18,0.08)] backdrop-blur sm:px-3.5 sm:text-xs sm:tracking-[0.16em]">
            <span className="h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_16px_rgba(249,115,22,0.75)]" aria-hidden="true" />
            LinkedIn Ghostwriting
          </div>

          <h1 className="mt-6 max-w-5xl text-xl font-extrabold leading-[1.02] tracking-tight text-ink min-[375px]:text-4xl sm:mt-7 sm:text-3xl sm:leading-[0.98] md:text-5xl lg:text-6xl xl:text-[5rem]">
            For leaders who are{" "}
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-800 bg-clip-text text-transparent">
              too busy building
            </span>{" "}
            to explain themselves.
          </h1>

          <p className="mt-6 max-w-2xl text-lg font-semibold leading-7 text-ink-soft sm:mt-7 sm:text-2xl sm:leading-8">
            The world's most powerful leaders have always had ghostwriters.
          </p>

          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8 lg:text-[19px]">
            LinkGhosta is a LinkedIn personal branding agency for founders, CEOs, public figures, and politicians who are
            too busy building empires to write their own content, but know that showing up is non-negotiable.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <Link
              to="/contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-300/30 bg-brand-gradient px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(234,88,12,0.32),inset_0_1px_0_rgba(255,255,255,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-300 sm:w-auto sm:px-7 sm:py-4"
            >
              <span>Book a discovery call</span>
              <ArrowRight
                size={18}
                strokeWidth={2.5}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/results"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/10 bg-white/85 px-6 py-3.5 text-sm font-extrabold text-ink shadow-[0_12px_35px_rgba(11,11,11,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-brand-500/40 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 sm:w-auto sm:px-7 sm:py-4"
            >
              <span>See our results</span>
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
