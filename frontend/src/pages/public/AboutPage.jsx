import { useEffect } from "react";
import AboutHero from "../../components/public/sections/about/AboutHero.jsx";
import AboutTeamSection from "../../components/public/sections/about/AboutTeamSection.jsx";
import AgencyValuesSection from "../../components/public/sections/about/AgencyValuesSection.jsx";
import BeliefsSection from "../../components/public/sections/about/BeliefsSection.jsx";
import FounderStorySection from "../../components/public/sections/about/FounderStorySection.jsx";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AboutHero />
      <FounderStorySection />
      <BeliefsSection />
      <AboutTeamSection />
      <AgencyValuesSection />
    </>
  );
}
