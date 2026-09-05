import DisclosureBar from "@/components/sections/DisclosureBar";
import Header from "@/components/sections/Header";

/* The disclosure bar and the header are BOTH pinned to the top, so they have to
   share one positioning context. Stacking them in a single wrapper means the
   header can never slide underneath the bar, whatever height the disclosure text
   wraps to at a given width (it is two lines on a 375px screen and one on
   desktop), without hardcoding an offset that would drift.

   overlay=true  → the homepage, where the chrome floats over the hero image.
   overlay=false → legal pages, where it sticks in normal flow above white content. */
export default function SiteChrome({ overlay = false }: { overlay?: boolean }) {
  return (
    <div className={`${overlay ? "fixed" : "sticky"} inset-x-0 top-0 z-50`}>
      <DisclosureBar />
      <Header solid={!overlay} />
    </div>
  );
}
