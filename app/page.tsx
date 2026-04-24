import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MembershipBenefits from "./components/MembershipBenefits";
import JoinBanner from "./components/JoinBanner";
import Classes from "./components/Classes";
import ClubsBanner from "./components/ClubsBanner";
import Bonuses from "./components/Bonuses";
import Plans from "./components/Plans";
import FindGym from "./components/FindGym";
import Contact from "./components/Contact";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col bg-[var(--color-charcoal)] text-white">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <MembershipBenefits />
        <JoinBanner />
        <Classes />
        <ClubsBanner />
        <Bonuses />
        <Plans />
        <FindGym />
        <Contact />
        {/* <FinalCTA /> */}
      </main>
      <Footer />
    </div>
  );
}
