import CallLink from "@/components/ui/CallLink";

/* §4.10 — full-width tap-to-call bar below ~760px. Always present (never
   scroll-gated), sits at the bottom so it cannot collide with the top
   disclosure bar, and shows the number as visible text.

   Renders nothing at all while the number is unset (the wrapper collapses via
   `empty:hidden`, so no empty navy strip is left behind).

   globals.css reserves matching space at the foot of <body> below md, so the
   bar never covers the last of the footer content. */
export default function StickyCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] bg-brand-navy empty:hidden md:hidden"
      /* env(safe-area-inset-bottom) clears the home indicator on notched
         phones and resolves to 0 everywhere else. */
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <CallLink
        className="flex min-h-[56px] w-full items-center justify-center gap-2.5 border-t border-white/15 bg-brand-navy px-4 py-3 text-base font-extrabold text-white"
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="shrink-0">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
          </svg>
        }
        label="Call to order: "
      />
    </div>
  );
}
