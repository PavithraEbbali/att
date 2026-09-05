import SiteChrome from "@/components/sections/SiteChrome";
import Footer from "@/components/sections/Footer";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Same chrome as the site, in its light style over the white legal pages. */}
      <SiteChrome />
      <main className="bg-white">{children}</main>
      <Footer />
    </>
  );
}
