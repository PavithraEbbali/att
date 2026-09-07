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
   * Currency symbol for the lockup's leading glyph. Pass null for a figure that
   * is not a currency amount (e.g. a percentage), so the "$" is suppressed and
   * the screen-reader sentence reads correctly.
   */
  symbol?: string | null;
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

/* ==================================================================
   NETWORK TYPE CLASSIFICATION

   Every service section header and plan card carries a chip naming the
   underlying technology, so a visitor scanning the page can tell a fibre
   plan from a fixed-wireless one without reading body copy.

   All labels, subtitles and pill classes live here — nothing is hardcoded in
   JSX. Icons are drawn inline in components/ui/NetworkBadge.tsx rather than
   pulled from an icon package: five glyphs do not justify a dependency, and
   the site currently ships zero runtime libraries.
   ================================================================== */
export type NetworkType = "fiber" | "fixed-wireless" | "mobile" | "bundle" | "voip";

export type NetworkMeta = {
  badgeLabel: string;
  /** short technical definition shown beside the label */
  subtitle: string;
  /** icon key resolved in NetworkBadge */
  icon: NetworkType;
  /** how the technology is named in the fine-print grid */
  tableLabel: string;
  /** pill classes for light and dark grounds */
  pillLight: string;
  pillDark: string;
  /** top accent used to tint a card by network type */
  accent: string;
};

export const NETWORK: Record<NetworkType, NetworkMeta> = {
  fiber: {
    badgeLabel: "100% Fiber Network",
    // "Dedicated" is not how AT&T describes the line, so it is not claimed here.
    subtitle: "Symmetrical speeds · Fiber-optic line",
    icon: "fiber",
    tableLabel: "100% Fiber-Optic",
    pillLight: "bg-cyan-500/10 text-cyan-700 border-cyan-500/30",
    pillDark: "bg-cyan-500/10 text-cyan-300 border-cyan-400/30",
    accent: "#06b6d4",
  },
  "fixed-wireless": {
    badgeLabel: "5G Home Internet (Fixed Wireless)",
    subtitle: "Over-the-air 5G signal · Plug-and-play hub",
    icon: "fixed-wireless",
    tableLabel: "5G Fixed Wireless",
    pillLight: "bg-indigo-500/10 text-indigo-700 border-indigo-500/30",
    pillDark: "bg-indigo-500/10 text-indigo-300 border-indigo-400/30",
    accent: "#6366f1",
  },
  mobile: {
    badgeLabel: "Nationwide 5G Mobile",
    subtitle: "Cellular voice, text & data · Mobile hotspot",
    icon: "mobile",
    tableLabel: "Postpaid Cellular",
    pillLight: "bg-blue-500/10 text-blue-700 border-blue-500/30",
    pillDark: "bg-blue-500/10 text-blue-300 border-blue-400/30",
    accent: "#3b82f6",
  },
  bundle: {
    badgeLabel: "Fiber + Mobile Bundle",
    subtitle: "Combined services · Monthly bill credit",
    icon: "bundle",
    tableLabel: "Fiber + Cellular",
    pillLight: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
    pillDark: "bg-emerald-500/10 text-emerald-300 border-emerald-400/30",
    accent: "#10b981",
  },
  voip: {
    badgeLabel: "Digital Home Voice (VoIP)",
    // No audio-quality claim: "crystal clear" is not something we can evidence.
    subtitle: "Broadband VoIP calling · Unlimited North America",
    icon: "voip",
    tableLabel: "Digital Voice (VoIP)",
    pillLight: "bg-slate-500/10 text-slate-700 border-slate-500/30",
    pillDark: "bg-slate-400/10 text-slate-200 border-slate-300/30",
    accent: "#94a3b8",
  },
};

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
      "Unlimited international talk and text, plus 20GB of data, in 210+ destinations",
      "AT&T Turbo data performance boost",
    ],
  },
];

/* ------------------------------------------------------------------
   DEVICES — `offer: null` renders a "call for the current offer" row.
   The previous build's "$10/mo tablet" line had no source and is removed.
   ------------------------------------------------------------------ */
export const devices: {
  name: string; cat: string; note: string; offer: string | null; offerNote: string; fine: string; cite: string;
  /** file in /public/images — keyed here so the card and its photo cannot drift apart */
  image: "zfold8" | "zflip8" | "iphone17pro" | "tablet";
  recheck?: boolean;
}[] = [
  // https://www.att.com/ homepage, 2026-09-05 — "Galaxy Z Fold8 ... $0 ... Req. trade-in of $290 or more & eligible plan."
  { image: "zfold8", name: "Samsung Galaxy Z Fold8", cat: "Foldable", note: "Tablet-size folding screen", offer: "$0", offerNote: "with eligible trade-in", fine: "Requires trade-in of $290 or more and an eligible plan. Terms apply and are subject to change.", cite: "att.com, 2026-09-05" },
  // https://www.att.com/ homepage, 2026-09-05 — "Galaxy Z Flip8 ... Up to $1,000 off."
  { image: "zflip8", name: "Samsung Galaxy Z Flip8", cat: "Foldable", note: "Compact flip design", offer: "Up to $1,000 off", offerNote: "with eligible trade-in", fine: "Requires trade-in of a Galaxy S22+, Z Flip4, Z Fold3 or higher smartphone, and an eligible plan. Terms apply.", cite: "att.com, 2026-09-05" },
  // https://www.att.com/deals/, 2026-09-07 — "up to $1,100 off ... Req. trade-in of $290 or more & eligible plan."
  { image: "iphone17pro", name: "iPhone 17 Pro Max", cat: "Flagship", note: "Pro camera system", offer: "Up to $1,100 off", offerNote: "with eligible trade-in", fine: "Requires trade-in of $290 or more and an eligible plan. Terms apply and are subject to change.", cite: "att.com/deals, 2026-09-07" },
  // The prior "$10/mo tablet" promo had no source at all. Replaced with the call fallback.
  { image: "tablet", name: "Tablets and connected devices", cat: "Tablet", note: "Add a data line", offer: null, offerNote: "the current tablet offer", fine: "Tablet offers, pricing and availability vary and are set by AT&T.", cite: "" },
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
  headline: "AT&T Internet Air®: Reliable 5G Home Internet",
  sub: "Fast, reliable fixed wireless broadband delivered over the AT&T 5G network. Ideal for addresses outside the AT&T Fiber footprint.",
  price: {
    dollars: 55, cents: 0, period: "/mo",
    condition: "with Auto Pay & Paperless Billing",
    stepNote: "plus taxes & fees · no annual contract",
    source: "https://www.att.com/internet/internet-air/",
    observedAt: "2026-09-07",
    endsAt: null,
  } satisfies Price,
  overlay: {
    lead: "Plug-and-play setup in under 15 minutes",
    rest: "Connect seamlessly with the included AT&T All-Fi Hub®",
  },
  features: [
    "AT&T All-Fi Hub® included",
    "$0 plug-and-play self-setup",
    "Unlimited data, no overage fees",
    "No annual contract",
  ],
  // TODO(verify): the "$35-$47/mo bundled with wireless" range in the brief is
  // not published on the product page. Omitted rather than guessed.
};

/* BUNDLE SAVINGS — three standalone offers, each its own card.

   Verbatim from att.com/bundles/ (2026-09-07):
     "$420 savings for new customers based on combined discounts of $35/mo. on
      5-GIG internet w/ elig wireless svc and elig. AutoPay & paperless bill.
      Ltd. avail/areas."
   Verbatim from att.com/bundles/internet-wireless/ (2026-09-07):
     "Get hyper-fast 1 GIG internet for $30/mo. For your first 12 months when
      you bundle with an unlimited wireless plan."

   TWO BULLET CORRECTIONS against the brief, both flagged in the handback:
   · "Wi-Fi 7 gateway equipment included" is wrong. Wi-Fi 7 is All-Fi Pro, a
     paid $25/mo upgrade. Standard Wi-Fi equipment is what's included.
   · The ongoing percentage discount is operator-supplied. It was checked on
     both bundle pages during the audit and appears on neither, so it carries
     `recheck` and its source records that.
   ------------------------------------------------------------------ */
export type BundleOffer = {
  eyebrow: string;
  name: string;
  badge?: string;
  featured?: boolean;
  price: Price;
  bullets: string[];
};

export const bundles = {
  eyebrow: "Bundle savings",
  headline: "Combine AT&T Fiber® & Unlimited Wireless for Maximum Savings",
  sub: "Pair an eligible AT&T postpaid unlimited wireless plan with AT&T home internet on the same account to unlock ongoing monthly bill credits and bundled perks.",
  offers: [
    {
      eyebrow: "Top-Tier Bundle Savings",
      name: "Annual savings benchmark",
      price: {
        dollars: 420, period: "/yr",
        condition: "New customers pairing 5 GIG Fiber with eligible Unlimited Wireless",
        stepNote: "up to · limited availability in select areas",
        source: "https://www.att.com/bundles/",
        observedAt: "2026-09-07",
        endsAt: null,
      } satisfies Price,
      bullets: [
        "Up to $35/mo bill credit on top-tier fiber",
        "Symmetrical upload and download speeds",
        "AT&T Internet Backup: if your internet goes down, wireless data steps up",
      ],
    },
    {
      eyebrow: "1 GIG Fiber + Wireless",
      name: "1 GIG promotional bundle",
      badge: "Most Popular Bundle",
      featured: true,
      price: {
        dollars: 30, cents: 0, period: "/mo",
        condition: "For first 12 mos when bundled with an eligible unlimited wireless plan & AutoPay",
        stepNote: "plus taxes & fees · no annual contract",
        source: "https://www.att.com/bundles/internet-wireless/",
        observedAt: "2026-09-07",
        endsAt: null,
      } satisfies Price,
      bullets: [
        "Hyper-fast 1,000 Mbps symmetrical speeds",
        "Wi-Fi equipment included, All-Fi Pro optional at $25/mo",
        "Unlimited internet data with zero overage charges",
      ],
    },
    {
      eyebrow: "Everyday Bundle Credit",
      name: "Standard ongoing discount",
      price: {
        dollars: 20, symbol: null, period: "% off",
        condition: "Ongoing discount on AT&T Fiber with eligible Unlimited Wireless",
        stepNote: "plus taxes & fees · ask the agent to confirm current terms",
        source: "operator-supplied (not published on att.com)",
        observedAt: "2026-09-07",
        endsAt: null,
        recheck: true,
      } satisfies Price,
      bullets: [
        "Applies across 300M, 500M and 1 GIG fiber plans",
        "Mix and match individual wireless lines",
        "Unified billing across internet and wireless",
      ],
    },
  ] satisfies BundleOffer[],
};

/* AT&T PHONE — plan name and calling allowances audited on att.com
   (2026-09-07). The $24.99 rate is operator-supplied: the audit found NO
   national price for AT&T Phone on att.com, so that figure is flagged
   `recheck` and attributed to the operator, not the carrier.

   Verbatim from att.com/home-phone/: "AT&T Phone may require an internet
   connection provided by AT&T for an add'l cost." */
export const attPhone = {
  eyebrow: "AT&T Phone®",
  headline: "Digital home phone over your AT&T internet line.",
  sub: "Unlimited calling across the United States, Canada, Mexico, Puerto Rico, the U.S. Virgin Islands, Guam and the Northern Mariana Islands, with no long-distance charges.",
  tiers: [
    {
      name: "AT&T Phone Unlimited North America",
      blurb: "Unlimited calling across North America.",
      price: {
        dollars: 24, cents: 99, period: "/mo",
        condition: "For 12 months when bundled with AT&T internet",
        stepNote: "plus taxes & fees",
        source: "operator-supplied (no national price published on att.com)",
        observedAt: "2026-09-07",
        endsAt: null,
        recheck: true,
      },
      features: [
        "Unlimited calls in the U.S. with no long-distance charges",
        "Unlimited calls to Canada, Mexico, Puerto Rico, the U.S. Virgin Islands, Guam and the Northern Mariana Islands",
        "25+ calling features including caller ID, voicemail and call forwarding",
        "Digital Phone Call Protect screening",
      ],
    },
    {
      name: "AT&T Phone – Advanced",
      blurb: "Adds backup power.",
      price: null,
      features: [
        "Everything in AT&T Phone",
        "Built-in 24-hour battery backup",
        "Keeps the line up during a power outage",
      ],
    },
  ] satisfies Tier[],
  note: "AT&T Phone may require an internet connection provided by AT&T at an additional cost. Discounted plans are available to qualified customers through the AT&T Lifeline Program.",
};

/* VALUE-ADDED SERVICES. Product names verified on att.com (2026-09-07):
   All-Fi Hub (Internet Air gateway), All-Fi Pro (Wi-Fi 7 gateway + mesh,
   $25/mo + tax), All-Fi Extenders, ActiveArmor (included) and ActiveArmor
   advanced ($7/mo, raised from $3.99 on 2026-02-18).
   "Smart Wi-Fi Extender" is the legacy name and is not used. */
export const vas: {
  name: string; blurb: string; price: Price | null; features: string[];
  image: "gateway" | "security"; alt: string;
}[] = [
  {
    image: "gateway",
    alt: "A home Wi-Fi gateway on a console table",
    name: "AT&T All-Fi™",
    blurb: "The Wi-Fi that comes with your plan.",
    price: null,
    features: ["All-Fi Hub® included with AT&T Internet Air", "Standard All-Fi included with fiber plans", "Managed in the AT&T Smart Home Manager app"],
  },
  {
    image: "gateway",
    alt: "A Wi-Fi 7 gateway in a living room",
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
    features: [
      "Wi-Fi 7 enabled gateway",
      "Mesh extenders included as needed, count set by AT&T",
      "ActiveArmor advanced home network security included",
      "One free equipment refresh every 36 months after 12 months of service",
    ],
  },
  {
    image: "security",
    alt: "Layered translucent blue glass panels",
    name: "AT&T ActiveArmor℠",
    blurb: "Included with wireless service.",
    price: null,
    features: [
      "Spam and fraud call blocking with voicemail routing",
      "Data breach alerts",
      "Device security alerts",
    ],
  },
  {
    /* The $7/mo tier is the MOBILE product. Home network security of the same
       name is bundled into All-Fi Pro above, not sold separately at $7. */
    image: "security",
    alt: "Layered translucent blue glass panels",
    name: "AT&T ActiveArmor advanced",
    blurb: "The paid tier, for mobile devices.",
    price: {
      dollars: 7, cents: 0, period: "/mo",
      condition: "Optional add-on for mobile devices on an eligible AT&T wireless plan",
      stepNote: "auto-renews · plus taxes & fees",
      source: "https://www.att.com/security/active-armor/",
      observedAt: "2026-09-07",
      endsAt: null,
    },
    features: [
      "Public Wi-Fi protection with encryption",
      "Dark web monitoring and credit monitoring through Experian",
      "Up to $1 million identity theft insurance",
      "Safe browsing, shopping and banking",
    ],
  },
];

/* HONEST FINE-PRINT GRID (§4.5). One column per internet tier.
   `null` means AT&T publishes no national figure — the cell says so plainly
   rather than inventing one. Broadband Facts labels: att.com/broadbandlabels/ */
export const finePrint = {
  broadbandFactsUrl: "https://www.att.com/broadbandlabels/",
  observedAt: "2026-09-07",
  rows: [
    "Technology",
    "Promo price",
    "Price after promo",
    "Self-install",
    "Technician install",
    "AutoPay discount",
    "Equipment",
    "Taxes & fees",
    "Speeds",
    "Data cap",
    "Contract",
    "Early termination",
  ],
  columns: [
    {
      plan: "AT&T Fiber 1 GIG",
      network: "fiber" as NetworkType,
      cells: [
        NETWORK.fiber.tableLabel,
        "$50/mo, first year, new customers",
        null,
        "$0 for the kit. $99 only if you request install assistance",
        "$150",
        "$10/mo with bank account or AT&T Points Plus Card. $5/mo with a debit card. No discount on other credit cards",
        "Wi-Fi equipment included. All-Fi Pro optional at $25/mo plus tax",
        "Plus taxes, government fees and local surcharges, which vary by address",
        "Up to 1,000 Mbps, equal upload and download. Actual speeds vary",
        "No data cap",
        "No annual contract",
        "None on this plan. Up to $180 pro-rated on plans sold with a service commitment",
      ],
    },
    {
      plan: "AT&T Fiber 300 / 500 / 5 GIG",
      network: "fiber" as NetworkType,
      cells: [
        NETWORK.fiber.tableLabel,
        null,
        null,
        "$0 for the kit. $99 only if you request install assistance",
        "$150",
        "$10/mo with bank account or AT&T Points Plus Card. $5/mo with a debit card. No discount on other credit cards",
        "Wi-Fi equipment included. All-Fi Pro optional at $25/mo plus tax",
        "Plus taxes, government fees and local surcharges, which vary by address",
        "Up to 300 / 500 / 5,000 Mbps, equal upload and download. Actual speeds vary",
        "No data cap",
        "No annual contract",
        "None on these plans. Up to $180 pro-rated on plans sold with a service commitment",
      ],
    },
    {
      plan: "AT&T Internet Air",
      network: "fixed-wireless" as NetworkType,
      cells: [
        NETWORK["fixed-wireless"].tableLabel,
        "$55/mo with Auto Pay & Paperless Billing",
        null,
        "$0 plug-and-play self-setup",
        "$99",
        "$5/mo, regardless of payment method",
        "AT&T All-Fi Hub® included",
        "Plus taxes, government fees and local surcharges, which vary by address",
        "Fixed wireless over the AT&T network. Actual speeds vary by location",
        "Unlimited data, no overage fees",
        "No annual contract",
        "None on this plan",
      ],
    },
  ],
  /* Charged on any plan. Sourced from AT&T's Internet Consumer Fee Schedule. */
  otherFees: [
    { label: "Late payment", value: "Up to $9.99" },
    { label: "Restoral", value: "Up to $35 per service" },
    { label: "Repair or on-demand dispatch", value: "$99 to $150 by service type" },
    { label: "Gateway not returned", value: "$150 to $200" },
    { label: "Extender not returned", value: "$65 per device" },
  ],
};

/* §4.7 / §2.7 — the three-step order and setup flow.

   Copy describes what the CUSTOMER does and gets, never the fulfillment
   relationship behind it. Step 3 keeps BOTH fiber install paths: the audit
   found AT&T Fiber can be self-installed or scheduled with a technician
   ($150), so presenting it as always-professional would be inaccurate.

   `image` names a file already in /public/images — coverage-map.jpeg was
   orphaned when the Coverage section moved to place-name chips, so it earns
   its place back here. */
export type HowItWorksStep = {
  title: string;
  body: string;
  /** short factual tag under the copy */
  tag: string;
  image: "coverage-map" | "why-person" | "internet-home";
  alt: string;
};

export const howItWorksIntro = {
  eyebrow: "Order & setup process",
  headline: "Get Connected in Three Simple Steps",
  sub: "From address verification to equipment setup, ordering AT&T Fiber and Internet Air is quick, transparent, and hassle-free.",
};

export const howItWorks: HowItWorksStep[] = [
  {
    title: "Confirm Service at Your Address",
    body: "Call the order line or enter your ZIP code. A representative checks AT&T's availability system to confirm which Fiber or Internet Air speeds reach your exact address.",
    tag: "Takes under 2 minutes",
    image: "coverage-map",
    alt: "A network coverage map",
  },
  {
    title: "Review Plans & Real Pricing",
    body: "We walk through published promotional rates, AutoPay and Paperless discounts, what equipment is included, and any reward card you qualify for. You choose the speed tier with no obligation.",
    tag: "No term contracts on standard plans",
    image: "why-person",
    alt: "A representative reviewing plan options",
  },
  {
    title: "Connect on Your Schedule",
    body: "AT&T Internet Air ships as a self-install kit you plug in yourself at no setup cost. AT&T Fiber is either self-installed or scheduled with a technician on a date you pick.",
    tag: "Self-install kit or scheduled pro setup",
    image: "internet-home",
    alt: "Home internet equipment set up in a living room",
  },
];

/* ==================================================================
   SHARED CARRIER RULES — audited 2026-09-07.

   PROVENANCE NOTE. Anything marked `operatorSupplied` was NOT found on
   att.com during the audit. It is carried because the operator supplied it
   (dealer rate cards are not public), not because it was verified. Those
   entries also set `recheck: true` so they surface in the next audit.
   ================================================================== */

/** SOURCE: att.com/deals/autopay-discount/ — verbatim tiers. */
export const autoPay = {
  /** per phone line, per month */
  wireless: { bankOrPointsPlusCard: 10, debitCard: 5, otherCreditCards: 0 },
  /** per month, on the internet line */
  internet: { bankOrPointsPlusCard: 10, debitCard: 5, otherCreditCards: 0 },
  /** Internet Air is flat, whatever the payment method */
  internetAirFlat: 5,
  requiresPaperless: true,
  activationLagBillPeriods: 2,
  note: "Requires paperless billing and a valid email on file. Takes up to two bill periods to start.",
  source: "https://www.att.com/deals/autopay-discount/",
  observedAt: "2026-09-07",
};

/** SOURCE: att.com/legal/terms.ATTInternetConsumerFeeSchedule.html */
export const fees = {
  technicianInstall: { fiber: 150, internetAir: 99, dsl: 149 },
  /** the kit itself is $0; $99 is only charged if you request assistance */
  selfInstallKit: 0,
  selfInstallAssistance: 99,
  activation: { internetAir: 35, dsl: 49, fiber: null as number | null },
  latePayment: { fiber: 9.99, internetAir: 9.99, dsl: 9.75 },
  restoral: 35,
  earlyTermination: { max: 180, proRated: true, appliesTo: "plans with a service commitment" },
  dispatch: { min: 99, max: 150 },
  unreturned: { gatewayMin: 150, gatewayMax: 200, extender: 65 },
  source: "https://www.att.com/legal/terms.ATTInternetConsumerFeeSchedule.html",
  observedAt: "2026-09-07",
};

/** SOURCE: att.com/offers/wireless-fiber/ — reward ladder + redemption window. */
export const rewardCards = {
  ladder: [
    { tier: "AT&T Fiber 300", amount: 50 },
    { tier: "AT&T Fiber 500", amount: 100 },
    { tier: "AT&T Fiber 1 GIG or higher", amount: 150 },
  ],
  redeemWithinDays: 75,
  deliveryWeeks: "3 to 4",
  condition: "Must maintain and pay for qualifying service through reward fulfillment.",
  source: "https://www.att.com/offers/wireless-fiber/",
  observedAt: "2026-09-07",
};
