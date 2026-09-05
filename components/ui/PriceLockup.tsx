import type { Price } from "@/lib/content";

/* §5.2 — the one canonical price component. Used in the hero and in every plan card.

   Layout: "$", the dollar figure, optional cents and the period all sit on a single
   flex baseline. No <sup>, no negative margins.

   Accessibility: the visual row is aria-hidden, and a visually-hidden sentence
   carries the same price in plain English. Both are derived from the SAME price
   object, so they cannot drift apart. */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function asOf(observedAt: string) {
  const [y, m] = observedAt.split("-").map(Number);
  return `${MONTHS[(m ?? 1) - 1]} ${y}`;
}

function money(dollars: number, cents?: number) {
  return cents == null ? `$${dollars}` : `$${dollars}.${String(cents).padStart(2, "0")}`;
}

/** Plain-English equivalent of everything the visual lockup shows. */
function spoken(p: Price) {
  const parts = [`${money(p.dollars, p.cents)} per month`];
  if (p.condition) parts.push(p.condition);
  if (p.stepUp) parts.push(`Then $${p.stepUp.amount} per month, plus taxes, fees and surcharges`);
  return `${parts.join(". ")}.`;
}

type Props = {
  price: Price;
  /** anchor for the fine-print grid (§4.5) */
  termsHref?: string;
  tone?: "light" | "dark";
  className?: string;
};

export default function PriceLockup({ price, termsHref = "#fine-print", tone = "dark", className = "" }: Props) {
  // A struck "was" price is only meaningful when it is HIGHER than the price
  // being advertised. Anything else is dropped rather than rendered backwards.
  const was = price.was != null && price.was > price.dollars ? price.was : null;

  const muted = tone === "dark" ? "text-white/70" : "text-brand-slate";
  const strong = tone === "dark" ? "text-white" : "text-brand-ink";
  const linkTone = tone === "dark" ? "text-brand-blue-300 hover:text-white" : "text-brand-blue hover:text-brand-navy";

  return (
    <div className={className}>
      <p className="sr-only">{spoken(price)}</p>

      <div aria-hidden="true" className={`flex items-baseline gap-1 ${strong}`}>
        {was != null && (
          <span className={`mr-1 text-lg font-semibold line-through ${muted}`}>${was}</span>
        )}
        <span className="text-[1.4em] font-extrabold leading-none">$</span>
        <span className="text-[2.6em] font-extrabold leading-none tracking-[-0.03em] tabular-nums">{price.dollars}</span>
        {price.cents != null && (
          <span className="text-[1.4em] font-extrabold leading-none tabular-nums">.{String(price.cents).padStart(2, "0")}</span>
        )}
        <span className={`text-[1.1em] font-semibold ${muted}`}>{price.period ?? "/mo"}</span>
      </div>

      {price.condition && (
        <p className={`mt-2 max-w-sm text-sm leading-snug ${muted}`}>{price.condition}</p>
      )}

      {price.stepUp && (
        <p className={`mt-1 max-w-sm text-sm leading-snug ${muted}`}>
          Then ${price.stepUp.amount}/mo · plus taxes, fees &amp; surcharges
        </p>
      )}

      <p className={`mt-2 text-xs ${muted}`}>
        Pricing as of {asOf(price.observedAt)} ·{" "}
        <a href={termsHref} className={`underline underline-offset-2 transition-colors ${linkTone}`}>
          terms below
        </a>
      </p>
    </div>
  );
}
