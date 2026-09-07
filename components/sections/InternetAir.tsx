import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import PriceLockup from "@/components/ui/PriceLockup";
import CallLink from "@/components/ui/CallLink";
import { internetAir } from "@/lib/content";
import internetImg from "@/public/images/internet-home.jpg";

/* 2 of 6 — AT&T Internet Air. AT&T runs no coaxial cable network, so this is
   the whole non-fiber consumer broadband story. Legacy DSL/IPBB is not sold to
   new customers and is deliberately not advertised here. */
export default function InternetAir() {
  return (
    <section id="internet-air" className="relative overflow-hidden py-24 text-white lg:py-28" style={{ background: "linear-gradient(180deg, #00122c 0%, #001a3f 45%, #00285f 100%)" }}>
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full bg-brand-blue-300/10 blur-3xl" />

      <div className="relative mx-auto grid w-[min(100%-3rem,1200px)] items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <span className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-blue-300">
            <span className="h-px w-8 bg-brand-blue-300" /> {internetAir.eyebrow}
          </span>
          <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
            {internetAir.headline}
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-white/90">{internetAir.sub}</p>

          <PriceLockup price={internetAir.price} tone="dark" className="mt-8" />

          <ul className="mt-6 flex flex-col gap-2.5">
            {internetAir.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-white/90">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#009fdb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                {f}
              </li>
            ))}
          </ul>

          <CallLink
            label="Call to order"
            showNumber={false}
            className="mt-8 inline-flex min-h-11 items-center rounded-full bg-white px-7 py-3.5 font-bold text-brand-navy transition-colors duration-200 hover:bg-brand-blue-300 hover:text-white"
          />
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="relative aspect-[16/11] overflow-hidden rounded-[1.85rem] shadow-[0_50px_100px_-40px_rgba(0,0,0,.9)] ring-1 ring-white/15">
            <Image src={internetImg} alt="An internet gateway set up in a living room" fill sizes="(max-width:1024px) 100vw, 58vw" placeholder="blur" className="object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,18,44,.15) 0%, rgba(0,15,38,.3) 55%, rgba(0,12,30,.75) 100%)" }} />

            {/* Setup claim sits on the image it illustrates. */}
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-slate-950/75 p-3.5 text-xs text-slate-200 backdrop-blur-md sm:text-sm">
              <span className="font-semibold text-white">{internetAir.overlay.lead}</span>
              {" · "}
              {internetAir.overlay.rest}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
