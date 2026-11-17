import { addBusinessDays, PEAK_BUFFER_DAYS } from "./deadlines";

/** Wanneer een cadeau uiterlijk in huis is als je het nu bestelt. */
export type Delivery = {
  latest: string; // YYYY-MM-DD
  earliest: string | null;
  source: "bol" | "schatting";
  description: string | null; // bv. "Op voorraad. Voor 23:59 besteld, morgen in huis"
};

/**
 * Bezorgbelofte van bol, bijgewerkt voor het moment van nu: is de besteltijd verstreken sinds bol het
 * antwoord gaf, dan schuift de belofte een werkdag op (conservatief).
 */
export function fromBolOffer(
  offer: { minDeliveryDate: string | null; maxDeliveryDate: string | null; ultimateOrderTime: string | null; deliveryDescription: string | null; fetchedAt: string },
  now: { date: string; time: string }, // Europe/Amsterdam, "YYYY-MM-DD" en "HH:MM"
  fetched: { date: string; time: string },
): Delivery | null {
  if (!offer.maxDeliveryDate) return null;
  let latest = offer.maxDeliveryDate;
  let earliest = offer.minDeliveryDate;
  const cutoff = offer.ultimateOrderTime?.slice(0, 5);
  const fetchedBeforeCutoff = !cutoff || fetched.time <= cutoff;
  const cutoffPassed = now.date > fetched.date || (cutoff ? now.time > cutoff : false);
  if (cutoffPassed && fetchedBeforeCutoff) {
    latest = addBusinessDays(latest, 1);
    earliest = earliest ? addBusinessDays(earliest, 1) : null;
  }
  return { latest, earliest, source: "bol", description: offer.deliveryDescription };
}

/** Zonder bol-data: levertijd uit onze catalogus (werkdagen) plus piekbuffer. */
export function estimate(deliveryDaysMin: number, deliveryDaysMax: number, today: string): Delivery {
  return {
    earliest: addBusinessDays(today, deliveryDaysMin),
    latest: addBusinessDays(today, deliveryDaysMax + PEAK_BUFFER_DAYS),
    source: "schatting",
    description: null,
  };
}

/** Geldige "uiterlijk in huis op"-datum: YYYY-MM-DD, vanaf morgen, hooguit 90 dagen vooruit. */
export function parseDeadline(value: unknown, today: string): string | undefined {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  if (Number.isNaN(Date.parse(`${value}T00:00:00Z`))) return undefined;
  if (value <= today) return undefined;
  const max = new Date(`${today}T00:00:00Z`);
  max.setUTCDate(max.getUTCDate() + 90);
  return value <= max.toISOString().slice(0, 10) ? value : undefined;
}

/** Datum en tijd in Nederland. */
export function nowInNL(d: Date = new Date()): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Amsterdam",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, time: `${get("hour")}:${get("minute")}` };
}
