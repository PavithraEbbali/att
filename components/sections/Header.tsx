"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { business } from "@/lib/business";
import CallLink from "@/components/ui/CallLink";
import AttGlobe from "@/components/ui/AttGlobe";

/* Sticky header. The only motion left is the condense-on-scroll background swap
   (§3): the magnetic nav links, the entrance slide and the scroll-progress bar
   are all removed.

   §4.1: the phone number is visible as text at EVERY width. On small screens it
   sits beside the menu button, outside the hamburger, so it is never hidden
   behind a menu toggle. CallLink omits itself entirely if the number is unset.

   Positioning is owned by SiteChrome, which stacks this under the disclosure bar. */
export default function Header({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const light = solid || scrolled;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`transition-colors duration-200 ${light ? "bg-white/90 shadow-sm backdrop-blur-md" : "bg-transparent"}`}>
      <div className="mx-auto flex w-[min(100%-2rem,1200px)] items-center justify-between gap-3 py-3">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <AttGlobe className="h-11 w-11 shrink-0" />
          <span className="flex flex-col leading-none">
            <span className={`text-lg font-extrabold tracking-tight ${light ? "text-brand-ink" : "text-white"}`}>
              AT&amp;T<sup className="text-[0.5em] text-brand-blue">®</sup>
            </span>
            {/* Hidden on the narrowest screens so the call button always fits.
                The disclosure bar directly above already carries this line. */}
            <span className={`mt-0.5 hidden text-xs font-bold uppercase tracking-[0.18em] sm:block ${light ? "text-brand-slate" : "text-white/85"}`}>
              Authorized {business.agreementNoun}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={`/${n.href}`}
              className={`relative inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-semibold transition-colors after:pointer-events-none after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[1.5px] after:origin-left after:scale-x-0 after:rounded-full after:bg-current after:transition-transform after:duration-200 hover:after:scale-x-100 ${light ? "text-brand-ink hover:text-brand-blue" : "text-white/90 hover:text-white"}`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <CallLink
            label="Call "
            maskWhenUnset
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-brand-navy px-3 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-blue sm:px-4"
            numberClassName="max-w-[42vw] truncate sm:max-w-none"
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="shrink-0">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
              </svg>
            }
          />

          <button
            onClick={() => setOpen((v) => !v)}
            className={`-mr-2 grid h-11 w-11 place-items-center rounded-lg lg:hidden ${light ? "text-brand-ink" : "text-white"}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-brand-line bg-white lg:hidden">
          <div className="mx-auto flex w-[min(100%-2rem,1200px)] flex-col py-3">
            {nav.map((n) => (
              <a key={n.href} href={`/${n.href}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-brand-ink">
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
