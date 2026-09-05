import SiteChrome from "@/components/sections/SiteChrome";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Plans from "@/components/sections/Plans";
import Devices from "@/components/sections/Devices";
import Internet from "@/components/sections/Internet";
import Coverage from "@/components/sections/Coverage";
import WhyUs from "@/components/sections/WhyUs";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import StickyCallBar from "@/components/sections/StickyCallBar";

/* §4.8: the FAQ is the LAST content section — nothing follows it but the footer.
   Contact therefore moves above it. */
export default function Home() {
  return (
    <>
      <SiteChrome overlay />
      <main id="top">
        <Hero />
        <Stats />
        <Plans />
        <Devices />
        <Internet />
        <Coverage />
        <WhyUs />
        <FAQ />
      </main>
      <Footer />
      <StickyCallBar />
    </>
  );
}
