export default function EmptyState({ title = "No items found" }) {
  return <p className="text-sm text-neutral-600">{title}</p>;
}
