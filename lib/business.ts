/* ============================================================
   §8 BUSINESS IDENTITY — the single typed source for every
   business-identity constant on the site.

   DESIGN RULE (build hygiene):
   An unset constant is `null`, never a placeholder string. Nothing here can
   ever be interpolated into JSX as literal text like "[TODO ...]" or "XXX",
   because there is no such string to interpolate. Components must gate on
   `isSet()` and omit the element entirely when a value is missing.

   The build is blocked while any REQUIRED value is unset:
   `scripts/check-business-constants.mjs` runs on `prebuild` and exits non-zero.
   ============================================================ */

export type BusinessConstants = {
  /** registered legal entity name, e.g. "Example Communications LLC" */
  legalName: string | null;
  /** trading name shown in the footer wordmark; may equal legalName */
  wordmark: string | null;
  /** MUST match the signed AT&T program agreement */
  agreementNoun: string | null;
  /** display form, e.g. "(888) 123-4567" */
  phoneDisplay: string | null;
  /** E.164 form for the tel: href, e.g. "+18881234567" */
  phoneE164: string | null;
  /** real staffed hours, e.g. "Mon to Sat, 9am to 7pm ET" */
  hours: string | null;
  email: string | null;
  /** registered business address (no premises open to the public) */
  address: string | null;
  /** production origin for canonical URLs + JSON-LD, e.g. "https://example.com" */
  origin: string | null;
  /** affects whether the Privacy Policy needs a call-recording clause */
  callsRecorded: boolean | null;
  /** the "Se habla espanol" chip stays off until this is confirmed true */
  spanishStaffed: boolean | null;
};

/**
 * Reads a build-time env var, treating blank/placeholder values as unset.
 *
 * These are NEXT_PUBLIC_* because they are printed on the page — there is
 * nothing secret about a business address or a toll-free number. Setting them
 * in `.env.local` lights up every gated element (header call button, hero CTA,
 * sticky bar, footer block) with no code edit. See .env.example.
 */
const clean = (raw: string | undefined): string | null =>
  typeof raw === "string" && raw.trim() !== "" ? raw.trim() : null;

/*
  IMPORTANT: each variable below is read by STATIC property access
  (`process.env.NEXT_PUBLIC_FOO`), never `process.env[someVariable]`.

  Next.js inlines NEXT_PUBLIC_* into the client bundle only for static member
  expressions. A dynamic lookup is left untouched, so the value resolves on the
  server but comes back undefined in the browser — which silently drops gated
  elements from client components and throws a hydration mismatch, because the
  server and client render different trees. Do not refactor these into a loop.
*/
export const business: BusinessConstants = {
  // ---- SET ----------------------------------------------------------------
  // Locked to "Reseller" to match the wording the site already used throughout
  // (nav badge "AUTHORIZED RESELLER", hero eyebrow "INDEPENDENT AUTHORIZED
  // AT&T RESELLER"). MUST be confirmed against the signed AT&T program
  // agreement — carrier compliance audits check this exact word.
  agreementNoun: clean(process.env.NEXT_PUBLIC_AGREEMENT_NOUN) ?? "Reseller",

  // ---- Supply via .env.local (or edit inline) ------------------------------
  legalName: clean(process.env.NEXT_PUBLIC_LEGAL_NAME),
  wordmark: clean(process.env.NEXT_PUBLIC_WORDMARK),
  phoneDisplay: clean(process.env.NEXT_PUBLIC_PHONE_DISPLAY),
  phoneE164: clean(process.env.NEXT_PUBLIC_PHONE_E164),
  hours: clean(process.env.NEXT_PUBLIC_HOURS),
  email: clean(process.env.NEXT_PUBLIC_EMAIL),
  address: clean(process.env.NEXT_PUBLIC_ADDRESS),
  origin: clean(process.env.NEXT_PUBLIC_ORIGIN),
  callsRecorded: null,
  spanishStaffed: null,
};

/** The env var that supplies each constant, for actionable build errors. */
export const ENV_VAR_FOR: Record<string, string> = {
  legalName: "NEXT_PUBLIC_LEGAL_NAME",
  wordmark: "NEXT_PUBLIC_WORDMARK",
  agreementNoun: "NEXT_PUBLIC_AGREEMENT_NOUN",
  phoneDisplay: "NEXT_PUBLIC_PHONE_DISPLAY",
  phoneE164: "NEXT_PUBLIC_PHONE_E164",
  hours: "NEXT_PUBLIC_HOURS",
  email: "NEXT_PUBLIC_EMAIL",
  address: "NEXT_PUBLIC_ADDRESS",
  origin: "NEXT_PUBLIC_ORIGIN",
};

/** Values that must be set before the site may be built. */
export const REQUIRED_KEYS = [
  "legalName",
  "wordmark",
  "agreementNoun",
  "phoneDisplay",
  "phoneE164",
  "hours",
  "email",
  "address",
  "origin",
] as const satisfies readonly (keyof BusinessConstants)[];

/**
 * A constant counts as set only when it is a non-empty string that does not
 * still carry a placeholder marker. Components MUST call this before rendering
 * a value, so an unset constant can never reach the DOM as literal text.
 */
export function isSet(value: string | null | undefined): value is string {
  if (typeof value !== "string") return false;
  const v = value.trim();
  if (v === "") return false;
  return !/TODO|XXX|TBD|PLACEHOLDER|LOREM|\{\{|\[TODO/i.test(v);
}

/** Keys still unresolved. Empty array means the site is clear to build. */
export function missingRequired(b: BusinessConstants = business): string[] {
  return REQUIRED_KEYS.filter((k) => !isSet(b[k] as string | null));
}

/** tel: href, or null when the number is not set (never a broken placeholder). */
export const phoneHref = isSet(business.phoneE164) ? `tel:${business.phoneE164}` : null;

/** True only when both the display number and its tel: target exist. */
export const canCall = isSet(business.phoneDisplay) && phoneHref !== null;

/* ------------------------------------------------------------------
   PREVIEW vs PRODUCTION

   Production (the domain that would take Google Ads traffic) must never go
   live with a missing entity name or phone number, so the build gate hard-fails
   there. Preview deployments still need to be reviewable, so an unset constant
   renders a clearly non-deceptive label instead of a blank or a raw TODO.

   Vercel sets VERCEL_ENV to "production" only for the production deployment and
   exposes NEXT_PUBLIC_VERCEL_ENV to the browser. Both are read with STATIC
   property access, for the inlining reason described above.
   ------------------------------------------------------------------ */
export const PENDING_LABEL = "[Contact info pending]";

export const IS_PRODUCTION_BUILD =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
  process.env.VERCEL_ENV === "production";

/**
 * What to render for a business constant.
 * · set            -> the real value
 * · unset, preview -> "[Contact info pending]" (visible, obviously not final)
 * · unset, prod    -> null, so the caller omits the element entirely
 *                     (unreachable in practice: the build gate blocks first)
 */
export function display(value: string | null): string | null {
  if (isSet(value)) return value;
  return IS_PRODUCTION_BUILD ? null : PENDING_LABEL;
}
