import type { NextConfig } from "next";

/* Hosting decision (round 5).

   The original spec assumed static export onto shared hosting, with an
   .htaccess file supplying security headers. The target is now Vercel, so
   `output: "export"` is deliberately NOT used:

   · Vercel runs Next natively, so `headers()` below works directly and no
     .htaccess workaround is needed. Static export does not support `headers()`.
   · next/image optimisation stays available. The site leans on it heavily
     (blur placeholders, AVIF/WebP negotiation, per-breakpoint `sizes`), and
     static export would force `images.unoptimized`, undoing the round 1
     image-weight work.

   This costs nothing in scope terms: there are no API routes and no
   server-only code, so every page still prerenders as static HTML — the build
   output reports them as ○ Static / ● SSG.

   reactStrictMode is back ON. It was disabled for GSAP ScrollTrigger's
   double-invoke problem; GSAP was removed in round 1 and the only remaining
   effect (a shared IntersectionObserver in components/ui/Reveal.tsx) is
   idempotent under double-invoke.
*/

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Serve modern formats; Next negotiates AVIF -> WebP -> original per browser.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
