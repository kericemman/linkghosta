import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes.jsx";
import PageLoader from "./components/shared/PageLoader.jsx";

const AdminRoutes = lazy(() => import("./routes/AdminRoutes.jsx"));

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Suspense>
  );
}
