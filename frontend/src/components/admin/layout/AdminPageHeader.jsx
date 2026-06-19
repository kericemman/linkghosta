export default function AdminPageHeader({ title, description, action }) {
  return <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-2xl font-extrabold text-ink sm:text-3xl">{title}</h1>{description && <p className="mt-1 text-sm text-neutral-600">{description}</p>}</div>{action}</header>;
}
