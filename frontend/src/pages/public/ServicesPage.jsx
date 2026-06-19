import { useEffect } from "react";
import ServicesPageContent from "../../components/public/sections/services/ServicesPageContent.jsx";

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ServicesPageContent />;
}
