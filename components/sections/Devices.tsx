import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import CallLink from "@/components/ui/CallLink";
import { devices } from "@/lib/content";
import type { StaticImageData } from "next/image";
import devZFold from "@/public/images/device-zfold8.jpeg";
import devZFlip from "@/public/images/device-zflip8.jpeg";
import devProMax from "@/public/images/device-iphone17pro.jpeg";
import devTablet from "@/public/images/device-tablet.jpeg";

/* Keyed, not positional. The previous array was indexed by position, so when
   the device list changed the photos silently shifted — a Samsung card ended
   up showing an iPhone. Looking the image up by key means a card can only ever
   render its own photo. */
const DEVICE_IMAGES: Record<string, StaticImageData> = {
  zfold8: devZFold,
  zflip8: devZFlip,
  iphone17pro: devProMax,
  tablet: devTablet,
};

/* Device lineup as two-up split cards. Motion is a staggered entrance only (§3):
   the tilt, cursor parallax and glare are gone, and so is the in-person/local
   framing the previous copy leaned on (§5.3). */
export default function Devices() {
  return (
    <section id="devices" className="relative overflow-hidden bg-brand-wash py-24 lg:py-28">
      <div className="mx-auto w-[min(100%-3rem,1200px)]">
        <Reveal className="max-w-2xl">
          <span className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-blue">
            <span className="h-px w-8 bg-brand-blue/60" /> The lineup <span className="text-brand-mist">·</span> 2026
          </span>
          <h2 className="h-grad-light mt-3 text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
            Today&apos;s phones on the AT&amp;T network.
          </h2>
          <p className="mt-4 max-w-lg text-lg text-brand-slate">
            Current AT&amp;T device offers, quoted on the call. Trade-in credit and eligibility are set by AT&amp;T.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14">
          {devices.map((d, i) => (
            <Reveal
              key={d.name}
              delay={i * 0.08}
              className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-brand-line bg-white shadow-[0_18px_50px_-28px_rgba(0,30,80,.35)] transition-[border-color,box-shadow] duration-200 hover:border-brand-blue/30 hover:shadow-[0_28px_70px_-24px_rgba(0,114,178,.4)] sm:flex-row"
            >
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-brand-navy sm:aspect-auto sm:w-[38%]">
                <Image
                  src={DEVICE_IMAGES[d.image]}
                  alt={d.name}
                  fill
                  sizes="(max-width:640px) 100vw, 25vw"
                  placeholder="blur"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-navy shadow-sm backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue-300" />
                  {d.cat}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="font-mono text-xs font-semibold tracking-widest text-brand-mist">0{i + 1} <span className="text-brand-line">/</span> 0{devices.length}</span>
                <h3 className="mt-1 text-[1.05rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-brand-ink">{d.name}</h3>
                <span aria-hidden className="mt-2 block h-1 w-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-300" />
                <p className="mt-2 text-sm text-brand-slate">{d.note}</p>

                <div className="relative mt-4 overflow-hidden rounded-xl border border-brand-blue/15 bg-gradient-to-br from-white to-brand-blue-50 p-3.5">
                  {d.offer ? (
                    <div>
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">Current AT&amp;T offer</span>
                      <b className="mt-0.5 block h-grad-light text-[1.5rem] font-extrabold leading-none">{d.offer}</b>
                      <span className="mt-1 block text-xs text-brand-slate">{d.offerNote}</span>
                    </div>
                  ) : (
                    /* No sourced offer for this row. The fallback is a plain LINE
                       that always renders, so the box is never empty even when the
                       phone number is unset and CallLink omits itself (item 5). */
                    <div>
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">Current AT&amp;T offer</span>
                      <p className="mt-1 text-sm font-semibold leading-snug text-brand-navy">
                        Call for today&apos;s rate at your address.
                      </p>
                      <CallLink
                        showNumber={false}
                        label="Call to order"
                        className="mt-2 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-brand-blue"
                      />
                    </div>
                  )}
                </div>
                {d.fine && <p className="mt-2 text-xs leading-snug text-brand-mist">{d.fine}</p>}

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {[
                    { t: "Trade-in valued by AT&T", d: "M3 7h13l-3-3m5 13H5l3 3" },
                  ].map((c) => (
                    <span key={c.t} className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-slate">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0072b2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d={c.d} /></svg>
                      {c.t}
                    </span>
                  ))}
                </div>

                <CallLink
                  showNumber={false}
                  label="Call to order"
                  icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="shrink-0"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" /></svg>}
                  className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-brand-navy px-4 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-blue sm:mt-auto"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-xs text-brand-mist">
          Device availability and offers vary and change. Ask for the exact current terms on the call.
        </p>
      </div>
    </section>
  );
}
