const eur = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" });

export function formatPrice(cents: number): string {
  return eur.format(cents / 100);
}

export function priceAgeHours(checkedAt: string | null | undefined, now: Date): number | null {
  if (!checkedAt) return null;
  return (now.getTime() - new Date(checkedAt).getTime()) / 3_600_000;
}
