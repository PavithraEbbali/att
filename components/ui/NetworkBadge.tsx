import { NETWORK, type NetworkType } from "@/lib/content";

/* Technology classification chip.

   Every service section header and plan card carries one, so a visitor can
   tell a fibre plan from a fixed-wireless one at a glance. Labels, subtitles
   and pill colours all come from NETWORK in lib/content.ts — nothing here is
   hardcoded copy.

   Icons are drawn inline rather than imported from an icon package: five
   glyphs do not justify adding a runtime dependency to a site that currently
   ships none. Each is aria-hidden, with the visible label beside it carrying
   the meaning for assistive technology. */

const ICONS: Record<NetworkType, React.ReactNode> = {
  // light pulse travelling down a strand
  fiber: <path d="M13 2 4.5 12.5h6L11 22l8.5-10.5h-6L13 2Z" />,
  // broadcast tower radiating
  "fixed-wireless": (
    <>
      <path d="M4.9 19.1a10 10 0 0 1 0-14.2M19.1 4.9a10 10 0 0 1 0 14.2" />
      <path d="M7.8 16.2a6 6 0 0 1 0-8.4M16.2 7.8a6 6 0 0 1 0 8.4" />
      <circle cx="12" cy="12" r="1.6" />
    </>
  ),
  // handset
  mobile: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  // stacked layers
  bundle: (
    <>
      <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
      <path d="M3 12.5 12 17l9-4.5M3 17 12 21.5 21 17" />
    </>
  ),
  // desk phone handset
  voip: (
    <>
      <path d="M15.6 8.4a3 3 0 0 1 2 2" />
      <path d="M15.2 4.8a6.8 6.8 0 0 1 5 5" />
      <path d="M21 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 3.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L7.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
    </>
  ),
};

type Props = {
  type: NetworkType;
  tone?: "light" | "dark";
  /** hide the technical subtitle where space is tight (inside a card) */
  showSubtitle?: boolean;
  className?: string;
};

export default function NetworkBadge({
  type,
  tone = "light",
  showSubtitle = true,
  className = "",
}: Props) {
  const meta = NETWORK[type];
  const pill = tone === "dark" ? meta.pillDark : meta.pillLight;
  const subtitleTone = tone === "dark" ? "text-white/60" : "text-brand-slate";

  return (
    <div className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 ${className}`}>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${pill}`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 shrink-0"
          aria-hidden="true"
        >
          {ICONS[type]}
        </svg>
        {meta.badgeLabel}
      </span>

      {showSubtitle && (
        <span className={`text-xs ${subtitleTone}`} aria-hidden="true">
          {meta.subtitle}
        </span>
      )}
    </div>
  );
}
