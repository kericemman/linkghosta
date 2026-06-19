import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InsightSubscriptionCta from "../../components/public/InsightSubscriptionCta.jsx";
import Container from "../../components/shared/Container.jsx";
import { blogService } from "../../services/blogService.js";
import { formatDate } from "../../utils/formatDate.js";

export default function InsightDetailsPage() {
  const { slug } = useParams();
  const [item, setItem] = useState();
  const [missing, setMissing] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    let active = true;
    blogService.getPublicBySlug(slug)
      .then(({ data }) => {
        if (!active) return;
        setItem(data.data);
        document.title = `${data.data.title} | LinkGhosta`;
      })
      .catch(() => active && setMissing(true));
    return () => { active = false; };
  }, [slug]);

  if (missing) return <div className="py-24 text-center"><h1 className="text-3xl font-extrabold">Article not found</h1></div>;
  if (!item) return <div className="py-24 text-center">Loading article...</div>;

  return (
    <div className="-mx-4 -mb-8 bg-white">
      <header className="bg-surface-warm px-4 py-10 sm:py-14 lg:py-16">
        <Container>
          <Link to="/insights" className="inline-flex items-center gap-2 text-sm font-bold text-brand-700"><ArrowLeft size={17} />Insights</Link>
          <div className={`mt-9 grid items-center gap-10 lg:mt-12 lg:gap-14 ${item.coverImage ? "lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]" : ""}`}>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">{item.category || "Insights"} <span className="px-1 text-neutral-400">/</span> {item.readTime} min read</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">{item.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">{item.excerpt}</p>
              <p className="mt-7 text-sm font-bold text-neutral-500">By {item.author || "LinkGhosta"}</p>
            </div>
            {item.coverImage && <div className="aspect-[4/3] overflow-hidden bg-neutral-200"><img src={item.coverImage} alt={item.title} className="h-full w-full object-cover" /></div>}
          </div>
        </Container>
      </header>

      <main className="px-4 py-14 sm:py-20">
        <Container>
          <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[220px_minmax(0,800px)] xl:justify-center xl:gap-16">
            <aside className="hidden border-t-2 border-ink pt-5 lg:sticky lg:top-28 lg:block">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-neutral-400">Article details</p>
              <dl className="mt-6 space-y-5">
                <div><dt className="text-xs font-bold text-neutral-400">Written by</dt><dd className="mt-1 text-sm font-extrabold text-ink">{item.author || "LinkGhosta"}</dd></div>
                <div><dt className="text-xs font-bold text-neutral-400">Category</dt><dd className="mt-1 text-sm font-extrabold text-ink">{item.category || "Insights"}</dd></div>
                <div><dt className="text-xs font-bold text-neutral-400">Reading time</dt><dd className="mt-1 text-sm font-extrabold text-ink">{item.readTime} minutes</dd></div>
                {item.publishedAt && <div><dt className="text-xs font-bold text-neutral-400">Published</dt><dd className="mt-1 text-sm font-extrabold text-ink">{formatDate(item.publishedAt)}</dd></div>}
              </dl>
              <Link to="/insights" className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-brand-700"><ArrowLeft size={16} />All insights</Link>
            </aside>
            <article className="rich-content min-w-0 text-lg leading-9 text-neutral-700 lg:text-[19px] lg:leading-9" dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
          <div className="mx-auto mt-16 max-w-6xl sm:mt-20"><InsightSubscriptionCta /></div>
        </Container>
      </main>
    </div>
  );
}
