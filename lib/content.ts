/* ============================================================
   SINGLE SOURCE OF TRUTH for site content (§2).

   Business-identity constants live in lib/business.ts, NOT here.

   Rules enforced here:
   · No price is hardcoded inside a component. Everything renders from this file.
   · Every price/promo carries its source (att.com URL), the date it was pulled,
     any stated end date, and the carrier's own qualifier close to verbatim.
   · Where AT&T publishes no national number, there is NO invented figure. The
     plan renders the "call for today's rate" fallback with no price row (§2).
   ============================================================ */

import { business } from "./business";

/** Lower-cased agreement noun for mid-sentence use, e.g. "an independent authorized reseller". */
const noun = (business.agreementNoun ?? "").toLowerCase();

/** A price we are willing to put on the page, with its provenance. */
export type Price = {
  dollars: number;
  cents?: number;
  period?: string;
  /** struck former price, only rendered when strictly greater than `dollars` (§5.2) */
  was?: number;
  /** carrier's own qualifier, kept close to verbatim */
  condition: string;
  /** post-promo step-up, when AT&T publishes one */
  stepUp?: { amount: number } | null;
  source: string;
  observedAt: string;
  endsAt?: string | null;
  /** true when the figure could not be re-confirmed on the most recent pass */
  recheck?: boolean;
};

export const nav = [
  { label: "Plans", href: "#plans" },
  { label: "Devices", href: "#devices" },
  { label: "Internet", href: "#internet" },
  { label: "Coverage", href: "#coverage" },
  { label: "FAQ", href: "#faq" },
];

/* ------------------------------------------------------------------
   HERO — anchored to AT&T's current published Fiber offer.
   ------------------------------------------------------------------ */
export const hero = {
  sub: "AT&T Fiber, AT&T Internet Air, AT&T wireless and AT&T Phone. Call for plan options and pricing at your address.",
  price: {
    dollars: 50,
    period: "/mo",
    condition:
      "For your first year. New customers only. Price plus taxes and fees with eligible AutoPay and Paperless bill. Must maintain service for 90 days. Limited availability in select areas.",
    // AT&T does not publish the year-two rate nationally.
    // TODO(verify): post-promo step-up price for AT&T Fiber 1 GIG.
    stepUp: null,
    source: "https://www.att.com/internet/fiber/",
    observedAt: "2026-09-05",
    endsAt: null,
  } satisfies Price,
  /* Both chips are sourced and both hold for Fiber and Internet Air.
     "No equipment fee" (suggested in §4.2) is NOT used: it could not be confirmed
     for Fiber, and All-Fi Pro is a paid $25/mo upgrade. See handback report. */
  chips: ["No annual contract", "No data caps"],
};

/* ------------------------------------------------------------------
   STAT LEDGER — national AT&T figures only.
   ------------------------------------------------------------------ */
export const stats: {
  value: string | null; qual?: string; prefix: string; suffix: string; label: string; cite: string;
}[] = [
  // https://www.att.com/plans/wireless/ — "starting at $30/month per line", req. AutoPay + Paperless.
  { value: "30", qual: "starting at", prefix: "$", suffix: "/mo", label: "AT&T Value 2.0 unlimited, per line, with AutoPay and Paperless bill", cite: "att.com/plans/wireless, 2026-09-05" },
  // https://www.att.com/internet/fiber/ — "1 GIG ... $50/mo. For your first year. New customers only."
  { value: "50", qual: "first year", prefix: "$", suffix: "/mo", label: "AT&T Fiber 1 Gig, first-year price for new customers", cite: "att.com/internet/fiber, 2026-09-05" },
  // https://www.att.com/internet/internet-air/ — "starting at $55/mo", AutoPay & Paperless req'd.
  { value: "55", qual: "starting at", prefix: "$", suffix: "/mo", label: "AT&T Internet Air, with AutoPay and Paperless bill", cite: "att.com/internet/internet-air, 2026-09-05" },
  // https://www.att.com/security/active-armor/ — ActiveArmor advanced, "$7 a month".
  { value: "7", qual: "add-on", prefix: "$", suffix: "/mo", label: "AT&T ActiveArmor advanced, optional security add-on", cite: "att.com/security/active-armor, 2026-09-05" },
];

/* ------------------------------------------------------------------
   WIRELESS — plan NAMES re-verified 2026-09-05 against
   https://www.att.com/plans/wireless/ (Value/Extra/Premium/Elite 2.0 confirmed).

   CONTRACT CLAIM REMOVED (round 3, item 4): "No annual contract" is a claim AT&T
   makes for PREPAID (att.com/prepaid/: "no annual contract, no credit check").
   It is NOT published for the postpaid Value/Extra/Premium/Elite 2.0 plans, and
   AT&T maintains a support article on checking a wireless contract end date. The
   bullet and the section heading were dropped rather than left unverified (§7).

   Only Value 2.0 carries a nationally published price. The previous build listed
   Extra $40 / Premium $50 / Elite $70 as "verified 2026-08-05"; on the 2026-09-05
   pass att.com does not publish those per-line prices outside the address-gated
   shop flow, so they are removed rather than carried forward unverified (§0).
   TODO(verify): per-line pricing for Extra 2.0, Premium 2.0 and Elite 2.0.
   ------------------------------------------------------------------ */
export const CONFIRM = "[call-for-rate]";

export const plans = [
  {
    name: "AT&T Value 2.0",
    blurb: "The simple, do-everything unlimited line.",
    priceFrom: "$30",
    accent: "essential",
    // Features close to verbatim from att.com/plans/wireless, 2026-09-05.
    features: [
      "Unlimited talk, text and data in and between the U.S., Canada and Mexico",
      "5GB high-speed data",
      "3GB hotspot data",
    ],
  },
  {
    name: "AT&T Extra 2.0",
    blurb: "The household sweet spot.",
    priceFrom: CONFIRM,
    accent: "featured",
    features: ["Everything in Value 2.0", "100GB high-speed data", "50GB hotspot data"],
  },
  {
    name: "AT&T Premium 2.0",
    blurb: "Unlimited high-speed data with no slowdowns.",
    priceFrom: CONFIRM,
    accent: "premium",
    features: [
      "Unlimited high-speed data with no speed reductions",
      "100GB hotspot data",
      "Talk, text and high-speed data in 20 Latin American countries",
    ],
  },
  {
    name: "AT&T Elite 2.0",
    blurb: "The top of the lineup.",
    priceFrom: CONFIRM,
    accent: "elite",
    features: [
      "Everything in Premium 2.0",
      "250GB hotspot data",
      "Coverage in 210+ international destinations",
      "AT&T Turbo data performance boost",
    ],
  },
];

/* ------------------------------------------------------------------
   DEVICES — `offer: null` renders a "call for the current offer" row.
   The previous build's "$10/mo tablet" line had no source and is removed.
   ------------------------------------------------------------------ */
export const devices: {
  name: string; cat: string; note: string; offer: string | null; offerNote: string; fine: string; cite: string; recheck?: boolean;
}[] = [
  // https://www.att.com/ homepage, 2026-09-05 — "Galaxy Z Fold8 ... $0 ... Req. trade-in of $290 or more & eligible plan."
  { name: "Samsung Galaxy Z Fold8", cat: "Foldable", note: "Tablet-size folding screen", offer: "$0", offerNote: "with eligible trade-in", fine: "Requires trade-in of $290 or more and an eligible plan. Terms apply and are subject to change.", cite: "att.com, 2026-09-05" },
  // https://www.att.com/ homepage, 2026-09-05 — "Galaxy Z Flip8 ... Up to $1,000 off."
  { name: "Samsung Galaxy Z Flip8", cat: "Foldable", note: "Compact flip design", offer: "Up to $1,000 off", offerNote: "with eligible trade-in", fine: "Requires trade-in of a Galaxy S22+, Z Flip4, Z Fold3 or higher smartphone, and an eligible plan. Terms apply.", cite: "att.com, 2026-09-05" },
  // Carried from the 2026-08-05 pass; NOT re-confirmed on 2026-09-05 (the homepage showed Samsung offers).
  // TODO(verify): re-confirm the iPhone 17 Pro Max trade-in offer before launch.
  { name: "iPhone 17 Pro Max", cat: "Flagship", note: "Pro camera system", offer: "Up to $1,100 off", offerNote: "with eligible trade-in", fine: "Requires trade-in of $290 or more and an eligible plan. Terms apply and are subject to change.", cite: "att.com, 2026-08-05", recheck: true },
  // The prior "$10/mo tablet" promo had no source at all. Replaced with the call fallback.
  { name: "Tablets and connected devices", cat: "Tablet", note: "Add a data line", offer: null, offerNote: "the current tablet offer", fine: "Tablet offers, pricing and availability vary and are set by AT&T.", cite: "" },
];

/* ------------------------------------------------------------------
   HOME INTERNET — rewritten from scratch (round 2, item 5).

   Fact-checks behind this copy, all att.com, 2026-09-05:
   · "Equal upload and download speeds: Unlike most other internet types, fiber
     gives you the same fast speed whether you're uploading or downloading."
     — att.com/internet/fiber/
   · Top consumer tier is 5 GIG — about.att.com/story/2026/new-att-fiber-plans.html
   · Internet Air is "a fixed wireless service delivered to the premises over the
     AT&T wireless network", using the AT&T All-Fi Hub, and is "available only in
     select areas and where AT&T Fiber is not available."
     — att.com/internet/what-is-internet-air/, att.com/internet/internet-air/
   NOTE: the word "dedicated" is deliberately NOT used for Fiber. AT&T does not
   describe the line that way on its own product pages. See handback report.
   ------------------------------------------------------------------ */
export const internet = {
  eyebrow: "Home Internet",
  headline: "Two ways to get AT&T home internet.",
  sub:
    "AT&T Fiber runs on a fiber-optic connection and gives you equal upload and download speeds, on tiers up to 5 Gig. AT&T Internet Air is fixed wireless home internet: the AT&T All-Fi Hub plugs in at home and connects over the AT&T wireless network, and it is offered in select areas where AT&T Fiber is not available. Your address decides which of the two you can get, and an agent confirms it on the call.",
  speedLabel: "AT&T Fiber speeds up to",
  speedValue: 5000,
  speedUnit: "Mbps",
  priceNote: "1 Gig from $50/mo, first year",
  priceFine:
    "First year, new customers only. Plus taxes and fees with eligible AutoPay and Paperless bill. Must maintain service for 90 days. Limited availability. Actual speeds vary.",
  points: [
    { title: "AT&T Fiber", body: "Equal upload and download speeds, on tiers up to 5 Gig." },
    { title: "AT&T Internet Air", body: "Fixed wireless home internet with $0 self-setup, unlimited data and no annual contract." },
    { title: "AT&T All-Fi", body: "All-Fi is included with fiber plans. All-Fi Pro is an optional $25/mo upgrade." },
  ],
};

/* ------------------------------------------------------------------
   COVERAGE — AT&T's actual network reach (round 2, item 6).

   This section's job is REACH. It must not restate the Fiber-vs-Internet-Air
   explanation that lives in `internet` above.

   Every metro below was verified individually on AT&T's own local fiber pages
   on 2026-09-05. The previous list's tenth entry, "& your town", was a
   copywriting flourish rather than a place and has been dropped.
   The "21 states" figure is quoted from att.com/local/fiber: "AT&T currently
   offers internet powered by AT&T Fiber in 21 states."
   ------------------------------------------------------------------ */
export const coverage = {
  /* Sourced but NOT rendered (round 3, item 8): att.com/local/fiber states "AT&T
     currently offers internet powered by AT&T Fiber in 21 states", but the metro
     list below spans only 8 states, so printing "21 states" beside a 9-metro list
     read as a mismatch. Kept here as provenance; the headline is unquantified. */
  fiberStates: 21,
  /* Provenance for the metro list. Code-side only — never rendered to the DOM. */
  cite: "att.com/local/fiber, 2026-09-05",
  metros: [
    { city: "Dallas", state: "TX", source: "https://www.att.com/local/fiber/texas" },
    { city: "Houston", state: "TX", source: "https://www.att.com/local/fiber/texas" },
    { city: "Atlanta", state: "GA", source: "https://www.att.com/local/fiber/georgia/atlanta" },
    { city: "Chicago", state: "IL", source: "https://www.att.com/local/fiber/illinois" },
    { city: "Phoenix", state: "AZ", source: "https://www.att.com/local/fiber/arizona" },
    { city: "Miami", state: "FL", source: "https://www.att.com/local/fiber/florida/miami" },
    { city: "Denver", state: "CO", source: "https://www.att.com/local/fiber/colorado" },
    { city: "Charlotte", state: "NC", source: "https://www.att.com/local/fiber/north-carolina/charlotte" },
    { city: "Nashville", state: "TN", source: "https://www.att.com/local/fiber/tennessee/nashville" },
  ],
};

/* ------------------------------------------------------------------
   FAQ — every answer's FIRST sentence answers the question directly, for
   answer-engine extraction. FAQPage JSON-LD is generated from THIS array so
   the two cannot drift apart.

   Round 2, item 4: the "I am already an AT&T customer" question is REMOVED.
   It routed existing customers to AT&T for support, which this business does
   not do, and there is no verified answer for what actually happens when an
   existing customer calls. Flagged in the handback report rather than guessed.
   ------------------------------------------------------------------ */
export const faqs = [
  {
    q: "Is this an official AT&T site?",
    a: `No. This site is operated by an independent authorized ${noun} of AT&T products and services, not by AT&T Inc. AT&T, the Globe logo, AT&T Fiber, All-Fi and ActiveArmor are trademarks of AT&T Intellectual Property.`,
  },
  {
    q: "How do I find out what is available at my address?",
    a: "Call and an agent will check your address while you are on the phone. Availability for AT&T Fiber and AT&T Internet Air is decided address by address, so it cannot be answered accurately from a web page.",
  },
  {
    q: "What will I actually pay each month?",
    a: "An agent quotes your exact monthly price on the call, before you commit to anything. Advertised AT&T prices are promotional, usually require AutoPay and Paperless billing, and do not include taxes, fees and surcharges.",
  },
  {
    q: "How does installation work?",
    a: "It depends on the product. AT&T Internet Air uses a $0 self-setup gateway you plug in yourself, while AT&T Fiber may be self-installed or need a technician visit, which is scheduled with you.",
  },
  {
    q: "Is there an annual contract?",
    a: "AT&T Fiber and AT&T Internet Air are sold with no annual contract. If you finance a device, that installment plan is a separate agreement with its own term. Ask about the terms for the specific wireless plan you want when you call.",
  },
  {
    q: "What equipment do I need?",
    a: "AT&T provides the equipment. AT&T Internet Air includes the AT&T All-Fi Hub, fiber plans include All-Fi, and All-Fi Pro with Wi-Fi 7 and mesh extenders is an optional upgrade at $25 per month plus tax.",
  },
];
