import Reveal from "@/components/ui/Reveal";
import PriceLockup from "@/components/ui/PriceLockup";
import CallLink from "@/components/ui/CallLink";
import { bundles } from "@/lib/content";

/* 3 of 6 — Bundles. The figure AT&T publishes is "up to $420/yr", built from
   $35/mo off 5 GIG internet with eligible wireless. The brief's "20% monthly
   bill credit" and "Build-A-Plan from $70/mo" are not on att.com and are not
   shown here. */
export default function Bundles() {
  return (
    <section id="bundles" className="relative overflow-hidden bg-brand-wash py-24 lg:py-28">
      <div className="mx-auto w-[min(100%-3rem,1000px)] text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-blue">
            <span className="h-px w-8 bg-brand-blue/60" /> {bundles.eyebrow} <span className="h-px w-8 bg-brand-blue/60" />
          </span>
          <h2 className="h-grad-light mx-auto mt-4 max-w-2xl text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {bundles.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-slate">{bundles.sub}</p>
        </Reveal>

        <Reveal delay={0.08} className="mx-auto mt-10 max-w-md rounded-[1.5rem] border border-brand-line bg-white p-8 shadow-[0_24px_60px_-30px_rgba(0,30,80,.4)]">
          <PriceLockup price={bundles.price} tone="light" />
          <div className="mt-7 grid gap-4 text-left sm:grid-cols-2">
            {bundles.offers.map((o) => (
              <div key={o.name} className="rounded-[1.1rem] border border-brand-line bg-brand-wash p-5">
                <h3 className="text-sm font-extrabold leading-snug text-brand-ink">{o.name}</h3>
                <PriceLockup price={o.price} tone="light" className="mt-3" />
              </div>
            ))}
          </div>

          <ul className="mt-6 flex flex-col gap-2.5 text-left">
            {bundles.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-brand-slate">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0072b2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                {p}
              </li>
            ))}
          </ul>
          <CallLink
            label="Call to order"
            showNumber={false}
            className="mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-navy px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-brand-blue"
          />
        </Reveal>
      </div>
    </section>
  );
}
