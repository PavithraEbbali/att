import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import CallLink from "@/components/ui/CallLink";
import { internet } from "@/lib/content";
import internetImg from "@/public/images/internet-home.jpg";

/* Home internet. The scroll-tied gradient, cursor parallax, tilt, count-up speed
   figure and magnetic CTA are all removed (§3). The address-check CTA now points at
   the phone line instead of a lookup widget (§7). */
const POINT_ICONS = [
  "M12 3 3 8.5v7L12 21l9-5.5v-7L12 3Z", // fiber node
  "M5 12.55a11 11 0 0 1 14 0M8.5 16.4a6 6 0 0 1 7 0M12 20h.01M2 8.82a15 15 0 0 1 20 0", // 5G air
  "M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5", // home wifi
];

export default function Internet() {
  return (
    <section id="internet" className="relative overflow-hidden py-24 text-white lg:py-28" style={{ background: "linear-gradient(180deg, #00122c 0%, #001a3f 45%, #00285f 100%)" }}>
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full bg-brand-blue-300/10 blur-3xl" />

      <div className="relative mx-auto w-[min(100%-3rem,1200px)]">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <span className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-blue-300">
              <span className="h-px w-8 bg-brand-blue-300" /> {internet.eyebrow}
            </span>
            <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
              {internet.headline}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/90">{internet.sub}</p>

            <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue-300">{internet.speedLabel}</span>
                <div className="flex items-baseline">
                  <span className="text-[clamp(2.8rem,6vw,4.5rem)] font-extrabold leading-none tracking-[-0.04em] tabular-nums text-white">
                    {internet.speedValue.toLocaleString()}
                  </span>
                  <span className="ml-2 text-xl font-bold text-brand-blue-300">{internet.speedUnit}</span>
                </div>
              </div>
              <span className="mb-1 rounded-full border border-brand-blue-300/40 bg-brand-blue-300/15 px-3 py-1.5 text-sm font-bold text-white">{internet.priceNote}</span>
            </div>

            <div className="mt-8">
              <CallLink
                label="Call to check availability: "
                className="inline-flex min-h-[44px] items-center rounded-full bg-white px-7 py-3.5 font-bold text-brand-navy shadow-lg shadow-black/20 transition-colors duration-200 hover:bg-brand-blue-300 hover:text-white"
              />
            </div>
            <p className="mt-3 text-xs text-white/60">{internet.priceFine}</p>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[1.85rem] shadow-[0_50px_100px_-40px_rgba(0,0,0,.9)] ring-1 ring-white/15">
              <Image src={internetImg} alt="Home internet router set up in a modern living room" fill sizes="(max-width:1024px) 100vw, 58vw" placeholder="blur" className="object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,18,44,.15) 0%, rgba(0,15,38,.3) 55%, rgba(0,12,30,.75) 100%)" }} />
              <div className="absolute bottom-5 left-5 z-20 flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-4 py-3 shadow-[0_16px_44px_rgba(0,8,24,.5)] backdrop-blur-xl">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-blue-300 to-brand-blue text-white shadow-[0_6px_18px_rgba(0,159,219,.4)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 3 8.5v7L12 21l9-5.5v-7L12 3Z" /></svg>
                </span>
                <span>
                  <span className="block text-sm font-bold leading-tight text-white">AT&amp;T Fiber &amp; AT&amp;T Internet Air<sup className="text-[0.6em]">®</sup></span>
                  <span className="block text-xs font-medium leading-tight text-white/75">{internet.priceNote}</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-16 lg:mt-20">
          <div aria-hidden className="pointer-events-none absolute inset-x-8 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand-blue-300/40 to-transparent sm:block" />
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-3">
            {internet.points.map((pt, i) => (
              <Reveal key={pt.title} delay={0.08 + i * 0.08} className="group relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border border-brand-blue-300/30 bg-[#001a3f] text-brand-blue-300 shadow-[0_0_0_7px_#001a3f] transition-colors duration-200 group-hover:border-brand-blue-300 group-hover:text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={POINT_ICONS[i]} /></svg>
                  </span>
                  <span className="font-mono text-sm font-bold text-brand-blue-300">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-white">{pt.title}</h3>
                <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/85">{pt.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
