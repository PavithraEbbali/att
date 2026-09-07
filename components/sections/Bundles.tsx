import Reveal from "@/components/ui/Reveal";
import PriceLockup from "@/components/ui/PriceLockup";
import CallLink from "@/components/ui/CallLink";
import NetworkBadge from "@/components/ui/NetworkBadge";
import { bundles, NETWORK } from "@/lib/content";

/* Bundle savings — three standalone offers in a responsive 3-up grid.

   These were previously nested inside one card, which read as a single
   compound offer rather than three alternatives. Each now owns its card, its
   §3 price lockup, its bullets and its own call CTA, so they can be compared
   side by side.

   Palette follows the section it sits in: deep navy ground, slate-bordered
   cards, one accent ring on the featured offer only. Entrance is the shared
   CSS reveal; nothing else moves. */
export default function Bundles() {
  return (
    <section id="bundles" className="relative overflow-hidden py-24 lg:py-28" style={{ background: "linear-gradient(180deg, #00285f 0%, #001a3f 60%, #00122c 100%)" }}>
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-brand-blue-300/10 blur-3xl" />

      <div className="relative mx-auto w-[min(100%-3rem,1200px)]">
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-blue-300">
            <span className="h-px w-8 bg-brand-blue-300/60" /> {bundles.eyebrow}
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white">
            {bundles.headline}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">{bundles.sub}</p>

          <NetworkBadge type="bundle" tone="dark" className="mt-5" />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {bundles.offers.map((o, i) => (
            <Reveal key={o.name} delay={i * 0.07} className="flex">
              <article
                className={`relative flex h-full w-full flex-col rounded-[1.35rem] border bg-white/[0.07] p-6 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 ${
                  o.featured
                    ? "border-brand-blue-300/60 ring-2 ring-brand-blue-300 shadow-[0_28px_70px_-30px_rgba(0,159,219,.55)]"
                    : "border-white/15 hover:border-brand-blue-300/50"
                }`}
              >
                {o.badge && (
                  <span className="absolute -top-3 left-6 rounded-full bg-brand-blue-300 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-navy">
                    {o.badge}
                  </span>
                )}

                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 rounded-t-[1.35rem]"
                  style={{ background: NETWORK.bundle.accent }}
                />

                <NetworkBadge type="bundle" tone="dark" showSubtitle={false} className="mb-3" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue-300">
                  {o.eyebrow}
                </span>

                <PriceLockup price={o.price} tone="dark" className="mt-4" />

                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {o.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-white/90">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#009fdb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden>
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>

                <CallLink
                  showNumber={false}
                  label="Call to order"
                  className={`mt-6 inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full px-4 py-3 text-sm font-bold transition-colors duration-200 ${
                    o.featured
                      ? "bg-brand-blue-300 text-brand-navy hover:bg-white"
                      : "bg-white text-brand-navy hover:bg-brand-blue-300"
                  }`}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
