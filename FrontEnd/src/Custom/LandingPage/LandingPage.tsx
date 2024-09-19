import DownloadAd from "./DownloadAd";
import HeroSection from "./HeroSection";
import MessageExamples from "./MessageExamples";
import NewFeatures from "./NewFeatures";
import PrivateMessages from "./PrivateMessages";
import Testimonials from "./Testimonials";

function LandingPage() {
  return (
    <div>
      <HeroSection />
      <PrivateMessages />
      <NewFeatures />
      <MessageExamples />
      <Testimonials />
      <DownloadAd />
    </div>
  );
}

export default LandingPage;
