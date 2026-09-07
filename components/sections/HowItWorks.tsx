import Image, { type StaticImageData } from "next/image";
import Reveal from "@/components/ui/Reveal";
import CallLink from "@/components/ui/CallLink";
import { howItWorks, howItWorksIntro } from "@/lib/content";
import { business, display } from "@/lib/business";
import coverageMap from "@/public/images/coverage-map.jpeg";
import whyPerson from "@/public/images/why-person.jpg";
import internetHome from "@/public/images/internet-home.jpg";

const IMAGES: Record<string, StaticImageData> = {
  "coverage-map": coverageMap,
  "why-person": whyPerson,
  "internet-home": internetHome,
};

const PHONE_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5 shrink-0" aria-hidden>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

/* §2.7 — order and setup, as three cards.

   Each card is an image header, a step badge bridging the image and the body,
   the copy, then a factual tag. The badge carries the only gradient in the
   section, so the numbering reads as the structural device it is.

   The CTA goes through CallLink rather than a raw anchor: that component is the
   single place the number becomes a link, so it keeps `data-call-cta` attached
   and stays gated on the number actually being set. Staffed hours come from the
   business constants, never hardcoded here. */
export default function HowItWorks() {
  const hours = display(business.hours, "hours");

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto w-[min(100%-3rem,1200px)]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">
            {howItWorksIntro.eyebrow}
          </span>
          <h2 className="mt-3 text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-brand-ink">
            {howItWorksIntro.headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-slate">{howItWorksIntro.sub}</p>
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {howItWorks.map((s, i) => (
            <li key={s.title} className="flex">
              <Reveal delay={i * 0.08} className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-brand-line bg-white shadow-[0_18px_50px_-30px_rgba(0,30,80,.45)]">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-navy">
                  <Image
                    src={IMAGES[s.image]}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                    className="object-cover"
                  />
                  <span aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,20,48,.15) 0%, rgba(0,16,40,.55) 100%)" }} />
                </div>

                <div className="relative flex flex-1 flex-col px-6 pb-6">
                  {/* Badge bridges the thumbnail and the body. */}
                  <span
                    aria-hidden
                    className="-mt-7 mb-4 grid h-14 w-14 place-items-center self-center rounded-full text-xl font-extrabold text-white shadow-[0_10px_24px_-8px_rgba(0,87,184,.8)] ring-4 ring-white"
                    style={{ background: "linear-gradient(135deg, #0057B8 0%, #009FDB 100%)" }}
                  >
                    {i + 1}
                  </span>

                  <h3 className="text-center text-lg font-extrabold leading-snug tracking-[-0.015em] text-brand-ink">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-center text-sm leading-relaxed text-brand-slate">{s.body}</p>

                  <span className="mt-5 self-center rounded-full bg-brand-blue-50 px-3.5 py-1.5 text-xs font-semibold text-brand-blue">
                    {s.tag}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.12} className="mt-12 flex flex-col items-center justify-center gap-3">
          <CallLink
            icon={PHONE_ICON}
            label="Call to Order: "
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0057B8] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#004393] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-[#0057B8] focus-visible:ring-offset-2 active:scale-[0.99]"
          />
          <p className="text-center text-xs text-brand-mist">
            Trained sales representatives on the order line
            {hours ? ` · ${hours}` : ""} · New orders only
          </p>
        </Reveal>
      </div>
    </section>
  );
}
