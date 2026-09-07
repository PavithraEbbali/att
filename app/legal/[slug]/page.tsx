import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allLegalDocs, resolveLegalHtml } from "@/lib/legalContent";

const decode = (s: string) => s.replace(/&middot;/g, "·").replace(/&amp;/g, "&");

export function generateStaticParams() {
  return allLegalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = allLegalDocs.find((d) => d.slug === slug);
  if (!doc) return {};
  return { title: `${doc.title} | AT&T Authorized Reseller`, description: decode(doc.description) };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = allLegalDocs.find((d) => d.slug === slug);
  if (!doc) notFound();

  return (
    <article className="mx-auto w-[min(100%-3rem,860px)] py-16 lg:py-24">
      <header className="mb-10 border-b border-brand-line pb-8">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Legal &amp; Policies</span>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-brand-ink">
          {doc.title}
        </h1>
        {doc.updated && <p className="mt-4 text-sm text-brand-mist">{decode(doc.updated)}</p>}
      </header>

      <div className="legal-prose" dangerouslySetInnerHTML={{ __html: resolveLegalHtml(doc.html) }} />
    </article>
  );
}
