import { ArrowRight, BarChart3, MessageSquareQuote, Mic2, TrendingUp, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/shared/Container.jsx";
import { caseStudyService } from "../../services/caseStudyService.js";

const caseStudyFormat = [
  "Client: first name or title only",
  "Challenge: what their LinkedIn was missing",
  "What we did: services delivered and duration",
  "Results: follower growth, impressions, and key outcome",
  "Pull quote: added only when the client allows it"
];

function getCaseStudiesFromResponse(response) {
  const payload = response?.data?.data ?? response?.data?.caseStudies ?? response?.data?.items ?? response?.data;

  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.caseStudies)) return payload.caseStudies;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;

  return [];
}

function getResultValue(caseStudy, keys, fallback = "Added from dashboard") {
  const value = keys.map((key) => caseStudy?.[key]).find(Boolean);
  return value || fallback;
}

function CaseStudyCard({ caseStudy }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const client = getResultValue(caseStudy, ["client", "clientName", "title"], "Client added from dashboard");
  const slug = caseStudy?.slug || caseStudy?._id || caseStudy?.id;
  const followerGrowth = getResultValue(caseStudy, ["followerGrowth", "followers", "growth"], "X to Y in Z months");
  const impressions = getResultValue(caseStudy, ["averageImpressions", "avgImpressions", "impressions"], "Average impressions added");
  const outcome = getResultValue(caseStudy, ["keyOutcome", "outcome", "result"], "Key outcome added");

  return (
    <article className="flex h-full flex-col rounded-lg border border-black/10 bg-white p-6 shadow-sm sm:p-8">
      <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-700">Case study</p><h2 className="mt-3 text-2xl font-extrabold leading-tight text-ink sm:text-3xl">{client}</h2><p className="mt-2 text-sm font-semibold text-neutral-500">{[caseStudy?.location, caseStudy?.duration].filter(Boolean).join(" · ")}</p></div>
      <div className="mt-7"><h3 className="text-sm font-extrabold text-ink">The challenge</h3><p className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-7 text-neutral-700">{getResultValue(caseStudy, ["challenge", "problem"], "Challenge summary will appear here once this case study is published.")}</p></div>
      <div className="mt-6"><h3 className="text-sm font-extrabold text-ink">Key outcome</h3><p className="mt-2 line-clamp-2 whitespace-pre-line text-sm leading-7 text-neutral-700">{outcome}</p></div>
      {slug && <Link to={`/results/${slug}`} className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-extrabold text-brand-700 transition hover:text-brand-500"><span>View full case study</span><ArrowRight size={17} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>}
    </article>
  );
}

function EmptyPortfolioState() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="rounded-[2rem] border border-brand-500/15 bg-white p-4 shadow-[0_24px_70px_rgba(124,45,18,0.08)] sm:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-soft text-white shadow-[0_16px_35px_rgba(11,11,11,0.14)]">
          <BarChart3 size={24} strokeWidth={2.35} aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
          Case studies will publish here from the dashboard.
        </h2>
        <p className="mt-4 text-base leading-8 text-neutral-700">
          This page is ready to display public portfolio entries as soon as case studies are added and published.
        </p>
      </div>

      <div className="rounded-[2rem] border border-ink/10 bg-surface-warm p-6 sm:p-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Case study format</p>
        <div className="mt-6 grid gap-3">
          {caseStudyFormat.map((item, index) => (
            <div key={item} className="flex gap-4 rounded-2xl border border-brand-500/15 bg-white p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-extrabold text-white">
                {index + 1}
              </span>
              <p className="text-sm font-bold leading-6 text-ink">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Portfolio - LinkGhosta";

    let isMounted = true;

    caseStudyService
      .listPublic()
      .then((response) => {
        if (isMounted) setCaseStudies(getCaseStudiesFromResponse(response));
      })
      .catch(() => {
        if (isMounted) setCaseStudies([]);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const hasCaseStudies = useMemo(() => caseStudies.length > 0, [caseStudies]);

  return (
    <div className="-mx-4 -mb-8 bg-white text-ink">
      <section className="overflow-hidden bg-white px-2 py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_0.72fr]">
            <div className="relative overflow-hidden rounded-[2rem] border border-brand-500/15 bg-surface-warm px-6 py-12 shadow-[0_24px_70px_rgba(124,45,18,0.10)] sm:px-10 lg:px-14 lg:py-16">
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(249,115,22,0.22),transparent_32%),linear-gradient(120deg,rgba(255,255,255,0.94),rgba(255,247,237,0.82))]"
                aria-hidden="true"
              />
              <div className="relative max-w-5xl">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Portfolio</p>
                <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  The proof is in the pipeline.
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-700 sm:text-xl">
                  Success looks like inbound leads, speaking invitations, valuable DM conversations, and new
                  clients/opportunities. Follower counts are a side effect. Here's what that looks like in practice.
                </p>
              </div>
            </div>

            <div className="grid gap-4 rounded-[2rem] border border-ink/10 bg-ink-soft p-6 text-white shadow-[0_24px_70px_rgba(11,11,11,0.16)] sm:p-8">
              {[
                { icon: TrendingUp, label: "Follower growth", value: "X -> Y" },
                { icon: Users, label: "Inbound conversations", value: "Pipeline proof" },
                { icon: Mic2, label: "Opportunities", value: "Deals, press, stages" },
                { icon: MessageSquareQuote, label: "Client voice", value: "Quotes where allowed" }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-200">
                        <Icon size={20} strokeWidth={2.35} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-extrabold text-white">{item.value}</p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/55">{item.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-warm px-2 py-10 sm:py-15 lg:py-20">
        <Container>
          {isLoading ? (
            <div className="rounded-[2rem] border border-brand-500/15 bg-white p-8 text-center shadow-[0_24px_70px_rgba(124,45,18,0.08)]">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-brand-700">Loading case studies</p>
            </div>
          ) : hasCaseStudies ? (
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
              {caseStudies.map((caseStudy) => (
                <CaseStudyCard key={caseStudy._id || caseStudy.id || caseStudy.slug || caseStudy.title} caseStudy={caseStudy} />
              ))}
            </div>
          ) : (
            <EmptyPortfolioState />
          )}
        </Container>
      </section>

      <section className="bg-white px-4 py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_20%_15%,rgba(249,115,22,0.30),transparent_32%),linear-gradient(135deg,#151210,#0b0b0b)] px-6 py-12 text-center text-white shadow-[0_28px_90px_rgba(0,0,0,0.35)] sm:px-10 lg:px-14 lg:py-16">
            <div
              className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:48px_48px]"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready for results like this?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-neutral-300">
                Let's build a LinkedIn presence that creates opportunities worth measuring.
              </p>
              <Link
                to="/contact"
                className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-300/30 bg-brand-gradient px-7 py-4 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(234,88,12,0.34),inset_0_1px_0_rgba(255,255,255,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-300 sm:w-auto"
              >
                <span>Book a discovery call</span>
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
