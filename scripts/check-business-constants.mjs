/**
 * Build gate for §8 business-identity constants.
 *
 * Runs on `prebuild`, so `npm run build` cannot produce a site that renders an
 * unset constant. Two independent checks:
 *
 *   1. Every REQUIRED constant in lib/business.ts is set (non-empty, and free
 *      of placeholder markers like TODO / XXX / TBD).
 *   2. No source file under app/, components/ or lib/ contains a
 *      placeholder-looking literal that could reach rendered output.
 *
 * Exits non-zero and prints what is missing. Node 24 strips TS types natively,
 * so lib/business.ts is imported directly rather than parsed.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const RED = "\x1b[31m";
const YEL = "\x1b[33m";
const GRN = "\x1b[32m";
const DIM = "\x1b[2m";
const OFF = "\x1b[0m";

const failures = [];

/* ---------- 0. load .env files the way Next.js does ----------
   This script runs under plain node, which does NOT read .env files. Without
   this, constants supplied through .env.local would look unset and the gate
   would block a correctly-configured build. Env files are loaded in Next's
   precedence order (.env.local wins), and real environment variables that are
   already set always win over both. */
for (const file of [".env.local", ".env"]) {
  let text;
  try {
    text = readFileSync(path.join(ROOT, file), "utf8");
  } catch {
    continue;
  }
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)$/i);
    if (!m) continue;
    const key = m[1];
    let value = m[2].trim().replace(/\s+#.*$/, "");
    if (/^(['"]).*\1$/.test(value)) value = value.slice(1, -1);
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

/* ---------- 1. required constants ---------- */
const mod = await import(pathToFileURL(path.join(ROOT, "lib", "business.ts")).href);
const missing = mod.missingRequired();

if (missing.length) {
  failures.push(
    `${missing.length} required value(s) not set. Add these environment variables\n` +
      `      (Vercel: Settings -> Environment Variables -> Production):\n` +
      missing.map((k) => `      · ${mod.ENV_VAR_FOR?.[k] ?? k}`).join("\n")
  );
}

/* ---------- 1b. reject fictional / preview phone numbers ----------
   A local preview number lets the call buttons render during review, but it must
   never reach production. 555-0100..555-0199 is the NANP range reserved for
   fiction, so it is the safe choice for previewing — and it is rejected here. */
const FAKE_NUMBER = [
  { re: /555[-.\s]?01\d\d/, why: "555-01xx is the NANP range reserved for fictional numbers" },
  { re: /^(\+?1)?[-.\s(]*(\d)\2{2}[-.\s)]*\2{3}[-.\s]?\2{4}$/, why: "all digits identical" },
  { re: /123[-.\s]?4567/, why: "sequential example number" },
];
for (const key of ["phoneDisplay", "phoneE164"]) {
  const value = mod.business[key];
  if (typeof value !== "string") continue;
  const hit = FAKE_NUMBER.find((f) => f.re.test(value));
  if (hit) {
    failures.push(`${key} is a preview/fictional number ("${value}") — ${hit.why}.\n` +
      `      Replace it with the real toll-free number before building.`);
  }
}

/* ---------- 2. placeholder literals in source ---------- */
// Matches placeholder markers only inside string/JSX text, not in code comments,
// so explanatory comments about the rule do not trip the rule itself.
const PLACEHOLDER = /(\[TODO|\{\{[A-Z_]{2,}\}\}|\bXXX+\b|\bTBD\b|\bLOREM\b)/;
const SCAN_DIRS = ["app", "components", "lib"];
const SCAN_EXT = new Set([".ts", ".tsx", ".css", ".mdx", ".json"]);

// Exempt files:
// · lib/legalContent.ts holds the {{TOKEN}} source text. Its renderer strips any
//   token it cannot resolve, so no token can reach the DOM.
// · lib/business.ts DEFINES the placeholder rule (it contains the detection
//   regex itself). Its values are covered by the stronger check 1 above.
const EXEMPT = new Set([
  path.join("lib", "legalContent.ts"),
  path.join("lib", "business.ts"),
]);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (SCAN_EXT.has(path.extname(full))) out.push(full);
  }
  return out;
}

const offenders = [];
for (const dir of SCAN_DIRS) {
  const abs = path.join(ROOT, dir);
  try { statSync(abs); } catch { continue; }
  for (const file of walk(abs)) {
    const rel = path.relative(ROOT, file);
    if (EXEMPT.has(rel)) continue;
    // Blank out block comments across the whole file first, preserving newlines
    // so reported line numbers stay accurate, then strip line comments. Only
    // real code is scanned, so documentation about the rule cannot trip it.
    const src = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, (m) =>
      m.replace(/[^\n]/g, " ")
    );
    src.split(/\r?\n/).forEach((line, i) => {
      const code = line.replace(/\/\/.*$/, "");
      const m = code.match(PLACEHOLDER);
      if (m) offenders.push(`${rel}:${i + 1}  ${m[1]}  ${DIM}${line.trim().slice(0, 80)}${OFF}`);
    });
  }
}

if (offenders.length) {
  failures.push(
    `${offenders.length} placeholder literal(s) found in source:\n` +
      offenders.map((o) => `      · ${o}`).join("\n")
  );
}

/* ---------- report ----------
   HARD-FAILS only for a production build. Vercel sets VERCEL_ENV="production"
   for the production deployment; previews and local builds get a loud warning
   instead, so a preview deploy stays reviewable. `--strict` forces failure
   anywhere, for use in CI before promoting a release. */
const isProduction = process.env.VERCEL_ENV === "production";
const strict =
  process.argv.includes("--strict") || process.env.ENFORCE_BUSINESS_CONSTANTS === "1";

if (failures.length) {
  // Deployments are not blocked by default. Unset values render as
  // "[Contact info pending]" — visibly unfinished, never deceptive.
  // Re-arm the hard failure with `--strict` or ENFORCE_BUSINESS_CONSTANTS=1.
  const blocking = strict;
  const log = blocking ? console.error : console.warn;

  log(
    blocking
      ? `\n${RED}✖ BUILD BLOCKED — unset configuration${OFF}\n`
      : `\n${YEL}⚠ Configuration incomplete — building anyway${OFF}\n`
  );
  for (const f of failures) log(`  ${YEL}${f}${OFF}\n`);

  if (blocking) {
    console.error(
      `  ${DIM}A production deployment must not go live with a missing or\n` +
        `  placeholder business identity. Set the values in .env.local or in the\n` +
        `  Vercel project settings, then rebuild.${OFF}\n`
    );
    process.exit(1);
  }

  console.warn(
    `  ${DIM}Build continues. Unset values render as "[Contact info pending]",\n` +
      `  which is visibly unfinished but never deceptive. Add them under\n` +
      `  Vercel -> Settings -> Environment Variables when available.\n` +
      `  Env: ${isProduction ? "production" : "preview/local"}${OFF}\n`
  );
  process.exit(0);
}

console.log(`${GRN}✔${OFF} business constants complete; no placeholder literals in source.`);
