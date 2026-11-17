import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/catalog";
import { checkoutEnabled } from "@/lib/shop";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = { title: "Afrekenen", robots: { index: false } };

export default async function AfrekenenPage() {
  const enabled = checkoutEnabled();
  const catalog = (await getProducts())
    .filter((p) => p.type === "dropship")
    .map((p) => ({ slug: p.slug, title: p.title, priceCents: p.priceCents, vatRate: p.vatRate }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Afrekenen</h1>
      {enabled ? (
        <CheckoutForm catalog={catalog} />
      ) : (
        <div className="mt-8 rounded-2xl border border-line bg-white p-6">
          <p className="text-ink">Afrekenen bij ons is nog niet beschikbaar.</p>
          <p className="mt-2 text-sm text-muted">
            Binnenkort kun je hier cadeaus kopen die een partner rechtstreeks naar je toe stuurt. Tot die tijd bestel je via
            de winkels bij elk cadeau.
          </p>
          <Link href="/cadeaus" className="mt-4 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper">
            Bekijk cadeaus
          </Link>
        </div>
      )}
    </div>
  );
}
