import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MembershipBenefits from "./components/MembershipBenefits";
import Classes from "./components/Classes";
import Plans from "./components/Plans";
import ChallengeCTA from "./components/ChallengeCTA";
import GalleryStrip from "./components/GalleryStrip";
import Giant from "./components/Giant";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChallengeModal from "./components/ChallengeModal";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col bg-charcoal text-white">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <MembershipBenefits />
        <Classes />
        <Plans />
        <ChallengeCTA />
        <GalleryStrip />
        <Giant />
        <Contact />
      </main>
      <Footer />
      <ChallengeModal />
    </div>
  );
}
