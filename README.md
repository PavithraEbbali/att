# AT&T Authorized Reseller — marketing site

Frontend-only Next.js site for an independent authorized reseller of AT&T
Fiber, AT&T Internet Air, AT&T wireless and AT&T Phone. No API routes, no
database, no server-only code — every page prerenders to static HTML.

## Run locally

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # production build (runs the config gate first)
npm run check:constants   # check §8 business constants on their own
```

> **Note for this checkout:** the folder name contains an `&`, which breaks
> npm's Windows `cmd` shim (`'T' is not recognized as an internal or external
> command`). The npm scripts therefore call Next through `node` directly rather
> than via the `next` bin shim. Renaming the folder to drop the `&` would let
> the conventional scripts work again.

## Configuration

All business-identity values live in [`lib/business.ts`](lib/business.ts) and
are supplied via environment variables. Copy the template and fill it in:

```bash
cp .env.example .env.local
```

Every key is `NEXT_PUBLIC_*` because all of it is printed on the page — there
are **no secrets, API keys or credentials in this project**.

### The configuration gate

`scripts/check-business-constants.mjs` runs automatically on `prebuild`. It
fails if a required constant is missing, empty, still contains a placeholder
marker (`TODO`, `XXX`, `TBD`), or is a fictional phone number (the `555-01xx`
range reserved for fiction).

| Build | Missing/placeholder constant |
| --- | --- |
| Production (`VERCEL_ENV=production`) | **Build fails.** |
| Preview / local | Warns, build continues. Unset values render as `[Contact info pending]`. |

Use `node scripts/check-business-constants.mjs --strict` to force the
production behaviour anywhere (e.g. in CI before promoting a release).

## Deployment (Vercel)

Vercel auto-detects Next.js; no custom build command is needed.

1. Import the repository into Vercel.
2. Add the `.env.example` keys under **Settings → Environment Variables**.
   Preview and Production can hold different values, but Production must have
   the real ones or the build will fail by design.
3. Set `NEXT_PUBLIC_ORIGIN` to the real production domain before going live —
   it drives canonical URLs and JSON-LD.

The project intentionally does **not** use `output: "export"`, so `headers()`
in [`next.config.ts`](next.config.ts) (security headers) and `next/image`
optimisation both work. See the comment in that file for the reasoning.

## Project layout

| Path | Purpose |
| --- | --- |
| `lib/business.ts` | Business-identity constants + preview/production display rules |
| `lib/content.ts` | All plan/price/promo content, each with its att.com source and observed date |
| `lib/legalContent.ts` | Legal page copy, tokenised (`{{BUSINESS_NAME}}` etc.) |
| `components/ui/Reveal.tsx` | The site's only motion primitive (CSS + IntersectionObserver) |
| `components/ui/CallLink.tsx` | The only place the phone number becomes a link |
| `scripts/check-business-constants.mjs` | Build gate |

Pricing facts carry their source URL and the date they were pulled; see the
comments in `lib/content.ts` before changing any number.
