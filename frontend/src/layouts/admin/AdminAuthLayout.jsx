import { Outlet } from "react-router-dom";

export default function AdminAuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-warm px-4">
      <Outlet />
    </main>
  );
}
