import { createHash } from "node:crypto";

/** Salt van één dag (Europe/Amsterdam), komt uit de database (`page_view_salt()`, migratie 0003). */
export type DailySalt = { day: string; salt: string };

/**
 * Bezoekers-hash voor het tellen van unieke bezoekers per dag. De salt is willekeurig, wisselt elke dag
 * en wordt daarna weggegooid; zonder salt is de hash niet terug te rekenen naar een IP-adres.
 */
export function visitorHash(day: string, ip: string, ua: string, salt: string): string {
  return createHash("sha256").update(`${day}|${ip}|${ua}|${salt}`).digest("hex").slice(0, 16);
}

/**
 * Houdt de salt van vandaag in het geheugen van deze serverinstantie, zodat niet elk bezoek een extra
 * database-aanroep kost. Op een nieuwe dag wordt de oude waarde vervangen (en daarmee vergeten).
 * Geeft null als er geen geldige salt is: dan tellen we het bezoek niet (nooit terugvallen op een vaste sleutel).
 */
export function createSaltCache(fetchSalt: () => Promise<DailySalt | null>) {
  let cached: DailySalt | null = null;
  return async function saltFor(today: string): Promise<DailySalt | null> {
    if (cached?.day === today) return cached;
    cached = null;
    let fresh: DailySalt | null = null;
    try {
      fresh = await fetchSalt();
    } catch {
      return null;
    }
    if (!fresh || !/^\d{4}-\d{2}-\d{2}$/.test(fresh.day) || typeof fresh.salt !== "string" || fresh.salt.length < 32) return null;
    // Rond middernacht kan de database al op de nieuwe dag staan: dan alleen cachen als de dag klopt.
    if (fresh.day === today) cached = fresh;
    return fresh;
  };
}
