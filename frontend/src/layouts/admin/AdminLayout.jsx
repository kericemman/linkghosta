import { Outlet } from "react-router-dom";
import AdminMobileNavigation from "../../components/admin/navigation/AdminMobileNavigation.jsx";
import AdminSidebar from "../../components/admin/navigation/AdminSidebar.jsx";
import AdminTopbar from "../../components/admin/navigation/AdminTopbar.jsx";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f6f6f4] text-ink">
      <AdminMobileNavigation />
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
