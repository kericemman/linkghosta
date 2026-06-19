import { Outlet } from "react-router-dom";
import PublicFooter from "../../components/public/layout/PublicFooter.jsx";
import PublicNavbar from "../../components/public/navigation/PublicNavbar.jsx";

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink">
      <PublicNavbar />
      <main className="flex-1 px-4 py-8">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
