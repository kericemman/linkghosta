import { Edit3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminPageHeader from "../../../components/admin/layout/AdminPageHeader.jsx";
import { caseStudyService } from "../../../services/caseStudyService.js";

export default function ViewCaseStudyPage() {
  const { id } = useParams();
  const [item, setItem] = useState();
  useEffect(() => { caseStudyService.getCaseStudy(id).then(({ data }) => setItem(data.data)); }, [id]);
  const images = useMemo(() => item ? [...new Set([item.image, ...(item.images || [])].filter(Boolean))] : [], [item]);
  if (!item) return <p>Loading...</p>;
  return <div className="mx-auto max-w-5xl"><AdminPageHeader title={item.client} description={item.title} action={<Link to={`/admin/case-studies/${id}/edit`} className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2.5 text-sm font-bold text-white"><Edit3 size={17} />Edit</Link>} /><article className="grid gap-6 rounded-lg border border-black/10 bg-white p-6 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase text-brand-700">Challenge</p><p className="mt-2 leading-7 text-neutral-700">{item.challenge}</p></div><div><p className="text-xs font-bold uppercase text-brand-700">What we did</p><p className="mt-2 leading-7 text-neutral-700">{item.whatWeDid}</p></div><div className="grid gap-3 sm:grid-cols-3 lg:col-span-2">{[["Follower growth", item.followerGrowth], ["Average impressions", item.averageImpressions], ["Key outcome", item.keyOutcome]].map(([label, value]) => <div key={label} className="rounded-md bg-neutral-50 p-4"><p className="text-xs font-bold text-neutral-500">{label}</p><p className="mt-2 font-extrabold">{value || "Not added"}</p></div>)}</div>{item.quote && <blockquote className="border-l-4 border-brand-500 pl-4 italic text-neutral-600 lg:col-span-2">"{item.quote}"</blockquote>}{images.length > 0 && <div className="lg:col-span-2"><p className="mb-3 text-xs font-bold uppercase text-brand-700">Images</p><div className="grid gap-3 sm:grid-cols-3">{images.map((url, index) => <img key={url} src={url} alt={`Case study ${index + 1}`} className="aspect-square w-full rounded-md object-cover" />)}</div></div>}</article></div>;
}
