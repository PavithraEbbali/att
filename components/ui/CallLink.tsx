import type { ReactNode } from "react";
import { business, phoneHref, canCall, PLACEHOLDER } from "@/lib/business";

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
  /**
   * When the number is not set yet, render a number-shaped mask after the
   * label instead of the label alone. Used by the navbar, where the button
   * needs to keep a realistic width. Off everywhere else, so ordinary CTAs
   * read as a clean "Call to order".
   */
  maskWhenUnset?: boolean;
};

export default function CallLink({ className, icon, label, numberClassName, showNumber = true, maskWhenUnset = false }: Props) {
  if (!canCall) {
    // Nothing to display at all — e.g. the footer address line, which relies
    // entirely on the number. Render nothing rather than an empty element.
    if (!label && !icon) return null;
    /* No number yet. The CTA keeps its label and shape but shows no number and
       no placeholder token — "Call to order" reads correctly on its own, where
       "Call to order: [Order Line]" does not. A trailing colon is trimmed for
       the same reason. It is a <span>, not an <a>, so nothing is dialable
       until a real E.164 number is supplied through the environment. */
    const bare = typeof label === "string" ? label.replace(/[:\s]+$/, "") : label;
    return (
      <span className={className} aria-disabled="true" data-call-cta-pending>
        {icon}
        {maskWhenUnset ? label : bare}
        {maskWhenUnset && <span className={numberClassName}>{PLACEHOLDER.phoneMask}</span>}
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
