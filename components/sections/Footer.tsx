import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import CallLink from "@/components/ui/CallLink";
import AttGlobe from "@/components/ui/AttGlobe";
import { nav } from "@/lib/content";
import { business, display, isSet } from "@/lib/business";

/* Round 3, item 9 — footer restructured to the reference-site pattern (structure
   only; none of their copy was carried over, since it contains phrases this site
   bans):

     brand mark + one short line · service links · legal links ·
     compliance/contact block · trademark attribution · copyright ·
     a separate, smaller offer-details block at the very bottom.

   "We are paid a commission by AT&T on sales we make." is REMOVED from here. The
   disclosure itself is not deleted: it now lives in full under "How we are
   compensated" on /legal/disclaimer, which the offer-details block links to.

   All twelve legal routes are now built. Every one resolves its identity values
   from lib/business.ts through resolveLegalHtml(), so none carries a hardcoded
   entity name, address, phone number or email. */
const legal = [
  { label: "Privacy Policy", slug: "privacy" },
  { label: "Terms of Use", slug: "terms" },
  { label: "Do Not Sell or Share", slug: "do-not-sell" },
  { label: "Accessibility", slug: "accessibility" },
  { label: "Contact & Compliance", slug: "contact" },
  { label: "Disclosure", slug: "disclaimer" },
  { label: "Cookies & Ad Tracking", slug: "cookies" },
  { label: "TCPA & Consent", slug: "tcpa" },
  { label: "Trademark Attributions", slug: "trademarks" },
  { label: "Marketing Policy", slug: "marketing-policy" },
  { label: "Service Fulfillment", slug: "service-fulfillment" },
  { label: "PCI DSS Compliance", slug: "pci-dss" },
];

const link =
  // min-h-11 = 44px tap target on touch screens (list links, not inline prose).
  "flex min-h-11 w-max items-center bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat transition-[background-size,color] duration-200 hover:bg-[length:100%_1px] hover:text-white";

export default function Footer() {
  const year = new Date().getFullYear();
  // display() returns the real value, or "[Contact info pending]" outside a
  // production build, or null in production (unreachable: the gate blocks first).
  const wordmark = display(business.wordmark, "wordmark");
  const legalName = display(business.legalName, "legalName");
  const address = display(business.address, "address");
  const hours = display(business.hours, "hours");
  const email = isSet(business.email) ? business.email : null;
  const emailLabel = display(business.email, "email");
  const hasContact = true; // the block always renders: unset fields show their token

  return (
    <footer className="relative border-t border-white/[0.09] bg-[#001a3d] pt-16 text-brand-wash/70">
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue-300/50 to-transparent" />

      <Reveal className="mx-auto grid w-[min(100%-3rem,1200px)] gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        {/* Brand mark + one short description line */}
        <div>
          <span className="flex items-center gap-2.5">
            <AttGlobe className="h-9 w-9 shrink-0" />
            <span className="flex flex-col leading-none">
              {wordmark && <span className="text-lg font-extrabold text-white">{wordmark}</span>}
              <span className="mt-0.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-wash/50">
                Independent Authorized {business.agreementNoun}{" "}of AT&amp;T
              </span>
            </span>
          </span>
          <p className="mt-4 max-w-xs text-sm">
            {legalName} is an independent authorized {business.agreementNoun?.toLowerCase()} of
            AT&amp;T services. AT&amp;T Fiber, AT&amp;T Internet Air, AT&amp;T wireless and AT&amp;T Phone.
          </p>
        </div>

        {/* Service / nav links */}
        <nav className="flex flex-col gap-2 text-sm">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-white">Explore</h2>
          {nav.map((n) => (
            <a key={n.href} href={n.href} className={link}>{n.label}</a>
          ))}
        </nav>

        {/* Legal links */}
        <nav className="flex flex-col gap-2 text-sm">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-white">Legal &amp; Policies</h2>
          {legal.map((l) => (
            <Link key={l.slug} href={`/legal/${l.slug}`} className={link}>{l.label}</Link>
          ))}
        </nav>

        {/* Compliance / contact block */}
        {hasContact && (
          <div className="text-sm">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-white">Contact &amp; compliance</h2>
            <p className="mb-3 max-w-xs text-xs leading-relaxed text-brand-wash/60">
              For privacy rights or compliance questions, contact us using the details below.
            </p>
            <address className="space-y-1 not-italic">
              {legalName && <span className="block font-semibold text-white">{legalName}</span>}
              {address && <span className="block">{address}</span>}
              <CallLink className={`block ${link}`} />
              {email ? (
                <a href={`mailto:${email}`} className={`block ${link}`}>{email}</a>
              ) : (
                emailLabel && <span className="block">{emailLabel}</span>
              )}
              {hours && <span className="block text-brand-wash/60">{hours}</span>}
            </address>
          </div>
        )}
      </Reveal>

      {/* Trademark + copyright */}
      <div className="mx-auto w-[min(100%-3rem,1200px)] pt-8 text-xs leading-relaxed">
        <p>AT&amp;T, the Globe logo, AT&amp;T Fiber, All-Fi and ActiveArmor are trademarks of AT&amp;T Intellectual Property.</p>
        <p className="mt-3">
          © {year}
          {legalName ? ` ${legalName}.` : "."} All rights reserved.
        </p>
      </div>

      {/* Smaller offer-details block at the very bottom */}
      <div className="mx-auto w-[min(100%-3rem,1200px)] pb-10 pt-6">
        <p className="border-t border-white/10 pt-5 text-xs leading-relaxed text-brand-wash/45">
          <b className="font-semibold text-brand-wash/60">Offer details and disclosures:</b> This website is operated by
          {legalName ? <> {legalName},</> : <> an</>} independent authorized{" "}
          {business.agreementNoun}{" "}of AT&amp;T products and services. This is not an official AT&amp;T website and we
          are not AT&amp;T Inc. Plans, pricing, promotions and availability are set by AT&amp;T, vary by address, and are
          subject to change and to AT&amp;T&apos;s own terms, network management policies and eligibility requirements.
          See our <Link href="/legal/disclaimer" className="underline underline-offset-2 hover:text-white">Disclosure</Link>{" "}
          page for full details, including how we are compensated.
        </p>
      </div>
    </footer>
  );
}
