import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import PriceLockup from "@/components/ui/PriceLockup";
import { stats } from "@/lib/content";
import statNetwork from "@/public/images/stat-network.jpg";

const ICONS = [
  <path key="i" d="M18.2 8c-2.5 0-3.6 2-5.2 4s-2.7 4-5.2 4a4 4 0 1 1 0-8c2.5 0 3.6 2 5.2 4s2.7 4 5.2 4a4 4 0 1 0 0-8Z" />, // unlimited
  <path key="w" d="M5 12.55a11 11 0 0 1 14 0M8.5 16.4a6 6 0 0 1 7 0M12 20h.01M2 8.82a15 15 0 0 1 20 0" />, // signal
  <><path key="t" d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" /><circle key="d" cx="7.5" cy="7.5" r="1.4" /></>, // savings tag
  <><path key="p" d="M19 5 5 19" /><circle key="a" cx="6.5" cy="6.5" r="2.5" /><circle key="b" cx="17.5" cy="17.5" r="2.5" /></>, // percent
];

/* Published-pricing overview. Every figure in this grid renders through the
   canonical §3 lockup (components/ui/PriceLockup.tsx), so the baseline, the
   screen-reader sentence and the as-of line are identical across all four
   cards. Motion is a single staggered entrance reveal. */
export default function Stats() {
  const feature = stats[0];
  const rest = stats.slice(1);

  return (
    <section id="stats" className="relative overflow-hidden py-24 lg:py-28" style={{ background: "linear-gradient(180deg, #002a63 0%, #001a3f 55%, #00122c 100%)" }}>
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-[30rem] w-[30rem] rounded-full bg-brand-blue-300/10 blur-3xl" />

      <div className="relative mx-auto w-[min(100%-3rem,1200px)]">
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-brand-blue-300">
            <span className="h-px w-10 bg-brand-blue-300" /> Published rates
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white">
            Transparent, Published Pricing Across AT&amp;T Services
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">
            Review national rates below. Exact service availability, localized speeds, and promotional
            eligibility are verified directly on the order call.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-12">
          {/* FEATURE — network image panel */}
          <Reveal className="group relative lg:col-span-7">
            <div className="relative flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-[1.6rem] border border-white/12 p-8 lg:min-h-[26rem]">
              <div className="absolute inset-0">
                <Image
                  src={statNetwork}
                  alt="Abstract network of glowing fiber-optic light streaks"
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center"
                />
              </div>
              <span aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,26,63,.35) 0%, rgba(0,20,50,.72) 52%, rgba(0,15,38,.94) 100%)" }} />
              <span aria-hidden className="absolute inset-0 mix-blend-multiply" style={{ background: "radial-gradient(120% 90% at 20% 0%, rgba(0,63,145,.55), transparent 60%)" }} />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue-300" /> The AT&amp;T 5G network
                </span>

                <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                  <PriceLockup price={feature.price} tone="dark" className="min-w-0" />
                  <span className="mb-1 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/40 bg-white/20 text-white shadow-[0_4px_16px_rgba(0,8,24,.35)] backdrop-blur-sm">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{ICONS[0]}</svg>
                  </span>
                </div>

                <p className="mt-4 max-w-md text-base font-semibold leading-snug text-white sm:text-lg">
                  {feature.label}. <span className="text-white/80">On the AT&amp;T 5G network, where available.</span>
                </p>
              </div>
            </div>
          </Reveal>

          {/* SUPPORTING — one card per remaining rate */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            {rest.map((s, idx) => {
              const i = idx + 1;
              return (
                <Reveal key={s.label} delay={0.08 + idx * 0.08} className="flex flex-1">
                  <article className="group relative flex w-full flex-col gap-4 overflow-hidden rounded-[1.35rem] border border-white/20 bg-white/[0.1] p-6 shadow-[0_20px_50px_-30px_rgba(0,8,24,.9)] backdrop-blur-sm transition-colors duration-200 hover:border-brand-blue-300/60 hover:bg-white/[0.15]">
                    <span aria-hidden className="pointer-events-none absolute -left-8 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-brand-blue-300/15 blur-2xl" />

                    <div className="relative flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue-300">
                          <span className="font-mono text-white/45">0{i + 1}</span>
                          <span className="h-3 w-px bg-white/25" />
                          {s.qual}
                        </span>
                        <p className="mt-1.5 text-[0.92rem] font-semibold leading-snug text-white">{s.label}</p>
                      </div>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/25 bg-white/15 text-white transition-colors duration-200 group-hover:border-brand-blue-300/60">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{ICONS[i]}</svg>
                      </span>
                    </div>

                    <PriceLockup price={s.price} tone="dark" className="relative" />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-xs text-white/70">
          National AT&amp;T rates. Pricing is promotional, regional and eligibility-based. We confirm your exact
          price on the call before you order.
        </p>
      </div>
    </section>
  );
}
