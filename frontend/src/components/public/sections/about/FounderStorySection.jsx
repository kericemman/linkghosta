import Container from "../../../shared/Container.jsx";

export default function FounderStorySection() {
  return (
    <section className="-mx-4 bg-white px-4 py-10 text-ink sm:py-20 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div className="space-y-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Founder story</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            Strategic storytelling made visible.
          </h2>
          <div className="relative overflow-hidden rounded-[2rem] border border-brand-500/15 shadow-[0_20px_60px_rgba(124,45,18,0.10)]">
            <img
              src="/assets/about-founder-story.jpg"
              alt="Professional woman working on a laptop"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/30 via-transparent to-brand-500/20" aria-hidden="true" />
          </div>
        </div>

        <div className="space-y-5 text-base leading-8 text-neutral-700 sm:text-lg">
          <p>
            There's a particular kind of frustration that comes with being the most accomplished person in a room and
            being unknown outside of it.
          </p>
          <p>
            Miriam Maru knows it well. She built her own LinkedIn presence from scratch, no ads, no paid growth, no
            shortcuts, with an audience that reads like a directory of the continent's most influential founders and
            executives. Clients started reaching out. Then more clients. Then clients from Europe. Then the Middle East.
            Then the Americas.
          </p>
          <p>
            The pattern was clear: there was no shortage of brilliant global leaders. There was a shortage of strategic
            storytelling that made them visible.
          </p>
          <p className="font-extrabold text-ink">LinkGhosta was founded to close that gap.</p>
        </div>
      </Container>
    </section>
  );
}
