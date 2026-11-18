import { ARRIVE_BY, daysUntil, formatDate, lastOrderDate, toIso } from "./deadlines";
import type { Occasion } from "./types";

/** Feestdag zelf (aftelling), los van ARRIVE_BY (uiterlijk in huis). */
export const CELEBRATION: Record<Occasion, string> = { sinterklaas: "2026-12-05", kerst: "2026-12-25" };
const ORDER: Occasion[] = ["sinterklaas", "kerst"];

/** Is er nog tijd om voor deze feestdag te bestellen (snelste levertijd, 1 werkdag)? */
export function isOccasionOpen(occasion: Occasion, today: string): boolean {
  return today <= lastOrderDate(1, occasion);
}

/** Feestdagen waarvoor je vandaag nog op tijd kunt bestellen, in volgorde. */
export function openOccasions(today: string): Occasion[] {
  return ORDER.filter((o) => isOccasionOpen(o, today));
}

export type Season = { occasion: Occasion; daysLeft: number; fastestOrderBy: string; arriveBy: string };

/**
 * Het seizoen voor topbalk en aftelling: Sinterklaas tot en met de laatste besteldag, daarna kerst,
 * daarna niets. Zo tonen we nooit een verstreken besteldatum of een negatieve aftelling.
 */
export function currentSeason(today: string): Season | null {
  const occasion = openOccasions(today)[0];
  if (!occasion) return null;
  return {
    occasion,
    daysLeft: daysUntil(CELEBRATION[occasion], today),
    fastestOrderBy: lastOrderDate(1, occasion),
    arriveBy: ARRIVE_BY[occasion],
  };
}

function addDays(iso: string, n: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  return toIso(new Date(Date.UTC(y, m - 1, d + n)));
}

/** Echt de volgende kalenderdag (beide als YYYY-MM-DD in Europe/Amsterdam)? */
export function isTomorrow(date: string, today: string): boolean {
  return date === addDays(today, 1);
}

const weekday = new Intl.DateTimeFormat("nl-NL", { weekday: "long", timeZone: "UTC" });

/**
 * Kop voor een bezorgdag: "Morgen in huis" alleen bij de volgende kalenderdag, binnen een week de weekdag
 * ("Maandag in huis"), anders de datum ("In huis op do 3 dec").
 */
export function arrivalHeadline(date: string, today: string): string {
  if (isTomorrow(date, today)) return "Morgen in huis";
  const days = daysUntil(date, today);
  if (days >= 2 && days <= 6) {
    const [y, m, d] = date.split("-").map(Number);
    const name = weekday.format(new Date(Date.UTC(y, m - 1, d)));
    return `${name.charAt(0).toUpperCase()}${name.slice(1)} in huis`;
  }
  return `In huis op ${formatDate(date, true)}`;
}

/**
 * Besteldeadline voor een kaart zonder bezorgdata: Sint voor Sint-cadeaus zolang dat kan, anders kerst.
 * Null als beide verstreken zijn.
 */
export function cardDeadline(occasions: Occasion[], deliveryDaysMax: number, today: string): { occasion: Occasion; date: string } | null {
  const candidates: Occasion[] = occasions.includes("sinterklaas") ? ["sinterklaas", "kerst"] : ["kerst"];
  for (const occasion of candidates) {
    const date = lastOrderDate(deliveryDaysMax, occasion);
    if (today <= date) return { occasion, date };
  }
  return null;
}
