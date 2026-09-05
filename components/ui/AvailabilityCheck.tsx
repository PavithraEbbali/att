"use client";

import { useId, useState } from "react";
import CallLink from "@/components/ui/CallLink";

/* Availability check — Option B (round 3, item 1).

   Option A (bundling FCC broadband data and doing a real client-side lookup)
   was investigated and rejected on the size check the brief asked for: the FCC
   Broadband Data Collection availability files are published per state, at
   Broadband Serviceable Location Fabric granularity, and the FCC's own
   documentation says they are large enough to need database software rather
   than a spreadsheet. Reducing them to a ZIP-level index would also require the
   Fabric plus a block-to-ZIP crosswalk, which is a data pipeline, not a static
   asset. See the handback report.

   So this claims NO verdict. It captures the ZIP, echoes it back, and routes to
   the call. There is no "available!" response to fake, because no lookup runs. */
export default function AvailabilityCheck() {
  const [zip, setZip] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const inputId = useId();
  const valid = /^\d{5}$/.test(zip);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) setSubmitted(zip);
      }}
      className="max-w-lg"
    >
      <label htmlFor={inputId} className="mb-2.5 block text-xs font-bold uppercase tracking-[0.18em] text-white/70">
        Check availability at your address
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center rounded-full border-2 border-white/40 bg-white/10 px-5 backdrop-blur-md focus-within:border-brand-blue-300">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-3 shrink-0 text-brand-blue-300" aria-hidden>
            <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <input
            id={inputId}
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
              setSubmitted(null);
            }}
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="Enter ZIP"
            // 16px prevents iOS zooming the page on focus (§6).
            className="w-full bg-transparent py-3.5 text-base font-semibold text-white placeholder:text-white/55 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={!valid}
          className="min-h-[44px] shrink-0 cursor-pointer rounded-full bg-white px-7 py-3.5 font-bold text-brand-navy transition-colors duration-200 hover:bg-brand-blue-300 hover:text-white disabled:cursor-default disabled:opacity-45"
        >
          Check availability
        </button>
      </div>

      <div aria-live="polite" className="mt-4 min-h-[1.5rem] text-sm">
        {submitted && (
          <p className="font-medium text-white">
            ZIP {submitted}: call to confirm exact availability and today&apos;s pricing.{" "}
            <CallLink
              className="font-bold underline decoration-brand-blue-300 decoration-2 underline-offset-4 transition-colors hover:text-brand-blue-300"
              label="Call "
            />
          </p>
        )}
      </div>
    </form>
  );
}
