import Reveal from "@/components/ui/Reveal";
import CallLink from "@/components/ui/CallLink";
import { coverage } from "@/lib/content";

/* Round 2, item 6 — this section's job is NETWORK REACH, and nothing else.

   It must not restate the Fiber-vs-Internet-Air explanation that belongs to the
   Home Internet section.

   Round 3, item 8: the "21 states" headline is gone — the visible list spans 8
   states, so the number contradicted the list. The source URL and observed date
   are code-side only now (lib/content.ts `coverage.cite`); a raw citation is not
   page copy. Metro names were verified one by one on AT&T's own local fiber
   pages — see lib/content.ts for the per-city source. */
export default function Coverage() {
  return (
    <section id="coverage" className="relative overflow-hidden bg-brand-navy py-24 text-white lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-brand-blue-300/[0.08] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-44 bottom-0 h-[32rem] w-[32rem] rounded-full bg-brand-blue-700/[0.16] blur-3xl" />

      <div className="relative mx-auto w-[min(100%-3rem,1000px)] text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-blue-300">
            <span className="h-px w-8 bg-brand-blue-300/60" /> Network reach <span className="h-px w-8 bg-brand-blue-300/60" />
          </span>

          <h2 className="mx-auto mt-4 max-w-2xl text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
            Metros where AT&amp;T Fiber is available.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/90">
            These are some of the metro areas AT&amp;T lists for AT&amp;T Fiber. Wireless service runs separately, on the
            AT&amp;T 5G network.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mx-auto mt-9 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {coverage.metros.map((m) => (
            <span
              key={`${m.city}-${m.state}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/[0.1] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_-18px_rgba(0,8,24,.9)] transition-colors duration-200 hover:border-brand-blue-300/60 hover:bg-brand-blue-300/15"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#009fdb" strokeWidth="2.4" className="shrink-0">
                <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {m.city}
              <span className="text-white/55">{m.state}</span>
            </span>
          ))}
        </Reveal>

        <Reveal delay={0.14} className="mt-10">
          <CallLink
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand-blue-300 px-6 py-3 text-sm font-bold text-brand-navy transition-colors duration-200 hover:bg-white"
            label="Call to order"
            showNumber={false}
          />
          <p className="mx-auto mt-6 max-w-lg text-xs text-white/75">
            Fiber is built out street by street, so coverage and speeds vary by location.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
