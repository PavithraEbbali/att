import type { ReactNode } from "react";
import { business, phoneHref, canCall, IS_PRODUCTION_BUILD, PENDING_LABEL } from "@/lib/business";

/* The single place the phone number becomes a link.

   If the number is not set, this renders NOTHING — no element, no placeholder
   text. That is the rule for every §8 constant: components omit rather than
   print. `data-call-cta` is attached here so every call CTA on the site carries
   it without each caller having to remember (§7). */

type Props = {
  className?: string;
  icon?: ReactNode;
  /** text shown before the number, e.g. "Call to order: " */
  label?: ReactNode;
  /** extra classes for the number itself */
  numberClassName?: string;
  /**
   * Set false where repeating the number would be noisy (e.g. once per plan
   * card). The link is still gated on the number existing — it just is not
   * printed, so the CTA never appears without a working target.
   */
  showNumber?: boolean;
};

export default function CallLink({ className, icon, label, numberClassName, showNumber = true }: Props) {
  if (!canCall) {
    // Production: omit entirely (the build gate blocks before this can ship).
    if (IS_PRODUCTION_BUILD) return null;
    // Preview: render the shape of the CTA, but inert and clearly unfinished.
    return (
      <span className={className} aria-disabled="true" data-call-cta-pending>
        {icon}
        {label}
        <span className={numberClassName}>{PENDING_LABEL}</span>
      </span>
    );
  }
  return (
    <a href={phoneHref as string} data-call-cta className={className}>
      {icon}
      {label}
      {showNumber && <span className={numberClassName}>{business.phoneDisplay}</span>}
    </a>
  );
}
