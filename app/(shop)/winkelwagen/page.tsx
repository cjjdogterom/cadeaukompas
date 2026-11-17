import type { Metadata } from "next";
import { getProducts } from "@/lib/catalog";
import { CartView } from "./CartView";

export const metadata: Metadata = { title: "Winkelwagen", robots: { index: false } };

export default async function WinkelwagenPage() {
  const catalog = (await getProducts())
    .filter((p) => p.type === "dropship")
    .map((p) => ({ slug: p.slug, title: p.title, priceCents: p.priceCents, vatRate: p.vatRate, deliveryDaysMax: p.deliveryDaysMax }));
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Winkelwagen</h1>
      <p className="mt-2 text-sm text-muted">
        Hier staan alleen cadeaus die je bij ons koopt. Cadeaus bij andere winkels bestel je via de knop op de productpagina.
      </p>
      <CartView catalog={catalog} />
    </div>
  );
}
