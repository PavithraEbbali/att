import Reveal from "@/components/ui/Reveal";
import TierCard from "@/components/ui/TierCard";
import { attPhone } from "@/lib/content";

/* 6 of 6 — AT&T Phone. AT&T publishes no national price for either product,
   so neither card renders a price row. */
export default function AttPhone() {
  return (
    <section id="phone" className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto w-[min(100%-3rem,1000px)]">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">{attPhone.eyebrow}</span>
          <h2 className="h-grad-light mt-3 text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {attPhone.headline}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-brand-slate">{attPhone.sub}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {attPhone.tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="flex">
              <TierCard {...t} tone="light" />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-xs text-brand-mist">{attPhone.note}</p>
      </div>
    </section>
  );
}
