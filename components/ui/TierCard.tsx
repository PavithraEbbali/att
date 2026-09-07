import PriceLockup from "@/components/ui/PriceLockup";
import CallLink from "@/components/ui/CallLink";
import NetworkBadge from "@/components/ui/NetworkBadge";
import { NETWORK, type Price, type NetworkType } from "@/lib/content";

/* One card per plan tier, shared by every service section so Fiber, Internet
   Air, Wireless and Phone all present pricing identically.

   A tier with `price: null` has no nationally published rate. It renders no
   price row at all (§2) — never an invented number, never an empty box — and
   the "Call to order" button at the foot carries the action instead. */

type Props = {
  name: string;
  speed?: string;
  blurb: string;
  price: Price | null;
  features: string[];
  tone?: "light" | "dark";
  featured?: boolean;
  /** drives the classification chip and the card's top accent */
  networkType?: NetworkType;
};

export default function TierCard({
  name,
  speed,
  blurb,
  price,
  features,
  tone = "light",
  featured = false,
  networkType,
}: Props) {
  const dark = tone === "dark";
  const accent = networkType ? NETWORK[networkType].accent : null;

  const shell = dark
    ? "border-white/15 bg-white/[0.07] text-white backdrop-blur-sm hover:border-brand-blue-300/60"
    : "border-brand-line bg-white text-brand-ink hover:border-brand-blue/40";

  return (
    <article
      className={`group relative flex h-full flex-col rounded-[1.35rem] border p-6 shadow-[0_18px_50px_-28px_rgba(0,30,80,.35)] transition-[border-color,box-shadow] duration-200 ${shell} ${
        featured ? (dark ? "ring-2 ring-brand-blue-300" : "ring-2 ring-brand-blue") : ""
      }`}
    >
      {featured && (
        <span className="absolute right-4 top-4 rounded-full bg-brand-blue-300 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-navy">
          Most popular
        </span>
      )}

      {/* Top accent tints the card by network type, so the grid is scannable
          without reading any of the copy. */}
      {accent && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 rounded-t-[1.35rem]"
          style={{ background: accent }}
        />
      )}

      {networkType && <NetworkBadge type={networkType} tone={tone} showSubtitle={false} className="mb-3" />}

      {speed && (
        <span className={`text-xs font-bold uppercase tracking-[0.18em] ${dark ? "text-brand-blue-300" : "text-brand-blue"}`}>
          {speed}
        </span>
      )}
      <h3 className="mt-1 text-xl font-extrabold leading-tight tracking-[-0.02em]">{name}</h3>
      <p className={`mt-1.5 text-sm ${dark ? "text-white/75" : "text-brand-slate"}`}>{blurb}</p>

      {price ? (
        <PriceLockup price={price} tone={tone} className="mt-5" />
      ) : (
        <p className={`mt-5 text-sm font-semibold leading-snug ${dark ? "text-brand-blue-300" : "text-brand-blue"}`}>
          AT&amp;T does not publish a national rate for this tier. Call for today&apos;s price at your address.
        </p>
      )}

      <ul className="mt-5 flex flex-1 flex-col gap-2.5">
        {features.map((f) => (
          <li key={f} className={`flex items-start gap-2 text-sm ${dark ? "text-white/90" : "text-brand-slate"}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={dark ? "#009fdb" : "#0072b2"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden>
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <CallLink
        showNumber={false}
        label="Call to order"
        className={`mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold transition-colors duration-200 ${
          dark ? "bg-white text-brand-navy hover:bg-brand-blue-300" : "bg-brand-navy text-white hover:bg-brand-blue"
        }`}
      />
    </article>
  );
}
