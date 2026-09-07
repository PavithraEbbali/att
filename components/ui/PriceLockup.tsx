import type { Price } from "@/lib/content";

/* §3 — the one canonical price lockup. Emits the baseline markup:

     .lockup
       .lockup__row   aria-hidden  ($ · int · cents · /mo on one baseline)
       .sr-only                    (the same price as a plain sentence)
       .lockup__qual               (carrier qualifier)
       .lockup__step               (taxes / contract note)
       .lockup__fine               (as-of date + link to the fine print)

   The visual row is aria-hidden and the screen-reader sentence is generated
   from the SAME price object, so the two can never drift apart.

   Styling lives in globals.css under .lockup*, with a .lockup--dark modifier
   that only swaps colour tokens. */

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

/** Plain-English equivalent of everything the visual row shows. */
function spoken(p: Price) {
  const parts = [`${money(p.dollars, p.cents)} per month`];
  if (p.condition) parts.push(p.condition);
  if (p.stepNote) parts.push(p.stepNote);
  else if (p.stepUp) parts.push(`Then $${p.stepUp.amount} per month, plus taxes, fees and surcharges`);
  return `${parts.join(". ")}.`;
}

type Props = {
  price: Price;
  /** anchor for the fine-print grid (§4.5) */
  termsHref?: string;
  tone?: "light" | "dark";
  className?: string;
};

export default function PriceLockup({
  price,
  termsHref = "#fine-print",
  tone = "dark",
  className = "",
}: Props) {
  // A struck "was" price is only meaningful when it is HIGHER than the price
  // being advertised. Anything else is dropped rather than rendered backwards.
  const was = price.was != null && price.was > price.dollars ? price.was : null;
  const step = price.stepNote ?? (price.stepUp ? `Then $${price.stepUp.amount}/mo · plus taxes & fees` : null);

  return (
    <div className={`lockup ${tone === "dark" ? "lockup--dark" : ""} ${className}`.trim()}>
      <p className="lockup__row" aria-hidden="true">
        {was != null && <span className="lockup__was">${was}</span>}
        <span className="lockup__cur">$</span>
        <span className="lockup__int">{price.dollars}</span>
        {price.cents != null && (
          <span className="lockup__cents">.{String(price.cents).padStart(2, "0")}</span>
        )}
        <span className="lockup__per">{price.period ?? "/mo"}</span>
      </p>

      <p className="sr-only">{spoken(price)}</p>

      {price.condition && <p className="lockup__qual">{price.condition}</p>}
      {step && <p className="lockup__step">{step}</p>}

      <p className="lockup__fine">
        <a href={termsHref}>Pricing as of {asOf(price.observedAt)} &middot; details below</a>
      </p>
    </div>
  );
}
