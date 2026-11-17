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
export async function getDeliveries(products: Product[], now = nowInNL()): Promise<Map<string, Delivery>> {
  const entries = await Promise.all(
    products.map(async (p): Promise<[string, Delivery]> => {
      if (p.merchant === "bol") {
        const ean = p.ean && /^\d{13}$/.test(p.ean) ? p.ean : await idToEan(p.merchantUrl);
        const offer = ean ? await getBolOffer(ean) : null;
        if (offer) {
          const d = fromBolOffer(offer, now, nowInNL(new Date(offer.fetchedAt)));
          if (d) return [p.slug, d];
        }
      }
      return [p.slug, estimate(p.deliveryDaysMin, p.deliveryDaysMax, now.date)];
    }),
  );
  return new Map(entries);
}

async function idToEan(url: string): Promise<string | null> {
  const id = bolProductIdFromUrl(url);
  return id ? bolIdToEan(id) : null;
}
