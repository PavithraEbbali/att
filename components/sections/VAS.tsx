import Reveal from "@/components/ui/Reveal";
import PriceLockup from "@/components/ui/PriceLockup";
import CallLink from "@/components/ui/CallLink";
import { vas } from "@/lib/content";

/* Value-added services. Product names are AT&T's current ones: All-Fi Hub,
   All-Fi Pro, All-Fi Extenders, ActiveArmor and ActiveArmor advanced. The
   legacy "Smart Wi-Fi Extender" name is not used. */
export default function VAS() {
  return (
    <section id="add-ons" className="relative overflow-hidden bg-brand-wash py-24 lg:py-28">
      <div className="mx-auto w-[min(100%-3rem,1200px)]">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Equipment &amp; security</span>
          <h2 className="h-grad-light mt-3 text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Wi-Fi and security options.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-brand-slate">
            Some of these come with the plan and some are paid upgrades. The agent can tell you which applies to
            the plan you pick.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {vas.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.07} className="flex">
              <article className="flex h-full w-full flex-col rounded-[1.35rem] border border-brand-line bg-white p-6 shadow-[0_18px_50px_-28px_rgba(0,30,80,.35)] transition-colors duration-200 hover:border-brand-blue/40">
                <h3 className="text-lg font-extrabold leading-tight tracking-[-0.02em] text-brand-ink">{v.name}</h3>
                <p className="mt-1.5 text-sm text-brand-slate">{v.blurb}</p>

                {v.price ? (
                  <PriceLockup price={v.price} tone="light" className="mt-5" />
                ) : (
                  <p className="mt-5 inline-flex w-max rounded-full bg-brand-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-blue">
                    Included
                  </p>
                )}

                <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                  {v.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-brand-slate">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0072b2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <CallLink
            label="Ask about add-ons when you call"
            showNumber={false}
            className="inline-flex min-h-11 items-center rounded-full bg-brand-navy px-7 py-3.5 font-bold text-white transition-colors duration-200 hover:bg-brand-blue"
          />
        </Reveal>
      </div>
    </section>
  );
}
