import Reveal from "@/components/ui/Reveal";
import { finePrint } from "@/lib/content";

/* §4.5 — the honest fine-print grid, and the target of every "details below"
   link in the price lockups.

   Mobile treatment (round 5): below `lg` this renders as one stacked card per
   plan, each a definition list. It only becomes a table on wide screens, so a
   phone never gets a squeezed three-column comparison. Both layouts read from
   the same data.

   A `null` cell means AT&T publishes no national figure. It says so plainly
   rather than showing a blank or an invented number. */

const NOT_PUBLISHED = "Not published nationally. Quoted on the call.";

export default function FinePrint() {
  const { rows, columns, broadbandFactsUrl } = finePrint;

  return (
    <section id="fine-print" className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="mx-auto w-[min(100%-3rem,1200px)]">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">The fine print</span>
          <h2 className="h-grad-light mt-3 text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            What each plan actually costs.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-brand-slate">
            Promotional price, what happens after it ends, one-time fees, equipment and speed, side by side.
          </p>
        </Reveal>

        {/* ---------- Mobile: one card per plan ---------- */}
        <div className="mt-10 flex flex-col gap-5 lg:hidden">
          {columns.map((col, ci) => (
            <Reveal key={col.plan} delay={ci * 0.06}>
              <div className="rounded-[1.35rem] border border-brand-line bg-brand-wash p-6">
                <h3 className="text-lg font-extrabold tracking-[-0.02em] text-brand-ink">{col.plan}</h3>
                <dl className="mt-4 flex flex-col divide-y divide-brand-line">
                  {rows.map((row, ri) => (
                    <div key={row} className="grid grid-cols-[9rem_1fr] gap-3 py-3">
                      <dt className="text-xs font-bold uppercase tracking-wide text-brand-blue">{row}</dt>
                      <dd className={`text-sm leading-snug ${col.cells[ri] ? "text-brand-ink" : "text-brand-slate"}`}>
                        {col.cells[ri] ?? NOT_PUBLISHED}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Desktop: comparison table ---------- */}
        <Reveal className="mt-12 hidden lg:block">
          <div className="overflow-x-auto rounded-[1.35rem] border border-brand-line">
            <table className="w-full min-w-[56rem] border-collapse text-left">
              <caption className="sr-only">
                Pricing and terms compared across AT&amp;T internet plans
              </caption>
              <thead>
                <tr className="bg-brand-wash">
                  <th scope="col" className="w-48 px-5 py-4 text-xs font-bold uppercase tracking-wide text-brand-blue">
                    Plan
                  </th>
                  {columns.map((col) => (
                    <th key={col.plan} scope="col" className="px-5 py-4 text-sm font-extrabold text-brand-ink">
                      {col.plan}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={row} className="border-t border-brand-line align-top">
                    <th scope="row" className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-brand-blue">
                      {row}
                    </th>
                    {columns.map((col) => (
                      <td
                        key={col.plan}
                        className={`px-5 py-4 text-sm leading-snug ${col.cells[ri] ? "text-brand-ink" : "text-brand-slate"}`}
                      >
                        {col.cells[ri] ?? NOT_PUBLISHED}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Fees that apply on any plan, so they sit outside the per-plan grid. */}
        <Reveal delay={0.08} className="mt-8">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">Charged on any plan</h3>
          <dl className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {finePrint.otherFees.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-3 border-b border-brand-line py-2">
                <dt className="text-sm text-brand-slate">{f.label}</dt>
                <dd className="text-sm font-semibold tabular-nums text-brand-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-brand-mist">
          Facts sourced from att.com, September 2026. Confirm at your address by phone. AT&amp;T publishes an FCC
          Broadband Facts label for every internet plan:{" "}
          <a
            href={broadbandFactsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue underline underline-offset-2 hover:text-brand-navy"
          >
            view AT&amp;T Broadband Facts
          </a>
          .
        </p>
      </div>
    </section>
  );
}
