import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import CallLink from "@/components/ui/CallLink";
import AvailabilityCheck from "@/components/ui/AvailabilityCheck";
import { hero } from "@/lib/content";
import { business, display } from "@/lib/business";
import heroImg from "@/public/images/hero.jpg";

/* §4.2 Hero.

   Round 3: the third "call to check your address" line is gone, and a ZIP
   availability check took its place. That check claims no verdict — see
   components/ui/AvailabilityCheck.tsx for why Option A was rejected.

   Round 4: the PriceLockup was removed from the hero as requested — it repeated
   the "$50/mo for your first year" the H1 already states. NOTE: the H1 now
   carries a price with no qualifier beside it. See the handback report.

   Round 2 removals:
   · "Ordered by phone, in one call." — order mechanics (item 3).
   · "New orders only. For account, billing or outage support, contact AT&T
     directly." — support routing this business does not do (item 4).

   Earlier removals: the ZIP availability form and its fabricated "Great news,
   available near {zip}" response (§7); the GSAP headline build, mouse parallax,
   3D tilt, floating chips and ping dots (§3); every real-people / face-to-face /
   local-team claim (§5.3).

   §5.1: the H1 is split across styled spans for layout, but each span carries its
   own trailing space, so h1.textContent reads as normal prose for screen readers
   and crawlers rather than gluing words together. */
export default function Hero() {
  const hours = display(business.hours, "hours");

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-brand-navy text-white">
      <div className="absolute inset-0 -z-20">
        <Image src={heroImg} alt="" fill priority placeholder="blur" sizes="100vw" className="scale-105 object-cover object-center" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(0,14,34,.9) 0%, rgba(0,17,42,.72) 46%, rgba(0,24,56,.42) 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(0deg, rgba(0,10,26,.85), transparent)" }} />
      </div>

      <div aria-hidden className="pointer-events-none absolute -left-[10%] top-[6%] -z-10 h-[46vw] w-[46vw] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(0,159,219,.22), transparent 64%)" }} />

      <div className="relative z-10 w-full px-[clamp(1.5rem,6vw,7rem)] py-32">
        <Reveal className="max-w-3xl">
          <p className="mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-blue-300">
            <span className="h-px w-10 bg-brand-blue-300" />
            Independent Authorized {business.agreementNoun}{" "}of AT&amp;T<sup className="text-[0.7em]">®</sup>
          </p>

          <h1 className="relative font-extrabold leading-[1.12] tracking-[-0.03em] [filter:drop-shadow(0_8px_40px_rgba(0,8,24,.55))]">
            <span className="block text-[clamp(1.9rem,3.8vw,3rem)] font-bold text-white/90">AT&amp;T Fiber 1 Gig. </span>
            <span className="h-grad-dark mt-2 block text-[clamp(2.2rem,5vw,3.9rem)]">$50/mo for your first year.</span>
          </h1>

          <p className="mt-8 max-w-lg text-[1.075rem] leading-[1.65] text-white/80">{hero.sub}</p>

          <div className="mt-9">
            <CallLink
              className="inline-flex min-h-[56px] items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-extrabold text-brand-navy shadow-[0_18px_40px_-14px_rgba(255,255,255,.45)] transition-colors duration-200 hover:bg-brand-blue-300 hover:text-white"
              label="Call to order: "
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="shrink-0">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
                </svg>
              }
            />

            {hours && <p className="mt-3 text-sm font-semibold text-white/85">{hours}</p>}
          </div>

          <div className="mt-9">
            <AvailabilityCheck />
          </div>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {hero.chips.map((c) => (
              <li key={c}>
                <a
                  href="#fine-print"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:border-brand-blue-300/60"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#009fdb" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M20 6 9 17l-5-5" /></svg>
                  {c}
                  <span aria-hidden className="text-white/50">*</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <a href="#stats" aria-label="Scroll to explore" className="absolute bottom-7 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center text-white/70 transition-colors hover:text-white">
        <span aria-hidden className="absolute inset-0 rounded-full border border-white/25" />
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
      </a>
    </section>
  );
}
