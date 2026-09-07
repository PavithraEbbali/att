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
  /**
   * The §3 lockup's step line, e.g. "plus taxes & fees · no annual contract".
   * Free text because it varies per product: "no annual contract" is published
   * for Fiber and Internet Air but NOT for the postpaid wireless tiers, so it
   * must never be hardcoded across every card.
   */
  stepNote?: string;
  source: string;
  observedAt: string;
  endsAt?: string | null;
  /** true when the figure could not be re-confirmed on the most recent pass */
  recheck?: boolean;
};

export const nav = [
  { label: "Fiber", href: "#fiber" },
  { label: "Internet Air", href: "#internet-air" },
  { label: "Wireless", href: "#plans" },
  { label: "Phone", href: "#phone" },
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
export type StatEntry = {
  /** short kicker above the label, e.g. "starting at" */
  qual?: string;
  label: string;
  price: Price;
};

/* Each entry carries its OWN qualifier and step line. The §3 lockup template
   shows "with Auto Pay & Paperless Billing" / "plus taxes & fees · no annual
   contract", but neither line is universally true here:
     · AutoPay + Paperless is the published condition for wireless, Fiber and
       Internet Air, but not for the ActiveArmor add-on.
     · "no annual contract" is published for Fiber and Internet Air only. AT&T
       publishes it for PREPAID wireless, not for postpaid Value/Extra/Premium/
       Elite 2.0, so it is omitted there (see the WIRELESS note below). */
export const stats: StatEntry[] = [
  {
    qual: "starting at",
    label: "AT&T Value 2.0 unlimited, per line",
    price: {
      dollars: 30, cents: 0, period: "/mo",
      condition: "with Auto Pay & Paperless Billing",
      stepNote: "plus taxes & fees",
      source: "https://www.att.com/plans/wireless/",
      observedAt: "2026-09-05",
      endsAt: null,
    },
  },
  {
    qual: "first year",
    label: "AT&T Fiber 1 Gig, for new customers",
    price: {
      dollars: 50, cents: 0, period: "/mo",
      condition: "First year, new customers. With Auto Pay & Paperless Billing",
      stepNote: "plus taxes & fees · no annual contract",
      source: "https://www.att.com/internet/fiber/",
      observedAt: "2026-09-05",
      endsAt: null,
    },
  },
  {
    qual: "starting at",
    label: "AT&T Internet Air, 5G home internet",
    price: {
      dollars: 55, cents: 0, period: "/mo",
      condition: "with Auto Pay & Paperless Billing",
      stepNote: "plus taxes & fees · no annual contract",
      source: "https://www.att.com/internet/internet-air/",
      observedAt: "2026-09-05",
      endsAt: null,
    },
  },
  {
    qual: "optional add-on",
    label: "AT&T ActiveArmor advanced security",
    price: {
      dollars: 7, cents: 0, period: "/mo",
      condition: "Optional add-on to an eligible AT&T service",
      stepNote: "plus taxes & fees",
      source: "https://www.att.com/security/active-armor/",
      observedAt: "2026-09-05",
      endsAt: null,
    },
  },
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

/* ==================================================================
   SERVICE LINES — ordered Fiber -> Internet Air -> Bundles -> Wireless
   -> Phone. All figures re-verified against att.com on 2026-09-07.

   Deviations from the brief, forced by what AT&T actually publishes:
   · Fiber has FOUR tiers (300 / 500 / 1 GIG / 5 GIG). There is no 2 GIG
     tier on att.com/internet/fiber. Only 1 GIG carries a national price.
   · The Internet Air "$35-$47 bundled" range is not published; omitted.
   · The bundle discount AT&T publishes is $420/yr ($35/mo off 5 GIG),
     not a 20% bill credit. The 20% figure could not be sourced.
   · AT&T Phone has no nationally published price.
   ================================================================== */

/** A tier with no nationally published rate renders no price row (§2). */
export type Tier = {
  name: string;
  speed?: string;
  blurb: string;
  price: Price | null;
  features: string[];
};

/* SOURCE: https://www.att.com/internet/fiber/ (2026-09-07)
   Speed options listed on the page: 300, 500, 1000, 5000.
   "Plans From $35/mo" is a page-level entry point, not attributed to a tier,
   so it is NOT attached to Internet 300 as a per-tier price. */
export const fiber = {
  eyebrow: "AT&T Fiber®",
  headline: "Fiber-optic internet with equal upload and download speeds.",
  sub: "Four speed tiers, symmetrical throughout. Availability is confirmed at your address on the call.",
  fromNote: "Plans from $35/mo",
  valuePoints: [
    "Equal upload and download speeds",
    "Wi-Fi equipment included",
    "Unlimited internet data",
    "No annual contract",
  ],
  tiers: [
    { name: "AT&T Fiber 300", speed: "300 Mbps", blurb: "Everyday streaming and work from home.", price: null, features: ["Symmetrical 300 Mbps", "Wi-Fi equipment included", "Unlimited data"] },
    { name: "AT&T Fiber 500", speed: "500 Mbps", blurb: "Busier households on many devices.", price: null, features: ["Symmetrical 500 Mbps", "Wi-Fi equipment included", "Unlimited data"] },
    {
      name: "AT&T Fiber 1 GIG",
      speed: "1,000 Mbps",
      blurb: "The most-quoted tier.",
      price: {
        dollars: 50, cents: 0, period: "/mo",
        condition: "First year, new customers. With Auto Pay & Paperless Billing",
        stepNote: "plus taxes & fees · no annual contract",
        source: "https://www.att.com/internet/fiber/",
        observedAt: "2026-09-07",
        endsAt: null,
      },
      features: ["Symmetrical 1 Gig", "Wi-Fi equipment included", "Unlimited data"],
    },
    { name: "AT&T Fiber 5 GIG", speed: "5,000 Mbps", blurb: "The top of the lineup.", price: null, features: ["Symmetrical 5 Gig", "Wi-Fi equipment included", "Unlimited data"] },
  ] satisfies Tier[],
};

/* SOURCE: https://www.att.com/internet/internet-air/ (2026-09-07)
   AT&T operates no coaxial cable network. Its non-fiber consumer broadband is
   Internet Air (5G fixed wireless). Legacy DSL/IPBB is NOT offered to new
   customers, so it is deliberately absent rather than advertised. */
export const internetAir = {
  eyebrow: "AT&T Internet Air®",
  headline: "5G home internet where fiber has not reached.",
  sub: "A gateway you plug in yourself connects over the AT&T wireless network. Offered in select areas where AT&T Fiber is not available.",
  price: {
    dollars: 55, cents: 0, period: "/mo",
    condition: "with Auto Pay & Paperless Billing",
    stepNote: "plus taxes & fees · no annual contract",
    source: "https://www.att.com/internet/internet-air/",
    observedAt: "2026-09-07",
    endsAt: null,
  } satisfies Price,
  features: [
    "AT&T All-Fi Hub® included",
    "$0 plug-and-play self-setup",
    "Unlimited data, no overage fees",
    "No annual contract",
  ],
  // TODO(verify): the "$35-$47/mo bundled with wireless" range in the brief is
  // not published on the product page. Omitted rather than guessed.
};

/* SOURCE: https://www.att.com/bundles/ (2026-09-07)
   Verbatim condition: "$420 savings for new customers based on combined
   discounts of $35/mo. on 5-GIG internet w/ elig wireless svc and elig. AutoPay
   & paperless bill. Ltd. avail/areas."
   The brief's "20% monthly bill credit" and "Build-A-Plan from $70/mo" could
   not be sourced on att.com and are therefore not published here. */
export const bundles = {
  eyebrow: "Bundle savings",
  headline: "Add wireless to home internet and the internet bill drops.",
  sub: "AT&T applies a monthly discount when eligible wireless service sits on the same account as AT&T Fiber.",
  price: {
    dollars: 420, period: "/yr",
    condition: "New customers. $35/mo off 5 GIG internet with eligible wireless service, Auto Pay & Paperless Billing",
    stepNote: "up to · limited availability in select areas",
    source: "https://www.att.com/bundles/",
    observedAt: "2026-09-07",
    endsAt: null,
  } satisfies Price,
  points: [
    "Discount applies to the home internet line",
    "Requires eligible AT&T wireless service on the account",
    "Auto Pay and Paperless Billing required",
  ],
};

/* SOURCE: https://www.att.com/home-phone/ (2026-09-07)
   No national price is published for either product, so no price row renders.
   Page states: "AT&T Phone may require an internet connection provided by
   AT&T for an add'l cost." */
export const attPhone = {
  eyebrow: "AT&T Phone®",
  headline: "Digital home phone over your AT&T internet line.",
  sub: "Unlimited nationwide calling with call-screening features. Pricing depends on the internet plan it attaches to, so it is quoted on the call.",
  tiers: [
    {
      name: "AT&T Phone",
      blurb: "The standard digital home line.",
      price: null,
      features: ["25+ calling features", "Unlimited long distance", "Digital Phone Call Protect"],
    },
    {
      name: "AT&T Phone – Advanced",
      blurb: "Adds backup power.",
      price: null,
      features: ["Everything in AT&T Phone", "Built-in 24-hour battery backup", "Works during a power outage"],
    },
  ] satisfies Tier[],
  note: "AT&T Phone may require an internet connection provided by AT&T at an additional cost.",
};

/* VALUE-ADDED SERVICES. Product names verified on att.com (2026-09-07):
   All-Fi Hub (Internet Air gateway), All-Fi Pro (Wi-Fi 7 gateway + mesh,
   $25/mo + tax), All-Fi Extenders, ActiveArmor (included) and ActiveArmor
   advanced ($7/mo, raised from $3.99 on 2026-02-18).
   "Smart Wi-Fi Extender" is the legacy name and is not used. */
export const vas: { name: string; blurb: string; price: Price | null; features: string[] }[] = [
  {
    name: "AT&T All-Fi™",
    blurb: "The Wi-Fi that comes with your plan.",
    price: null,
    features: ["All-Fi Hub® included with AT&T Internet Air", "Standard All-Fi included with fiber plans", "Managed from the AT&T app"],
  },
  {
    name: "AT&T All-Fi Pro",
    blurb: "Wi-Fi 7 gateway with mesh extenders.",
    price: {
      dollars: 25, cents: 0, period: "/mo",
      condition: "Optional upgrade on an eligible AT&T Fiber plan",
      stepNote: "plus tax",
      source: "https://www.att.com/wi-fi/",
      observedAt: "2026-09-07",
      endsAt: null,
    },
    features: ["Wi-Fi 7 enabled gateway", "Includes All-Fi Extenders", "Each extender covers up to 1,000 sq ft"],
  },
  {
    name: "AT&T ActiveArmor℠",
    blurb: "Security screening included with service.",
    price: null,
    features: ["Included at no extra cost", "Automatic fraud call blocking", "Spam risk alerts"],
  },
  {
    name: "AT&T ActiveArmor advanced",
    blurb: "The paid security tier.",
    price: {
      dollars: 7, cents: 0, period: "/mo",
      condition: "Optional add-on to an eligible AT&T service",
      stepNote: "plus taxes & fees",
      source: "https://www.att.com/security/active-armor/",
      observedAt: "2026-09-07",
      endsAt: null,
    },
    features: ["VPN for public Wi-Fi", "Identity monitoring", "Safe browsing alerts"],
  },
];

/* HONEST FINE-PRINT GRID (§4.5). One column per internet tier.
   `null` means AT&T publishes no national figure — the cell says so plainly
   rather than inventing one. Broadband Facts labels: att.com/broadbandlabels/ */
export const finePrint = {
  broadbandFactsUrl: "https://www.att.com/broadbandlabels/",
  observedAt: "2026-09-07",
  rows: [
    "Promo price",
    "Price after promo",
    "One-time fees",
    "Equipment",
    "Taxes & fees",
    "Speeds",
    "Data cap",
    "Contract",
  ],
  columns: [
    {
      plan: "AT&T Fiber 1 GIG",
      cells: [
        "$50/mo, first year, new customers",
        null,
        "Self-install or technician install, quoted per address",
        "Wi-Fi equipment included. All-Fi Pro optional at $25/mo + tax",
        "Plus taxes & fees. Auto Pay & Paperless Billing required",
        "Up to 1,000 Mbps symmetrical. Actual speeds vary",
        "No data cap",
        "No annual contract",
      ],
    },
    {
      plan: "AT&T Fiber 300 / 500 / 5 GIG",
      cells: [
        null,
        null,
        "Self-install or technician install, quoted per address",
        "Wi-Fi equipment included. All-Fi Pro optional at $25/mo + tax",
        "Plus taxes & fees. Auto Pay & Paperless Billing required",
        "Up to 300 / 500 / 5,000 Mbps symmetrical. Actual speeds vary",
        "No data cap",
        "No annual contract",
      ],
    },
    {
      plan: "AT&T Internet Air",
      cells: [
        "$55/mo with Auto Pay & Paperless Billing",
        null,
        "$0 self-setup",
        "AT&T All-Fi Hub® included",
        "Plus taxes & fees",
        "Fixed wireless over the AT&T network. Actual speeds vary by location",
        "Unlimited data, no overage fees",
        "No annual contract",
      ],
    },
  ],
};

/* §4.7 — three steps, describing the customer's experience only. */
export const howItWorks = [
  { step: "Call the number on this page", body: "You reach an agent who works with AT&T plans and pricing." },
  { step: "Your address and price are checked", body: "The agent confirms what is available where you live and what it costs per month, while you are on the line." },
  { step: "AT&T sets up the service", body: "AT&T Internet Air ships a gateway you plug in yourself. Fiber is either self-installed or scheduled with a technician." },
];
