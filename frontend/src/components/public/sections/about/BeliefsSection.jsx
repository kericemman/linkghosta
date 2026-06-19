import { MessageSquareQuote, ShieldCheck } from "lucide-react";
import Container from "../../../shared/Container.jsx";

export default function BeliefsSection() {
  return (
    <section className="-mx-4 bg-ink-soft px-4 py-10 text-white sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-300">What we believe</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Visibility is a leadership asset.
            </h2>
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/30">
              <img
                src="/assets/about-personal-branding-work.jpg"
                alt="Professional workspace with strategy materials"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-5 text-base leading-8 text-neutral-300 sm:text-lg">
            <p>
              We believe LinkedIn is the most underpriced visibility tool available to any leader on earth right now. We
              believe personal brands build trust faster than company pages ever will. We believe that the African
              founder, the Gulf executive, the diaspora CEO... their voices belong in the global conversation, loudly and
              consistently.
            </p>
            <p>
              We also believe that ghostwriting is not dishonesty. Every leader who has ever had a speechwriter, a comms
              team, or a PR agency has understood this. You bring the thinking. We bring the craft. The voice is always
              yours.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
            <MessageSquareQuote className="text-brand-300" size={24} aria-hidden="true" />
            <p className="mt-4 text-lg font-extrabold text-white">You bring the thinking.</p>
            <p className="mt-2 text-sm leading-7 text-neutral-300">We bring the craft, structure, cadence, and strategy.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
            <ShieldCheck className="text-brand-300" size={24} aria-hidden="true" />
            <p className="mt-4 text-lg font-extrabold text-white">The voice is always yours.</p>
            <p className="mt-2 text-sm leading-7 text-neutral-300">Ghostwriting is trusted communications work, not impersonation.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
