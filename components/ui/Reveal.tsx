"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* The site's only motion primitive (§3): a one-shot entrance reveal.
   A single shared IntersectionObserver drives every instance on the page and
   unobserves each element the moment it fires, so an entrance plays once and
   costs nothing afterwards. The hidden state lives in CSS behind
   [data-js="on"] — set pre-paint in the root layout — so with JavaScript
   disabled no element is ever stranded at opacity:0. prefers-reduced-motion is
   handled in globals.css, not here, so it also covers the no-JS path. */

type Variant = "up" | "left" | "right" | "scale";

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );
  return observer;
}

type Props = {
  children: ReactNode;
  variant?: Variant;
  /** stagger offset in seconds, applied as a CSS transition-delay */
  delay?: number;
  className?: string;
};

export default function Reveal({ children, variant = "up", delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal--${variant} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
