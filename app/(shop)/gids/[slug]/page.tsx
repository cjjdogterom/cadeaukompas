import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/lib/guides";
import { getProducts } from "@/lib/catalog";
import { BUDGETS } from "@/lib/types";
import { ProductGrid } from "@/components/ProductCard";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/gids/[slug]">): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  return { title: { absolute: guide.metaTitle }, description: guide.metaDescription, alternates: { canonical: `/gids/${guide.slug}` } };
}

export default async function GuidePage({ params }: PageProps<"/gids/[slug]">) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();

  // Statisch filteren op wie/budget/leeftijd/interesse; "op tijd" bepaalt de klant zelf via de gids-link.
  const { optijd, ...staticFilters } = guide.filters;
  const products = (await getProducts()).filter((p) => {
    const f = staticFilters;
    if (f.voor && !p.recipients.includes(f.voor)) return false;
    if (f.leeftijd && !p.ageGroups.includes(f.leeftijd)) return false;
    if (f.interesse && !p.interests.includes(f.interesse)) return false;
    if (f.budget && (p.priceCents < BUDGETS[f.budget].min || p.priceCents >= BUDGETS[f.budget].max)) return false;
    if (optijd && !p.occasions.includes(optijd)) return false;
    return true;
  });
  const filterQuery = new URLSearchParams(Object.entries(guide.filters).filter(([, v]) => v) as [string, string][]);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: guide.title,
      itemListElement: products.slice(0, 20).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${site.url}/cadeau/${p.slug}`,
        name: p.title,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav aria-label="Kruimelpad" className="text-sm text-muted">
        <Link href="/gids" className="underline underline-offset-2">Gidsen</Link> <span aria-hidden>›</span> {guide.title}
      </nav>
      <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight font-semibold tracking-tight text-ink sm:text-5xl">{guide.title}</h1>
      <div className="prose-shop mt-4 max-w-3xl text-lg text-ink/85">
        {guide.intro.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="mt-8 flex items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold text-ink">{products.length} cadeaus in deze gids</h2>
        <Link href={`/cadeaus?${filterQuery}`} className="text-sm text-muted underline underline-offset-2">Verder filteren</Link>
      </div>
      <div className="mt-5">
        {products.length ? <ProductGrid products={products} /> : <p className="text-muted">Deze gids wordt aangevuld.</p>}
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">Tips</h2>
          <ul className="prose-shop mt-2 text-ink/85">{guide.tips.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">Veelgestelde vragen</h2>
          <div className="mt-3 divide-y divide-line rounded-2xl border border-line bg-white">
            {guide.faq.map((f) => (
              <details key={f.q} className="group p-4">
                <summary className="cursor-pointer font-medium text-ink">{f.q}</summary>
                <p className="mt-2 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-xl font-semibold text-ink">Andere gidsen</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {guide.related.map((slug) => {
            const g = getGuide(slug);
            return g ? (
              <li key={slug}><Link href={`/gids/${slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 hover:border-ink/40">{g.title}</Link></li>
            ) : null;
          })}
          <li><Link href="/surprise-ideeen" className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 hover:border-ink/40">Surprise-ideeën</Link></li>
        </ul>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
