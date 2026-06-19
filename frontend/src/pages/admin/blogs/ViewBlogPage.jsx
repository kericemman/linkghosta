import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminPageHeader from "../../../components/admin/layout/AdminPageHeader.jsx";
import { blogService } from "../../../services/blogService.js";

export default function ViewBlogPage() {
  const { id } = useParams();
  const [item, setItem] = useState();
  useEffect(() => { blogService.getBlog(id).then(({ data }) => setItem(data.data)); }, [id]);
  if (!item) return <p>Loading...</p>;
  return (
    <div className="mx-auto max-w-4xl">
      <AdminPageHeader title={item.title} description={`${item.category} - ${item.status}`} action={<Link to={`/admin/blogs/${id}/edit`} className="rounded-md bg-brand-600 px-4 py-2 text-sm font-bold text-white">Edit</Link>} />
      <article className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
        {item.coverImage && <img src={item.coverImage} alt="" className="mb-6 aspect-[16/7] w-full rounded-md object-cover" />}
        <p className="text-lg font-bold leading-8">{item.excerpt}</p>
        <div className="rich-content mt-7 leading-8 text-neutral-700" dangerouslySetInnerHTML={{ __html: item.content }} />
      </article>
    </div>
  );
}
