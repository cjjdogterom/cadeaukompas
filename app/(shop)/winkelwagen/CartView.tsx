"use client";

import Link from "next/link";
import { setQuantity, useCart } from "@/lib/cart";
import { calculateTotals, MAX_QUANTITY, SHIPPING } from "@/lib/shop";
import { formatPrice } from "@/lib/format";
import { formatDate, lastOrderDate } from "@/lib/deadlines";

type Item = { slug: string; title: string; priceCents: number; vatRate?: 9 | 21; deliveryDaysMax: number };

export function CartView({ catalog }: { catalog: Item[] }) {
  const cart = useCart();
  const totals = calculateTotals(cart, catalog);
  const unknown = cart.filter((i) => !catalog.some((p) => p.slug === i.slug));
  const slowest = Math.max(0, ...totals.lines.map((l) => catalog.find((p) => p.slug === l.slug)?.deliveryDaysMax ?? 0));

  if (!totals.lines.length) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-line p-8 text-center">
        <p className="text-muted">Je winkelwagen is leeg.</p>
        <Link href="/cadeaus" className="mt-4 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper">
          Bekijk cadeaus
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
        {totals.lines.map((line) => (
          <li key={line.slug} className="flex flex-wrap items-center gap-4 p-4">
            <div className="min-w-0 flex-1">
              <Link href={`/cadeau/${line.slug}`} className="font-medium text-ink hover:underline">
                {line.title}
              </Link>
              <p className="text-sm text-muted">{formatPrice(line.unitPriceCents)} per stuk</p>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <span className="sr-only">Aantal {line.title}</span>
              <select
                value={line.quantity}
                onChange={(e) => setQuantity(line.slug, Number(e.target.value))}
                className="h-10 rounded-lg border border-line bg-paper px-2"
              >
                {Array.from({ length: MAX_QUANTITY + 1 }, (_, n) => (
                  <option key={n} value={n}>
                    {n === 0 ? "Verwijderen" : n}
                  </option>
                ))}
              </select>
            </label>
            <p className="w-24 text-right font-semibold tabular-nums text-ink">{formatPrice(line.lineTotalCents)}</p>
          </li>
        ))}
      </ul>

      {unknown.length > 0 && (
        <p className="mt-3 text-sm text-muted">
          {unknown.length} {unknown.length === 1 ? "product is" : "producten zijn"} niet meer leverbaar en niet meegeteld.
        </p>
      )}

      <dl className="mt-6 space-y-2 rounded-2xl bg-cream p-5 text-sm">
        <div className="flex justify-between">
          <dt>Subtotaal</dt>
          <dd className="tabular-nums">{formatPrice(totals.subtotalCents)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Verzending {totals.shippingCents === 0 ? "" : `(gratis vanaf ${formatPrice(SHIPPING.freeFromCents)})`}</dt>
          <dd className="tabular-nums">{totals.shippingCents ? formatPrice(totals.shippingCents) : "Gratis"}</dd>
        </div>
        <div className="flex justify-between border-t border-ink/10 pt-2 text-base font-semibold text-ink">
          <dt>Totaal</dt>
          <dd className="tabular-nums">{formatPrice(totals.totalCents)}</dd>
        </div>
        <div className="flex justify-between text-xs text-muted">
          <dt>Waarvan btw</dt>
          <dd className="tabular-nums">{formatPrice(totals.vatCents)}</dd>
        </div>
      </dl>

      {slowest > 0 && (
        <p className="mt-4 text-sm text-pine">
          Op tijd voor kerst: bestel uiterlijk {formatDate(lastOrderDate(slowest, "kerst"))}. Voor Sinterklaas: uiterlijk{" "}
          {formatDate(lastOrderDate(slowest, "sinterklaas"))}.
        </p>
      )}

      <Link
        href="/afrekenen"
        className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-sint px-6 font-medium text-white hover:bg-sint-dark"
      >
        Verder naar gegevens
      </Link>
    </div>
  );
}
