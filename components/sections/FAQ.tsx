"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import CallLink from "@/components/ui/CallLink";
import { faqs } from "@/lib/content";
import { business, display } from "@/lib/business";

/* Accordion open/close is one of the four motions §3 permits. It runs on a
   CSS grid-template-rows transition (0fr -> 1fr) rather than a JS animation
   library, and collapses to an instant swap under prefers-reduced-motion.
   The decorative drifting gradient blobs the previous version animated on an
   infinite loop are gone (§3). */
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const hours = display(business.hours, "hours");

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.5] [background:radial-gradient(circle_at_1px_1px,rgba(0,56,143,.07)_1px,transparent_0)] [background-size:34px_34px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="relative mx-auto grid w-[min(100%-3rem,1200px)] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <span className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-blue">
            <span className="h-px w-8 bg-brand-blue/60" /> Answers
          </span>
          <h2 className="h-grad-light mt-4 text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[0.94] tracking-[-0.03em]">
            Questions before<br />you order.
          </h2>
          <p className="mt-5 max-w-sm text-brand-slate">
            The questions people ask most often. If yours is not here, ask on the call.
          </p>

          <div className="mt-8 max-w-sm rounded-2xl border border-brand-line bg-gradient-to-br from-brand-wash to-white p-5 shadow-[0_14px_40px_-24px_rgba(0,30,80,.4)]">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">
              Still deciding?
            </span>
            <p className="mt-2 text-sm leading-snug text-brand-slate">
              Call and an agent will confirm what is available at your address and what it costs today.
            </p>
            {/* Round 4: a solid "Call to order" button, matching the label used in
                the wireless and device cards, with the number shown beneath it. */}
            <CallLink
              showNumber={false}
              label="Call to order"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="shrink-0">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
                </svg>
              }
              className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-blue"
            />
            <CallLink className="mt-3 flex min-h-11 items-center justify-center text-lg font-extrabold text-brand-navy transition-colors duration-200 hover:text-brand-blue" />
            {hours && <p className="mt-3 text-xs text-brand-mist">{hours}</p>}
          </div>
        </Reveal>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div
                  className={`group relative overflow-hidden rounded-2xl border transition-[border-color,background-color,box-shadow] duration-200 ${
                    isOpen
                      ? "border-brand-blue/40 bg-brand-wash shadow-[0_18px_44px_-22px_rgba(0,114,178,.5)]"
                      : "border-brand-line bg-white hover:border-brand-blue/30 hover:shadow-[0_14px_34px_-20px_rgba(0,30,80,.35)]"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-y-0 left-0 w-1 origin-top bg-gradient-to-b from-brand-blue-300 to-brand-blue transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "scale-y-100" : "scale-y-0"}`}
                  />
                  <h3>
                    <button
                      id={buttonId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="flex min-w-0 items-baseline gap-4">
                        <span className={`shrink-0 font-mono text-xs font-semibold transition-colors duration-200 ${isOpen ? "text-brand-blue" : "text-brand-mist"}`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={`text-lg font-bold transition-colors duration-200 ${isOpen ? "text-brand-navy" : "text-brand-ink group-hover:text-brand-blue"}`}>{f.q}</span>
                      </span>
                      <span
                        aria-hidden
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-[transform,background-color,color] duration-200 motion-reduce:transition-none ${isOpen ? "rotate-[135deg] bg-brand-blue text-white shadow-[0_6px_18px_-4px_rgba(0,114,178,.7)]" : "bg-brand-blue-50 text-brand-blue group-hover:bg-brand-blue group-hover:text-white"}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pl-[3.75rem] pr-6 leading-relaxed text-brand-slate">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
