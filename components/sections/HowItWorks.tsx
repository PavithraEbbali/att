import Reveal from "@/components/ui/Reveal";
import CallLink from "@/components/ui/CallLink";
import { howItWorks } from "@/lib/content";

/* §4.7 — three steps. Describes what the customer does and gets, not the
   fulfillment relationship behind it. */
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto w-[min(100%-3rem,1100px)]">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">How it works</span>
          <h2 className="h-grad-light mt-3 text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Three steps, one phone call.
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-6 sm:grid-cols-3">
          {howItWorks.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08} className="flex">
              <li className="flex h-full w-full list-none flex-col rounded-[1.35rem] border border-brand-line bg-brand-wash p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-navy text-base font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-extrabold leading-snug text-brand-ink">{s.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-slate">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1} className="mt-10">
          <CallLink
            label="Call to order: "
            className="inline-flex min-h-11 items-center rounded-full bg-brand-navy px-7 py-3.5 font-bold text-white transition-colors duration-200 hover:bg-brand-blue"
          />
        </Reveal>
      </div>
    </section>
  );
}
