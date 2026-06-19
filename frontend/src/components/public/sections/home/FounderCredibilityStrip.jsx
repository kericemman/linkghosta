import { Linkedin, MapPin, UsersRound } from "lucide-react";
import Container from "../../../shared/Container.jsx";

const founderLinkedInUrl = "https://www.linkedin.com/search/results/people/?keywords=Miriam%20Maru%20LinkGhosta";

export default function FounderCredibilityStrip() {
  return (
    <section className="-mx-4 bg-white py-10 text-ink sm:py-20 lg:py-24">
      <Container>
        <div className="overflow-hidden rounded-[2rem] border border-brand-500/15 bg-surface-warm shadow-[0_24px_70px_rgba(124,45,18,0.10)]">
          <div className="grid items-center gap-0 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="relative min-h-[360px] bg-ink-soft p-6 text-white sm:p-8 lg:min-h-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(249,115,22,0.32),transparent_34%),linear-gradient(135deg,#151210,#0b0b0b)]" />
              <div className="relative flex h-full min-h-[300px] flex-col justify-between">
                <div className="overflow-hidden">
                  <div className="relative aspect-[4/5] bg-gradient-to-br from-brand-100 via-brand-300 to-brand-800">
                    
                    <img
                      src="/assets/1.jpeg"
                      alt="Miriam Maru, founder of LinkGhosta"
                      className="relative h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>

                
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Founder credibility</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
                Built by someone who has done this themselves
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-700 sm:text-lg">
                Miriam Maru, founder of LinkGhosta, grew her own LinkedIn organically, from Nairobi, with an audience of
                CEOs, founders, and senior professionals across Africa, Europe, the Middle East, and the Americas. She
                has ghostwritten for founders, managed LinkedIn for global brands, and trained hundreds of professionals
                in personal branding.
              </p>

              <a
                href={founderLinkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-brand-500/20 bg-brand-gradient px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(234,88,12,0.26),inset_0_1px_0_rgba(255,255,255,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
              >
                <Linkedin size={18} aria-hidden="true" />
                <span>View Miriam on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
