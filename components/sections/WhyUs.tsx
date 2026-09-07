import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import CallLink from "@/components/ui/CallLink";
import { business, display } from "@/lib/business";
import whyImg from "@/public/images/why-person.jpg";

/* §4.6 "Why order through us".

   Round 2, item 3: all order-mechanics language is gone. Nothing here describes
   who places what with whom, or the fulfillment relationship between this
   business and AT&T. Every line describes what the CUSTOMER does and gets.
   Round 2, item 4: the "contact AT&T directly" support-routing line is removed. */
const reasons = [
  {
    t: "Four products, one conversation",
    d: "Ask about AT&T Fiber, AT&T Internet Air, AT&T wireless and AT&T Phone on the same call, rather than working through them separately.",
  },
  {
    t: "Today's AT&T pricing, read live",
    d: "You hear the offers that are current at the moment you call, not a price a web page published weeks ago.",
  },
  {
    t: "Your address checked while you wait",
    d: "What is available where you live, and what it costs per month, is confirmed on the call before you commit to anything.",
  },
  {
    t: "Agents who know the lineup",
    d: "You get someone who works with AT&T plans, promotions and equipment every day and can compare the tiers with you.",
  },
  {
    t: "No obligation",
    d: "Call, get the pricing for your address, and hang up if it is not right for you. There is nothing to sign to ask.",
  },
];

export default function WhyUs() {
  const hours = display(business.hours, "hours");

  return (
    <section id="why" className="relative overflow-hidden bg-brand-navy py-24 text-white lg:py-28">
      <div className="absolute inset-0 -z-10">
        <Image src={whyImg} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,20,48,.88), rgba(0,14,36,.95))" }} />
      </div>

      <div className="relative mx-auto w-[min(100%-3rem,1200px)]">
        <Reveal className="max-w-2xl">
          <span className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-blue-300">
            <span className="h-px w-8 bg-brand-blue-300/60" /> Why order through us
          </span>
          <h2 className="h-grad-dark mt-4 text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
            What you get when you call.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/90">
            We are an independent authorized {business.agreementNoun}{" "}of AT&amp;T. Call for AT&amp;T plans, pricing and
            availability at your address.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal
              key={r.t}
              delay={i * 0.07}
              className="group flex h-full flex-col rounded-[1.25rem] border border-white/[0.14] bg-white/[0.06] p-6 backdrop-blur-md transition-[border-color,box-shadow] duration-200 hover:border-brand-blue-300/45 hover:shadow-[0_28px_70px_-28px_rgba(0,159,219,.5)]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-blue-300/15 text-brand-blue-300 ring-1 ring-inset ring-brand-blue-300/25">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </span>
              <h3 className="mt-4 text-lg font-extrabold leading-snug">{r.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{r.d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <CallLink
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand-blue-300 px-7 py-3.5 font-bold text-brand-navy transition-colors duration-200 hover:bg-white"
            label="Call to order: "
          />
          {hours && <p className="mt-4 text-xs text-white/70">{hours}</p>}
        </Reveal>
      </div>
    </section>
  );
}
