import "server-only";
import { cacheLife } from "next/cache";

/**
 * bol Marketing Catalog API (officieel, voor affiliates): https://api.bol.com/marketing/docs/catalog-api/
 * Inloggen met BOL_API_CLIENT_ID / BOL_API_CLIENT_SECRET (partner.bol.com → Account → Open API).
 * Zonder sleutels geeft alles hier null terug en valt de site terug op een schatting (lib/delivery.ts).
 */
const TOKEN_URL = "https://login.bol.com/token?grant_type=client_credentials";
const API = "https://api.bol.com/marketing/catalog/v1";

export function bolApiConfigured(): boolean {
  return Boolean(process.env.BOL_API_CLIENT_ID && process.env.BOL_API_CLIENT_SECRET);
}

let token: { value: string; expiresAt: number } | null = null;

async function getToken(force = false): Promise<string | null> {
  if (!bolApiConfigured()) return null;
  if (!force && token && token.expiresAt > Date.now() + 15_000) return token.value;
  const basic = Buffer.from(`${process.env.BOL_API_CLIENT_ID}:${process.env.BOL_API_CLIENT_SECRET}`).toString("base64");
  try {
    const res = await fetch(TOKEN_URL, { method: "POST", headers: { Authorization: `Basic ${basic}`, Accept: "application/json" } });
    if (!res.ok) return null;
    const data = (await res.json()) as { access_token: string; expires_in: number };
    token = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
    return token.value;
  } catch {
    return null;
  }
}

async function bolGet<T>(path: string): Promise<T | null> {
  for (const force of [false, true]) {
    const t = await getToken(force);
    if (!t) return null;
    try {
      const res = await fetch(`${API}${path}`, {
        headers: { Authorization: `Bearer ${t}`, Accept: "application/json", "Accept-Language": "nl" },
      });
      if (res.status === 401) continue; // token verlopen: één keer opnieuw
      if (!res.ok) return null;
      return (await res.json()) as T;
    } catch {
      return null;
    }
  }
  return null;
}

export type BolOffer = {
  minDeliveryDate: string | null;
  maxDeliveryDate: string | null;
  ultimateOrderTime: string | null; // "HH:MM", tot wanneer vandaag bestellen voor maxDeliveryDate
  deliveryDescription: string | null;
  priceCents: number | null;
  fetchedAt: string; // ISO; om te zien of de besteltijd sindsdien is verstreken
};

/** Beste aanbieding op bol.com (NL), met bezorgbelofte. Gedeeld gecachet, ververst elk half uur. */
export async function getBolOffer(ean: string): Promise<BolOffer | null> {
  "use cache: remote";
  cacheLife({ stale: 300, revalidate: 1800, expire: 7200 });
  if (!/^\d{13}$/.test(ean)) return null;
  const o = await bolGet<{
    price?: number;
    ultimateOrderTime?: string;
    minDeliveryDate?: string;
    maxDeliveryDate?: string;
    deliveryDescription?: string;
  }>(`/products/${ean}/offers/best?country-code=NL`);
  if (!o) return null;
  return {
    minDeliveryDate: o.minDeliveryDate ?? null,
    maxDeliveryDate: o.maxDeliveryDate ?? null,
    ultimateOrderTime: o.ultimateOrderTime ?? null,
    deliveryDescription: o.deliveryDescription ?? null,
    priceCents: typeof o.price === "number" ? Math.round(o.price * 100) : null,
    fetchedAt: new Date().toISOString(),
  };
}

/** bol-product-ID (uit de productlink) → EAN. Verandert nooit, dus lang gecachet. */
export async function bolIdToEan(bolProductId: string): Promise<string | null> {
  "use cache: remote";
  cacheLife("max");
  if (!/^\d+$/.test(bolProductId)) return null;
  const r = await bolGet<{ ean?: string } | string>(`/products/${bolProductId}/to-ean`);
  const ean = typeof r === "string" ? r : r?.ean;
  return ean && /^\d{13}$/.test(ean) ? ean : null;
}

/** Haalt het bol-product-ID uit een link als https://www.bol.com/nl/nl/p/naam/9300000148921207/ */
export function bolProductIdFromUrl(url: string): string | null {
  return url.match(/\/p\/[^/]+\/(\d{6,})/)?.[1] ?? null;
}
