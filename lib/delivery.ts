import "server-only";
import type { Product } from "./types";
import { bolIdToEan, bolProductIdFromUrl, getBolOffer } from "./bol";
import { estimate, fromBolOffer, nowInNL, type Delivery } from "./delivery-core";

export type { Delivery } from "./delivery-core";

/**
 * Bezorgdatum per product als je nu bestelt. Voor bol-producten de belofte uit de bol-API
 * (maxDeliveryDate); anders, of als de API niet beschikbaar is, een schatting.
 * Aanroepen na `await connection()`: het antwoord hangt af van het moment.
 */
export async function getDeliveries(products: Product[], now = nowInNL(), budgetMs = 2500): Promise<Map<string, Delivery>> {
  // Tijdsbudget: wat bol niet binnen het budget levert (koude cache, limiet van 10/s) krijgt de schatting.
  // De cache wordt elk half uur gevuld door /api/bol/warm, dus normaal komt alles direct uit de cache.
  const deadline = new Promise<null>((r) => setTimeout(() => r(null), budgetMs));
  const entries = await Promise.all(
    products.map(async (p): Promise<[string, Delivery]> => {
      const fallback: [string, Delivery] = [p.slug, estimate(p.deliveryDaysMin, p.deliveryDaysMax, now.date)];
      if (p.merchant !== "bol") return fallback;
      try {
        const offer = await Promise.race([lookup(p), deadline]);
        const d = offer ? fromBolOffer(offer, now, nowInNL(new Date(offer.fetchedAt))) : null;
        return d ? [p.slug, d] : fallback;
      } catch {
        return fallback;
      }
    }),
  );
  return new Map(entries);
}

async function lookup(p: Product) {
  const ean = p.ean && /^\d{13}$/.test(p.ean) ? p.ean : await idToEan(p.merchantUrl);
  return ean ? getBolOffer(ean) : null;
}

async function idToEan(url: string): Promise<string | null> {
  const id = bolProductIdFromUrl(url);
  return id ? bolIdToEan(id) : null;
}
