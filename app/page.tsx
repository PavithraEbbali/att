import SiteChrome from "@/components/sections/SiteChrome";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Fiber from "@/components/sections/Fiber";
import InternetAir from "@/components/sections/InternetAir";
import Bundles from "@/components/sections/Bundles";
import Tv from "@/components/sections/Tv";
import Plans from "@/components/sections/Plans";
import AttPhone from "@/components/sections/AttPhone";
import VAS from "@/components/sections/VAS";
import FinePrint from "@/components/sections/FinePrint";
import WhyUs from "@/components/sections/WhyUs";
import HowItWorks from "@/components/sections/HowItWorks";
import Devices from "@/components/sections/Devices";
import Coverage from "@/components/sections/Coverage";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import StickyCallBar from "@/components/sections/StickyCallBar";

/* Page order.

   Hero -> published-pricing overview, then the service lines in strict
   sequence, then the supporting sections:

     1. Fiber     2. Internet Air (AT&T runs no coaxial cable network)
     3. Bundles   4. TV        5. Wireless      6. AT&T Phone

   TV is present but framed as DIRECTV, an independent company: AT&T sold its
   remaining 70% stake to TPG on 2 July 2025. No packages or prices are shown,
   because none were verifiable and reselling DIRECTV needs a separate dealer
   authorization. See components/sections/Tv.tsx.

   Stats is the published-pricing overview that belongs to the Hero block, so it
   stays directly beneath it. Devices and Coverage are not among the six service
   lines and sit after How It Works. FAQ remains the last content section (§4.8). */
export default function Home() {
  return (
    <>
      <SiteChrome overlay />
      <main id="top">
        <Hero />
        <Stats />

        {/* --- service lines, in order --- */}
        <Fiber />
        <InternetAir />
        <Bundles />
        <Tv />
        <Plans />
        <AttPhone />

        {/* --- supporting sections --- */}
        <VAS />
        <FinePrint />
        <WhyUs />
        <HowItWorks />
        <Devices />
        <Coverage />
        <FAQ />
      </main>
      <Footer />
      <StickyCallBar />
    </>
  );
}
