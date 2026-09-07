import Reveal from "@/components/ui/Reveal";
import CallLink from "@/components/ui/CallLink";
import { tv } from "@/lib/content";

/* 4 of 6 — Television.

   Framed as DIRECTV, an independent company, because that is what it is: AT&T
   sold its remaining 70% stake to TPG on 2 July 2025. No package names or
   prices appear here — none were verifiable, and reselling DIRECTV requires a
   separate dealer authorization from the AT&T agreement this site runs under.
   The section routes to the call instead of advertising terms. */
export default function Tv() {
  return (
    <section id="tv" className="relative overflow-hidden bg-brand-wash py-24 lg:py-28">
      <div className="mx-auto w-[min(100%-3rem,1000px)]">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">{tv.eyebrow}</span>
          <h2 className="h-grad-light mt-3 text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {tv.headline}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-brand-slate">{tv.sub}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 grid gap-4 sm:grid-cols-3">
          {tv.points.map((p) => (
            <div key={p} className="rounded-[1.25rem] border border-brand-line bg-white p-5">
              <p className="text-sm leading-snug text-brand-slate">{p}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.14} className="mt-10">
          <CallLink
            label="Ask about television when you call"
            showNumber={false}
            className="inline-flex min-h-11 items-center rounded-full bg-brand-navy px-7 py-3.5 font-bold text-white transition-colors duration-200 hover:bg-brand-blue"
          />
          <p className="mt-4 max-w-2xl text-xs text-brand-mist">
            DIRECTV is a trademark of DIRECTV, LLC. DIRECTV has operated independently of AT&amp;T since July 2025
            and is not an AT&amp;T product.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
