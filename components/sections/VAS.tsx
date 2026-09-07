import Image, { type StaticImageData } from "next/image";
import Reveal from "@/components/ui/Reveal";
import PriceLockup from "@/components/ui/PriceLockup";
import CallLink from "@/components/ui/CallLink";
import { vas } from "@/lib/content";
import vasGateway from "@/public/images/vas-gateway.jpg";
import vasSecurity from "@/public/images/vas-security.jpg";

/* Two images across four cards, paired by kind: the hardware cards share the
   gateway shot, the security cards share the lattice. The repeat is the point
   — it groups the section visually into equipment and protection. */
const VAS_IMAGES: Record<string, StaticImageData> = {
  gateway: vasGateway,
  security: vasSecurity,
};

/* Value-added services. Product names are AT&T's current ones: All-Fi Hub,
   All-Fi Pro, All-Fi Extenders, ActiveArmor and ActiveArmor advanced. The
   legacy "Smart Wi-Fi Extender" name is not used. */
export default function VAS() {
  return (
    <section id="add-ons" className="relative overflow-hidden bg-brand-wash py-24 lg:py-28">
      <div className="mx-auto w-[min(100%-3rem,1200px)]">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Equipment &amp; security</span>
          <h2 className="h-grad-light mt-3 text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Wi-Fi and security options.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-brand-slate">
            Some of these come with the plan and some are paid upgrades. The agent can tell you which applies to
            the plan you pick.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {vas.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.07} className="flex">
              <article className="flex h-full w-full flex-col overflow-hidden rounded-[1.35rem] border border-brand-line bg-white shadow-[0_18px_50px_-28px_rgba(0,30,80,.35)] transition-colors duration-200 hover:border-brand-blue/40">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-wash">
                  <Image
                    src={VAS_IMAGES[v.image]}
                    alt={v.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-extrabold leading-tight tracking-[-0.02em] text-brand-ink">{v.name}</h3>
                <p className="mt-1.5 text-sm text-brand-slate">{v.blurb}</p>

                {v.price ? (
                  <PriceLockup price={v.price} tone="light" className="mt-5" />
                ) : (
                  <p className="mt-5 inline-flex w-max rounded-full bg-brand-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-blue">
                    Included
                  </p>
                )}

                <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                  {v.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-brand-slate">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0072b2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <CallLink
                  showNumber={false}
                  label="Call to order"
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-navy px-4 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-blue"
                />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
