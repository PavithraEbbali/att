import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import CallLink from "@/components/ui/CallLink";
import NetworkBadge from "@/components/ui/NetworkBadge";
import { plans, CONFIRM, NETWORK } from "@/lib/content";
import planStarter from "@/public/images/plan-starter.jpeg";
import planExtra from "@/public/images/plan-extra.jpeg";
import planPremium from "@/public/images/plan-premium.jpeg";
import planElite from "@/public/images/plan-elite.jpeg";

const PLAN_IMAGES = [planStarter, planExtra, planPremium, planElite];
const SHORT = ["Value", "Extra", "Premium", "Elite"];
const DESC = ["Do-everything simple", "The household pick", "Priority + travel", "Max everything"];
const POPULAR = 1; // Extra 2.0

const PHONE_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="shrink-0">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

/* Four plan cards. Motion is a single staggered entrance reveal (§3).

   Round 3, item 4:
   · The heading no longer claims "No annual contract" — AT&T publishes that for
     prepaid, not for these postpaid tiers. See lib/content.ts.
   · The call CTA moved to the BOTTOM of each card, after the full feature list.
     It previously sat between the price and the bullets, which read oddly.
   · Label standardised to "Call to order".
   Round 4: a tier with no nationally published price now renders NO price row at
   all. The "Call for today's rate at your address." line was removed; the
   "Call to order" button at the foot of every card is the single call to action. */
export default function Plans() {
  return (
    <section id="plans" className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[32rem] w-[32rem] rounded-full bg-brand-blue-50/70 blur-3xl" />

      <div className="relative mx-auto w-[min(100%-3rem,1200px)]">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Wireless · AT&amp;T Unlimited</span>
          <h2 className="h-grad-light mt-3 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
            Four tiers. One network.
          </h2>
          <p className="mt-4 max-w-lg text-lg text-brand-slate">
            AT&amp;T&apos;s unlimited lineup. Every line mixes and matches, keep your number, change anytime.
          </p>

          <NetworkBadge type="mobile" tone="light" className="mt-5" />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {plans.map((p, i) => {
            const popular = i === POPULAR;
            const hasPrice = p.priceFrom !== CONFIRM;
            return (
              <Reveal
                key={p.name}
                delay={i * 0.08}
                className={`group relative flex min-h-[30rem] flex-col overflow-hidden rounded-[1.5rem] text-white shadow-[0_24px_60px_-28px_rgba(0,30,80,.55)] transition-shadow duration-300 hover:shadow-[0_34px_80px_-26px_rgba(0,114,178,.5)] ${popular ? "ring-2 ring-brand-blue-300" : "ring-1 ring-black/5"}`}
              >
                <div className="absolute inset-0">
                  <Image src={PLAN_IMAGES[i]} alt="" fill sizes="(max-width:640px) 100vw, 25vw" placeholder="blur" className="object-cover" />
                </div>
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,18,44,.62) 0%, rgba(0,18,44,.82) 55%, rgba(0,16,40,.96) 100%)" }} />

                {popular && (
                  <span className="absolute right-3 top-3 z-10 rounded-full bg-brand-blue-300 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-navy shadow">Most popular</span>
                )}

                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-10 h-1"
                  style={{ background: NETWORK.mobile.accent }}
                />

                <div className="relative flex flex-1 flex-col p-6">
                  <NetworkBadge type="mobile" tone="dark" showSubtitle={false} className="mb-3" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue-300">Tier {i + 1} · {SHORT[i]}</span>
                  <h3 className="mt-1 text-2xl font-extrabold leading-none tracking-[-0.02em]">{p.name}</h3>
                  <p className="mt-1.5 text-sm text-brand-wash/75">{DESC[i]}</p>

                  {hasPrice && (
                    <div className="mt-4">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-extrabold tracking-[-0.02em] tabular-nums text-white">{p.priceFrom}</span>
                        <span className="ml-1 text-xs font-medium text-brand-wash/60">/line/mo</span>
                      </div>
                    </div>
                  )}

                  <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[0.82rem] text-brand-wash/90">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#009fdb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Bottom of the card, after the features (round 3, item 4). */}
                  <CallLink
                    showNumber={false}
                    label="Call to order"
                    icon={PHONE_ICON}
                    className={`mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold transition-colors duration-200 ${popular ? "bg-brand-blue-300 text-brand-navy hover:bg-white" : "bg-white/95 text-brand-navy hover:bg-brand-blue-300"}`}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 max-w-2xl text-xs text-brand-mist">
          Pricing is promotional, regional and eligibility-based. Final price, taxes and terms are confirmed before you order.
        </p>
      </div>
    </section>
  );
}
