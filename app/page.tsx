import HeroSection from "@/components/sections/HeroSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import MoveXScene from "@/components/sections/MoveXScene";
import UIDAIAdvisoryScene from "@/components/sections/UIDAIAdvisoryScene";
import PFCVScene from "@/components/sections/PFCVScene";
import CurrentFocusSection from "@/components/sections/CurrentFocusSection";
import FootprintSection from "@/components/sections/FootprintSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <MoveXScene />
      <UIDAIAdvisoryScene />
      <PFCVScene />
      <CurrentFocusSection />
      <FootprintSection />
    </>
  );
}
