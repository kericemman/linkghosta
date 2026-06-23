import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, Quote, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/shared/Container.jsx";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import { caseStudyService } from "../../services/caseStudyService.js";

function ResultImageGallery({ coverImage, images, client }) {
  const sliderRef = useRef(null);
  const allImages = useMemo(() => [coverImage, ...images].filter(Boolean), [coverImage, images]);
  const [openIndex, setOpenIndex] = useState(null);
  const slide = (direction) => sliderRef.current?.scrollBy({ left: direction * 220, behavior: "smooth" });

  const moveLightbox = (direction) => setOpenIndex((current) => (current + direction + allImages.length) % allImages.length);

  useEffect(() => {
    if (openIndex === null) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowLeft" && allImages.length > 1) moveLightbox(-1);
      if (event.key === "ArrowRight" && allImages.length > 1) moveLightbox(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openIndex, allImages.length]);

  return (
    <section aria-label="Case study images" className="min-w-0 max-w-full overflow-hidden">
      {coverImage && <button type="button" onClick={() => setOpenIndex(0)} aria-label="Open cover image" className="group relative block aspect-[16/11] w-full overflow-hidden bg-neutral-100 sm:aspect-[4/3]"><img src={coverImage} alt={`${client} cover`} className="h-full w-full object-contain" /><span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-md bg-ink/85 text-white opacity-90 transition group-hover:bg-brand-600" aria-hidden="true"><Maximize2 size={18} /></span></button>}
      {images.length > 0 && <div className="mt-4">
        <div className="mb-3 flex items-center justify-between gap-3"><div className="min-w-0"><p className="text-xs font-extrabold uppercase tracking-[0.12em] text-brand-700">Results gallery</p><p className="mt-1 text-xs text-neutral-500">Swipe to view more</p></div>{images.length > 2 && <div className="hidden shrink-0 gap-2 sm:flex"><button type="button" onClick={() => slide(-1)} aria-label="Scroll gallery left" className="flex h-9 w-9 items-center justify-center rounded-md border border-black/10 bg-white text-ink hover:border-brand-300"><ChevronLeft size={18} /></button><button type="button" onClick={() => slide(1)} aria-label="Scroll gallery right" className="flex h-9 w-9 items-center justify-center rounded-md border border-black/10 bg-white text-ink hover:border-brand-300"><ChevronRight size={18} /></button></div>}</div>
        <div ref={sliderRef} className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((url, index) => <button type="button" onClick={() => setOpenIndex(index + (coverImage ? 1 : 0))} aria-label={`Open result image ${index + 1}`} key={url} className="group relative aspect-[4/3] w-[72%] min-w-0 shrink-0 snap-start overflow-hidden rounded-md border border-black/10 bg-neutral-100 min-[480px]:w-[48%] sm:w-[36%] lg:w-[44%]"><img src={url} alt={`${client} result ${index + 1}`} className="h-full w-full object-contain" loading="lazy" /><span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-md bg-ink/80 text-white opacity-0 transition group-hover:opacity-100" aria-hidden="true"><Maximize2 size={15} /></span></button>)}
        </div>
      </div>}
      {openIndex !== null && <div role="dialog" aria-modal="true" aria-label={`${client} image viewer`} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpenIndex(null); }}>
        <button type="button" onClick={() => setOpenIndex(null)} aria-label="Close image viewer" className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"><X size={24} /></button>
        {allImages.length > 1 && <button type="button" onClick={() => moveLightbox(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-white/20 sm:left-6"><ChevronLeft size={25} /></button>}
        <figure className="flex h-full w-full max-w-6xl flex-col items-center justify-center px-10 sm:px-16">
          <img src={allImages[openIndex]} alt={`${client} enlarged result ${openIndex + 1}`} className="max-h-[calc(100vh-7rem)] max-w-full object-contain" />
          <figcaption className="mt-3 text-xs font-bold text-white/65">{openIndex + 1} of {allImages.length}</figcaption>
        </figure>
        {allImages.length > 1 && <button type="button" onClick={() => moveLightbox(1)} aria-label="Next image" className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-white/20 sm:right-6"><ChevronRight size={25} /></button>}
      </div>}
    </section>
  );
}

export default function CaseStudyDetailsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { slug } = useParams();
  const [item, setItem] = useState();
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    caseStudyService.getPublicBySlug(slug).then(({ data }) => setItem(data.data)).catch(() => setMissing(true));
  }, [slug]);

  const resultImages = useMemo(() => item ? [...new Set((item.images || []).filter((image) => image && image !== item.image))] : [], [item]);
  useDocumentTitle(item ? item.client : "Case Study");

  if (missing) return <div className="py-24 text-center"><h1 className="text-3xl font-extrabold">Case study not found</h1><Link to="/results" className="mt-5 inline-block font-bold text-brand-700">Back to portfolio</Link></div>;
  if (!item) return <div className="py-24 text-center text-neutral-500">Loading case study...</div>;

  return (
    <div className="-mx-4 -mb-8 max-w-[100vw] overflow-x-hidden">
      <section className="bg-ink py-12 text-white sm:py-20 lg:py-24"><Container><Link to="/results" className="inline-flex items-center gap-2 text-sm font-bold text-white/70"><ArrowLeft size={17} />Portfolio</Link><p className="mt-8 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-400 sm:mt-10">Case study</p><h1 className="mt-4 max-w-4xl break-words text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">{item.client}</h1><p className="mt-4 break-words text-base leading-7 text-white/65 sm:mt-5 sm:text-lg">{[item.location, item.duration].filter(Boolean).join(" - ")}</p></Container></section>
      <section className="py-12 sm:py-20 lg:py-24"><Container>
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.78fr)] lg:items-start lg:gap-12 xl:gap-16">
          <div className="order-2 min-w-0 space-y-9 lg:order-1 lg:space-y-10"><div><h2 className="text-xl font-extrabold sm:text-2xl">The challenge</h2><p className="mt-3 break-words whitespace-pre-line text-base leading-8 text-neutral-700 sm:mt-4">{item.challenge}</p></div><div><h2 className="text-xl font-extrabold sm:text-2xl">What we did</h2><p className="mt-3 break-words whitespace-pre-line text-base leading-8 text-neutral-700 sm:mt-4">{item.whatWeDid}</p></div><div><h2 className="text-xl font-extrabold sm:text-2xl">Key outcome</h2><p className="mt-3 break-words whitespace-pre-line text-base leading-8 text-neutral-700 sm:mt-4">{item.keyOutcome}</p></div>{item.quote && <blockquote className="border-l-4 border-brand-500 bg-brand-50 p-5 sm:p-6"><Quote className="text-brand-600" /><p className="mt-4 break-words text-lg font-bold leading-8 sm:text-xl">"{item.quote}"</p></blockquote>}</div>
          <aside className="order-1 min-w-0 max-w-full lg:order-2 lg:sticky lg:top-24"><ResultImageGallery coverImage={item.image} images={resultImages} client={item.client} /><div className="mt-6 grid min-w-0 grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{[["Follower growth", item.followerGrowth], ["Average impressions", item.averageImpressions]].filter(([, value]) => value).map(([label, value]) => <div key={label} className="min-w-0 border-t-2 border-ink pt-4"><p className="text-xs font-bold uppercase text-neutral-500">{label}</p><p className="mt-2 break-words text-base font-extrabold sm:text-lg">{value}</p></div>)}</div></aside>
        </div>
      </Container></section>
    </div>
  );
}
