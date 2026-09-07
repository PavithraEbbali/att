import Reveal from "@/components/ui/Reveal";
import TierCard from "@/components/ui/TierCard";
import { fiber } from "@/lib/content";

/* 1 of 6 — AT&T Fiber. Four tiers, matching what att.com actually lists
   (300 / 500 / 1000 / 5000). There is no 2 GIG tier on the product page, so
   none is shown. Only 1 GIG carries a nationally published price. */
export default function Fiber() {
  return (
    <section id="fiber" className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[32rem] w-[32rem] rounded-full bg-brand-blue-50/70 blur-3xl" />

      <div className="relative mx-auto w-[min(100%-3rem,1200px)]">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">{fiber.eyebrow}</span>
          <h2 className="h-grad-light mt-3 text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {fiber.headline}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-brand-slate">{fiber.sub}</p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {fiber.valuePoints.map((v) => (
              <li key={v} className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-wash px-3.5 py-2 text-xs font-semibold text-brand-ink">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0072b2" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                {v}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {fiber.tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07} className="flex">
              <TierCard {...t} tone="light" featured={t.name === "AT&T Fiber 1 GIG"} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-xs text-brand-mist">
          {fiber.fromNote}. Pricing is promotional and eligibility-based, and fiber is built out street by street.
          Your exact tier and price are confirmed on the call.
        </p>
      </div>
    </section>
  );
}
