import Container from "../../../shared/Container.jsx";

export default function AboutHero() {
  return (
    <section className="-mx-4 -mt-8 overflow-hidden bg-white px-4 py-5 text-ink sm:py-20 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-brand-500/15 bg-surface-warm shadow-[0_24px_70px_rgba(124,45,18,0.10)]">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(249,115,22,0.22),transparent_32%),linear-gradient(120deg,rgba(255,255,255,0.92),rgba(255,247,237,0.80))]"
            aria-hidden="true"
          />
          <div className="relative grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">About LinkGhosta</p>
              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
                We exist because the world has enough brilliant leaders who are invisible online.
              </h1>
              <p className="mt-6 max-w-2xl text-xl font-extrabold leading-8 text-ink-soft sm:text-2xl">
                LinkGhosta was built to change that.
              </p>
            </div>

            <div className="relative min-h-[280px] overflow-hidden lg:min-h-full">
              <img
                src="/assets/about-leaders-strategy.jpg"
                alt="Business leaders in a strategy meeting"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/50 via-brand-900/10 to-brand-500/20" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
