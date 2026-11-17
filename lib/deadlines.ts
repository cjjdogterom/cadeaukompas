import type { Occasion } from "./types";

/**
 * Besteldeadlines. Conservatief: bezorgd uiterlijk de dag vóór pakjesavond (5 dec 2026 = zaterdag)
 * en op kerstavond. Rekenen in werkdagen (ma–vr), de besteldag telt niet mee, plus piekbuffer.
 * Zie ops/decisions.md (17-11-2026).
 */
export const ARRIVE_BY: Record<Occasion, string> = {
  sinterklaas: "2026-12-04",
  kerst: "2026-12-24",
};

export const OCCASION_LABEL: Record<Occasion, string> = {
  sinterklaas: "Sinterklaas",
  kerst: "kerst",
};

export const PEAK_BUFFER_DAYS = 1;

// Feestdagen (ma–vr) waarop niet bezorgd wordt, binnen de looptijd.
const HOLIDAYS = new Set<string>(["2026-12-25", "2026-12-28"]);

function parse(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function toIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function isBusinessDay(date: Date): boolean {
  const day = date.getUTCDay();
  return day !== 0 && day !== 6 && !HOLIDAYS.has(toIso(date));
}

export function addBusinessDays(iso: string, n: number): string {
  const date = parse(iso);
  let added = 0;
  while (added < n) {
    date.setUTCDate(date.getUTCDate() + 1);
    if (isBusinessDay(date)) added++;
  }
  return toIso(date);
}

/** Laatste kalenderdag waarop je kunt bestellen om op tijd binnen te hebben. */
export function lastOrderDate(deliveryDaysMax: number, occasion: Occasion): string {
  const arriveBy = ARRIVE_BY[occasion];
  const needed = deliveryDaysMax + PEAK_BUFFER_DAYS;
  const candidate = parse(arriveBy);
  for (let i = 0; i < 60; i++) {
    const iso = toIso(candidate);
    if (addBusinessDays(iso, needed) <= arriveBy) return iso;
    candidate.setUTCDate(candidate.getUTCDate() - 1);
  }
  return toIso(candidate);
}

/** Vandaag in Nederland als YYYY-MM-DD. */
export function todayInNL(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam" }).format(now);
}

export function isOnTime(deliveryDaysMax: number, occasion: Occasion, today: string): boolean {
  return today <= lastOrderDate(deliveryDaysMax, occasion);
}

export function daysUntil(iso: string, today: string): number {
  return Math.round((parse(iso).getTime() - parse(today).getTime()) / 86_400_000);
}

const fmt = new Intl.DateTimeFormat("nl-NL", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
const fmtShort = new Intl.DateTimeFormat("nl-NL", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

export function formatDate(iso: string, short = false): string {
  return (short ? fmtShort : fmt).format(parse(iso));
}
