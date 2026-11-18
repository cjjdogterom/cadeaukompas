import { formatPrice } from "./format";

/** Een prijs tonen we alleen als hij hooguit zoveel uur geleden is gecontroleerd (compliance-checklist punt 5). */
export const PRICE_MAX_AGE_HOURS = 48;

export type PriceDisplay =
  | { kind: "prijs"; price: string; checked: string } // checked: bv. "18 nov"
  | { kind: "bekijk" }; // te oud of onbekend: "Bekijk prijs bij {winkel}"

const fmtChecked = new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "short", timeZone: "Europe/Amsterdam" });

/** Controledatum als moment: een kale datum (YYYY-MM-DD) telt vanaf middernacht in Nederland (conservatief). */
function checkedMoment(checkedAt: string): Date | null {
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(checkedAt) ? `${checkedAt}T00:00:00+01:00` : checkedAt;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Mag de prijs getoond worden? Alleen met een geldige controledatum van hooguit 48 uur oud (niet in de toekomst). */
export function isPriceFresh(priceCents: number, checkedAt: string | null | undefined, now: Date): boolean {
  if (!checkedAt || !(priceCents > 0)) return false;
  const moment = checkedMoment(checkedAt);
  if (!moment) return false;
  const ageHours = (now.getTime() - moment.getTime()) / 3_600_000;
  return ageHours >= 0 && ageHours <= PRICE_MAX_AGE_HOURS;
}

/** Wat een productkaart laat zien, gegeven of de prijs vers is. */
export function toPriceDisplay(priceCents: number, checkedAt: string | null | undefined, fresh: boolean): PriceDisplay {
  const moment = fresh && checkedAt ? checkedMoment(checkedAt) : null;
  if (!moment) return { kind: "bekijk" };
  return { kind: "prijs", price: formatPrice(priceCents), checked: fmtChecked.format(moment).replace(/\.$/, "") };
}

/**
 * Wat een productkaart over de prijs laat zien. Ouder dan 48 uur, ontbrekend, ongeldig of in de toekomst:
 * geen bedrag, alleen een verwijzing naar de winkel ("Bekijk prijs bij {winkel}").
 */
export function priceDisplay(priceCents: number, checkedAt: string | null | undefined, now: Date): PriceDisplay {
  return toPriceDisplay(priceCents, checkedAt, isPriceFresh(priceCents, checkedAt, now));
}
