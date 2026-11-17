import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/catalog";
import { AGE_GROUPS, INTERESTS, MERCHANTS, RECIPIENTS } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { formatDate, lastOrderDate } from "@/lib/deadlines";
import { site } from "@/lib/site";
import { ProductArt } from "@/components/ProductArt";
import { ProductGrid } from "@/components/ProductCard";

export async function generateStaticParams() {
  const slugs = (await getProducts()).map((p) => ({ slug: p.slug }));
  // Cache Components eist minstens één resultaat. In productie zijn er nog geen actieve producten
  // (alles staat op concept); de placeholder geeft gewoon een 404 via notFound().
  return slugs.length ? slugs : [{ slug: "__placeholder__" }];
}

export async function generateMetadata({ params }: PageProps<"/cadeau/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};
  return { title: product.title, description: product.short, alternates: { canonical: `/cadeau/${product.slug}` } };
}

export default async function ProductPage({ params }: PageProps<"/cadeau/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const merchant = MERCHANTS[product.merchant].name;
  const sint = lastOrderDate(product.deliveryDaysMax, "sinterklaas");
  const kerst = lastOrderDate(product.deliveryDaysMax, "kerst");
  const delivery =
    product.deliveryDaysMin === product.deliveryDaysMax
      ? `${product.deliveryDaysMax} ${product.deliveryDaysMax === 1 ? "werkdag" : "werkdagen"}`
      : `${product.deliveryDaysMin}–${product.deliveryDaysMax} werkdagen`;
  const related = (await getProducts())
    .filter((p) => p.slug !== product.slug && p.recipients.some((r) => product.recipients.includes(r)))
    .slice(0, 4);

  const jsonLd = product.priceCheckedAt
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.description,
        brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
        gtin13: product.ean,
        offers: {
          "@type": "Offer",
          price: (product.priceCents / 100).toFixed(2),
          priceCurrency: "EUR",
          url: `${site.url}/cadeau/${product.slug}`,
          seller: { "@type": "Organization", name: merchant },
        },
      }
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Kruimelpad" className="text-sm text-muted">
        <Link href="/cadeaus" className="underline underline-offset-2">Alle cadeaus</Link> <span aria-hidden>›</span> {product.title}
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-cream">
          <ProductArt product={product} sizes="(min-width: 1024px) 560px, 100vw" priority />
        </div>

        <div>
          {product.brand && <p className="text-sm font-medium uppercase tracking-wide text-muted">{product.brand}</p>}
          <h1 className="mt-1 font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl">{product.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink/85">{product.description}</p>

          <div className="mt-6 rounded-2xl border border-line bg-white p-5">
            <p className="text-3xl font-semibold text-ink">{formatPrice(product.priceCents)}</p>
            <p className="mt-1 text-sm text-muted">
              Indicatieve prijs bij {merchant} incl. btw
              {product.priceCheckedAt ? `, gecontroleerd op ${formatDate(product.priceCheckedAt.slice(0, 10), true)}` : ", nog niet gecontroleerd"}.
              De prijs bij de winkel is leidend.
            </p>

            <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-xl bg-cream p-3">
                <dt className="text-muted">Levertijd</dt>
                <dd className="font-semibold text-ink">{delivery}</dd>
              </div>
              {product.occasions.includes("sinterklaas") && (
                <div className="rounded-xl bg-cream p-3">
                  <dt className="text-muted">Voor 5 december</dt>
                  <dd className="font-semibold text-pine">Bestel t/m {formatDate(sint)}</dd>
                </div>
              )}
              <div className="rounded-xl bg-cream p-3">
                <dt className="text-muted">Voor kerst</dt>
                <dd className="font-semibold text-pine">Bestel t/m {formatDate(kerst)}</dd>
              </div>
            </dl>

            <a
              href={`/uit/${product.slug}`}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="mt-5 flex min-h-12 items-center justify-center rounded-full bg-sint px-6 font-medium text-white hover:bg-sint-dark"
            >
              Bekijk bij {merchant}
            </a>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Je bestelt en betaalt bij {merchant}; daar gelden hun levering, garantie en retourvoorwaarden. Wij ontvangen
              mogelijk een commissie, jij betaalt hetzelfde. <Link href="/hoe-wij-verdienen" className="underline">Meer uitleg</Link>
            </p>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2 text-sm">
            {product.recipients.map((r) => (
              <li key={r}><Link href={`/cadeaus?voor=${r}`} className="rounded-full border border-line px-3 py-1.5 hover:bg-cream">{RECIPIENTS[r]}</Link></li>
            ))}
            {product.interests.map((i) => (
              <li key={i}><Link href={`/cadeaus?interesse=${i}`} className="rounded-full border border-line px-3 py-1.5 hover:bg-cream">{INTERESTS[i]}</Link></li>
            ))}
            {product.ageGroups.filter((a) => a !== "volwassen").map((a) => (
              <li key={a}><Link href={`/cadeaus?leeftijd=${a}`} className="rounded-full border border-line px-3 py-1.5 hover:bg-cream">{AGE_GROUPS[a]}</Link></li>
            ))}
          </ul>

          {product.rating && (
            <p className="mt-4 text-sm text-muted">
              Beoordeling bij {product.rating.source}: {product.rating.score.toLocaleString("nl-NL")} / 5 ({product.rating.count} reviews)
            </p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-ink">Ook leuk voor {RECIPIENTS[product.recipients[0]].toLowerCase()}</h2>
          <div className="mt-5"><ProductGrid products={related} /></div>
        </section>
      )}

      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </div>
  );
}
