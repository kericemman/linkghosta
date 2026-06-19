import HomeHero from "../../components/public/sections/home/HomeHero.jsx";
import FounderCredibilityStrip from "../../components/public/sections/home/FounderCredibilityStrip.jsx";
import FinalCtaSection from "../../components/public/sections/home/FinalCtaSection.jsx";
import HowItWorksSection from "../../components/public/sections/home/HowItWorksSection.jsx";
import ProblemSection from "../../components/public/sections/home/ProblemSection.jsx";
import SocialProofBar from "../../components/public/sections/home/SocialProofBar.jsx";
import WhatWeDoSection from "../../components/public/sections/home/WhatWeDoSection.jsx";
import WhoWeWorkWithSection from "../../components/public/sections/home/WhoWeWorkWithSection.jsx";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HomeHero />
      <SocialProofBar />
      <ProblemSection />
      <WhatWeDoSection />
      <WhoWeWorkWithSection />
      <HowItWorksSection />
      <FounderCredibilityStrip />
      <FinalCtaSection />
    </>
  );
}
