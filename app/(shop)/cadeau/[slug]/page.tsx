import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/catalog";
import { AGE_GROUPS, INTERESTS, MERCHANTS, RECIPIENTS, type Product } from "@/lib/types";
import { formatDate, lastOrderDate, todayInNL } from "@/lib/deadlines";
import { getDeliveries } from "@/lib/delivery";
import { deliveryText } from "@/lib/delivery-text";
import { priceDisplay } from "@/lib/price";
import { jsonLdString, productJsonLd } from "@/lib/product-ld";
import { openOccasions } from "@/lib/season";
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
  const related = (await getProducts())
    .filter((p) => p.slug !== product.slug && p.recipients.some((r) => product.recipients.includes(r)))
    .slice(0, 4);

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
            <Suspense fallback={<OfferFallback />}>
              <Offer product={product} merchant={merchant} />
            </Suspense>

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

    </div>
  );
}

const OCCASION_LABEL = { sinterklaas: "Voor 5 december", kerst: "Voor kerst" } as const;

function OfferFallback() {
  return (
    <div className="min-h-[9.5rem]" aria-busy="true">
      <p className="text-sm text-muted">Prijs en bezorgdatum laden…</p>
    </div>
  );
}

/**
 * Prijs, bezorgdatum en structured data: hangen af van het moment van nu, dus per verzoek (na `connection()`).
 * - Prijs alleen als hij hooguit 48 uur oud is, anders "Bekijk prijs bij {winkel}" en geen Offer in de JSON-LD.
 * - Bezorgdatum: de belofte van bol als die er is, anders onze schatting, duidelijk als indicatie.
 */
async function Offer({ product, merchant }: { product: Product; merchant: string }) {
  await connection();
  const now = new Date();
  const today = todayInNL(now);
  const price = priceDisplay(product.priceCents, product.priceCheckedAt, now);
  const delivery = (await getDeliveries([product])).get(product.slug)!;
  const text = deliveryText(delivery, today, merchant);
  const deadlines = openOccasions(today)
    .filter((o) => product.occasions.includes(o))
    .map((o) => ({ occasion: o, date: lastOrderDate(product.deliveryDaysMax, o) }))
    .filter((d) => d.date >= today);
  const usual =
    product.deliveryDaysMin === product.deliveryDaysMax
      ? `${product.deliveryDaysMax} ${product.deliveryDaysMax === 1 ? "werkdag" : "werkdagen"}`
      : `${product.deliveryDaysMin}–${product.deliveryDaysMax} werkdagen`;

  return (
    <>
      {price.kind === "prijs" ? (
        <>
          <p className="text-3xl font-semibold text-ink">{price.price}</p>
          <p className="mt-1 text-sm text-muted">
            Indicatieve prijs bij {merchant} incl. btw, gecontroleerd op {price.checked}. De prijs bij de winkel is leidend.
          </p>
        </>
      ) : (
        <>
          <p className="text-2xl font-semibold text-ink">Bekijk prijs bij {merchant}</p>
          <p className="mt-1 text-sm text-muted">De actuele prijs zie je bij {merchant}.</p>
        </>
      )}

      <div className="mt-5 rounded-xl bg-cream p-3 text-sm">
        <p className="font-semibold text-pine">{text.headline}</p>
        <p className="mt-0.5 text-muted">{text.note}</p>
      </div>

      {deadlines.length > 0 && (
        <>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            {deadlines.map((d) => (
              <div key={d.occasion} className="rounded-xl bg-cream p-3">
                <dt className="text-muted">{OCCASION_LABEL[d.occasion]}</dt>
                <dd className="font-semibold text-pine">Bestel t/m {formatDate(d.date)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs text-muted">
            Uiterste besteldata zijn onze indicatie: gebruikelijke levertijd van {usual} plus een dag buffer.
          </p>
        </>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(productJsonLd(product, { merchant, siteUrl: site.url, now })) }}
      />
    </>
  );
}
