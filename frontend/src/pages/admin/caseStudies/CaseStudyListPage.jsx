import { Edit3, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AdminPageHeader from "../../../components/admin/layout/AdminPageHeader.jsx";
import { caseStudyService } from "../../../services/caseStudyService.js";
import { getErrorMessage } from "../../../utils/getErrorMessage.js";

export default function CaseStudyListPage() {
  const [items,setItems]=useState([]); const [loading,setLoading]=useState(true);
  const load=()=>caseStudyService.getCaseStudies().then(({data})=>setItems(data.data||[])).catch(e=>toast.error(getErrorMessage(e))).finally(()=>setLoading(false));
  useEffect(() => {
    load();
  }, []);
  async function remove(item){if(!window.confirm(`Delete ${item.title}?`))return; try{await caseStudyService.deleteCaseStudy(item._id);setItems(items.filter(v=>v._id!==item._id));toast.success("Case study deleted");}catch(e){toast.error(getErrorMessage(e));}}
  return <div className="mx-auto max-w-7xl"><AdminPageHeader title="Case studies" description="Publish proof that appears in the portfolio." action={<Link to="/admin/case-studies/create" className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2.5 text-sm font-extrabold text-white"><Plus size={17}/>New case study</Link>}/><div className="overflow-hidden rounded-lg border border-black/10 bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-neutral-50 text-xs uppercase text-neutral-500"><tr><th className="px-5 py-3">Client</th><th>Status</th><th>Outcome</th><th>Updated</th><th className="px-5 text-right">Actions</th></tr></thead><tbody className="divide-y divide-black/5">{items.map(item=><tr key={item._id}><td className="px-5 py-4"><Link to={`/admin/case-studies/${item._id}`} className="font-bold hover:text-brand-700">{item.client}</Link><p className="text-xs text-neutral-500">{item.title}</p></td><td><span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold capitalize text-brand-700">{item.status}</span></td><td className="max-w-xs truncate text-neutral-600">{item.keyOutcome}</td><td className="text-neutral-500">{new Date(item.updatedAt).toLocaleDateString()}</td><td className="px-5"><div className="flex justify-end gap-2"><Link aria-label="Edit" to={`/admin/case-studies/${item._id}/edit`} className="rounded-md border p-2 hover:border-brand-400"><Edit3 size={16}/></Link><button aria-label="Delete" onClick={()=>remove(item)} className="rounded-md border p-2 text-red-600 hover:border-red-300"><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div>{!loading&&!items.length&&<p className="p-10 text-center text-sm text-neutral-500">No case studies yet. Add the first result when you are ready.</p>}</div></div>;
}
