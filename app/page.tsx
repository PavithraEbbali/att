import SiteChrome from "@/components/sections/SiteChrome";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Fiber from "@/components/sections/Fiber";
import InternetAir from "@/components/sections/InternetAir";
import Bundles from "@/components/sections/Bundles";
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
     3. Bundles   4. Wireless   5. AT&T Phone

   There is no television section. AT&T sold its remaining 70% stake in DIRECTV
   to TPG on 2 July 2025, so TV is not an AT&T product and is not sold here.

   Stats is the published-pricing overview that belongs to the Hero block, so it
   stays directly beneath it. The device lineup follows the fine-print grid.
   FAQ remains the last content section before the footer (§4.8). */
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
        <Plans />
        <AttPhone />

        {/* --- supporting sections --- */}
        <VAS />
        <FinePrint />
        <Devices />
        <WhyUs />
        <HowItWorks />
        <Coverage />
        <FAQ />
      </main>
      <Footer />
      <StickyCallBar />
    </>
  );
}
