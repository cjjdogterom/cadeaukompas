/**
 * Dropship-verkoop: prijsberekening (puur, zonder I/O — ook op de client te gebruiken voor weergave,
 * maar de server rekent altijd zelf opnieuw vanuit de catalogus).
 *
 * Verzendkosten en de gratis-verzendgrens zijn een VOORSTEL en vragen akkoord van de eigenaar
 * (ops/approvals/2026-11-17-dropship-prijzen.md). Wijzigen = akkoord-protocol.
 */
export const SHIPPING = {
  costCents: 495,
  freeFromCents: 5000,
  vatRate: 21,
} as const;

export const MAX_QUANTITY = 5;

export type PricedLine = {
  slug: string;
  title: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
  vatRate: number;
};

export type Totals = {
  lines: PricedLine[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  vatCents: number;
};

/** Btw-bedrag dat in een bedrag incl. btw zit, afgerond op centen. */
export function vatIncluded(amountInclCents: number, rate: number): number {
  return Math.round(amountInclCents - amountInclCents / (1 + rate / 100));
}

export function calculateTotals(
  items: { slug: string; quantity: number }[],
  catalog: { slug: string; title: string; priceCents: number; vatRate?: number }[],
): Totals {
  const lines: PricedLine[] = [];
  for (const item of items) {
    const product = catalog.find((p) => p.slug === item.slug);
    const quantity = Math.max(0, Math.min(MAX_QUANTITY, Math.floor(item.quantity)));
    if (!product || quantity === 0) continue;
    lines.push({
      slug: product.slug,
      title: product.title,
      quantity,
      unitPriceCents: product.priceCents,
      lineTotalCents: product.priceCents * quantity,
      vatRate: product.vatRate ?? 21,
    });
  }
  const subtotalCents = lines.reduce((sum, l) => sum + l.lineTotalCents, 0);
  const shippingCents = subtotalCents === 0 || subtotalCents >= SHIPPING.freeFromCents ? 0 : SHIPPING.costCents;
  const vatCents =
    lines.reduce((sum, l) => sum + vatIncluded(l.lineTotalCents, l.vatRate), 0) + vatIncluded(shippingCents, SHIPPING.vatRate);
  return { lines, subtotalCents, shippingCents, totalCents: subtotalCents + shippingCents, vatCents };
}

/** Mollie wil bedragen als string met twee decimalen. */
export function toMollieAmount(cents: number): string {
  return (cents / 100).toFixed(2);
}

export function newOrderNumber(now = new Date(), random = Math.random): string {
  const d = now.toISOString().slice(2, 10).replace(/-/g, "");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 5; i++) suffix += alphabet[Math.floor(random() * alphabet.length)];
  return `CK-${d}-${suffix}`;
}

/** Is de checkout technisch en zakelijk aangezet? (Eerste livegang = akkoord eigenaar.) */
export function checkoutEnabled(): boolean {
  return (
    process.env.NEXT_PUBLIC_CHECKOUT_ENABLED === "true" &&
    Boolean(process.env.MOLLIE_API_KEY) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
  );
}
