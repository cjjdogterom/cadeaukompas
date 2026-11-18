import type { Product } from "./types";
import { isPriceFresh } from "./price";

/**
 * Structured data (schema.org Product) voor de productpagina. Een Offer met prijs alleen als de prijs
 * hooguit 48 uur geleden is gecontroleerd (dezelfde regel als op de kaarten, compliance punt 5);
 * anders laten we het Offer helemaal weg in plaats van een verouderde prijs aan zoekmachines te geven.
 */
export function productJsonLd(product: Product, opts: { merchant: string; siteUrl: string; now: Date }) {
  const fresh = isPriceFresh(product.priceCents, product.priceCheckedAt, opts.now);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    gtin13: product.ean && /^\d{13}$/.test(product.ean) ? product.ean : undefined,
    offers: fresh
      ? {
          "@type": "Offer",
          price: (product.priceCents / 100).toFixed(2),
          priceCurrency: "EUR",
          url: `${opts.siteUrl}/cadeau/${product.slug}`,
          seller: { "@type": "Organization", name: opts.merchant },
        }
      : undefined,
  };
}

/** JSON voor in een <script type="application/ld+json">; `<` geëscaped tegen het afbreken van de script-tag. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
