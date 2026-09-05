import CallLink from "@/components/ui/CallLink";
import { business, canCall } from "@/lib/business";

/* §4.0 — non-dismissable disclosure above the header. Pinned to the top by
   SiteChrome, which stacks it with the header so the two cannot overlap.
   Deliberately neutral (slate, not AT&T blue) so it is never mistaken for
   carrier branding. */
export default function DisclosureBar() {
  return (
    <div className="bg-[#1d2329] text-white">
      <p className="mx-auto w-[min(100%-2rem,1200px)] py-2 text-center text-xs font-medium leading-snug sm:text-xs">
        Independent Authorized {business.agreementNoun}{" "}of AT&amp;T<sup className="text-[0.7em]">®</sup>. Not AT&amp;T.
        {canCall && (
          <>
            {" "}
            <CallLink
              label="Call to order: "
              className="font-bold underline underline-offset-2 hover:text-brand-blue-300"
            />
          </>
        )}
      </p>
    </div>
  );
}
