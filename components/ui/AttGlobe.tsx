/* AT&T globe mark (approximation). Blue bands with TRANSPARENT gaps — the page
   background shows through the stripes, so there's no white disc behind it.
   Swap for the licensed official asset when available (drop in /public, use <Image>). */
export default function AttGlobe({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="AT&T">
      <mask id="att-globe-mask">
        {/* white = visible blue; black stripes = cut to transparent */}
        <circle cx="50" cy="50" r="48" fill="#fff" />
        <g fill="#000">
          <path d="M2 15 Q50 22 98 15 L98 19 Q50 26 2 19 Z" />
          <path d="M2 25 Q50 32 98 25 L98 31 Q50 38 2 31 Z" />
          <path d="M2 37 Q50 44 98 37 L98 45 Q50 52 2 45 Z" />
          <path d="M2 51 Q50 58 98 51 L98 59 Q50 66 2 59 Z" />
          <path d="M2 65 Q50 72 98 65 L98 72 Q50 79 2 72 Z" />
          <path d="M2 78 Q50 85 98 78 L98 83 Q50 90 2 83 Z" />
        </g>
      </mask>
      <circle cx="50" cy="50" r="48" fill="#009fdb" mask="url(#att-globe-mask)" />
    </svg>
  );
}
