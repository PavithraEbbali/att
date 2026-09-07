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

     1. Fiber          2. Internet Air (AT&T runs no coaxial cable network)
     3. Bundles        4. [TV — not built, see below]
     5. Wireless       6. AT&T Phone

   TV is deliberately absent. AT&T sold its remaining 70% stake in DIRECTV to
   TPG on 2 July 2025 and now holds none of it, so "DIRECTV through AT&T" is not
   a relationship that exists, and reselling DIRECTV needs a separate DIRECTV
   dealer authorization rather than the AT&T agreement this site operates under.
   Flagged for the operator rather than published as an unverifiable claim (§7).

   Devices and Coverage are not part of the six service lines, so they sit after
   How It Works. FAQ stays the last content section before the footer (§4.8). */
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
