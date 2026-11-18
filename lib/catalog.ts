import "server-only";
import { createClient } from "@supabase/supabase-js";
import localProducts from "@/data/products.json";
import type { AgeGroup, Budget, Interest, Occasion, Product, Recipient } from "./types";
import { BUDGETS } from "./types";
import { isOnTime } from "./deadlines";

/** Concept-producten tonen we alleen buiten productie (preview/dev). */
const includeConcept = process.env.VERCEL_ENV !== "production" && process.env.CATALOG_INCLUDE_CONCEPT !== "false";

type Row = {
  slug: string; title: string; brand: string | null; ean: string | null; short: string; description: string;
  type: Product["type"]; merchant: Product["merchant"]; merchant_url: string; price_cents: number;
  price_checked_at: string | null; delivery_days_min: number; delivery_days_max: number;
  recipients: Recipient[]; age_groups: AgeGroup[]; interests: Interest[]; occasions: Occasion[];
  rating: Product["rating"]; image_url: string | null; image_license: string | null; sources: string[];
  status: Product["status"]; scout: Product["scout"]; supplier_id: string | null;
};

function fromRow(r: Row): Product {
  return {
    slug: r.slug, title: r.title, brand: r.brand ?? undefined, ean: r.ean ?? undefined, short: r.short,
    description: r.description, type: r.type, merchant: r.merchant, merchantUrl: r.merchant_url,
    priceCents: r.price_cents, priceCheckedAt: r.price_checked_at, deliveryDaysMin: r.delivery_days_min,
    deliveryDaysMax: r.delivery_days_max, recipients: r.recipients, ageGroups: r.age_groups,
    interests: r.interests, occasions: r.occasions, rating: r.rating, imageUrl: r.image_url,
    imageLicense: r.image_license, sources: r.sources, status: r.status, scout: r.scout,
  };
}

async function loadAll(): Promise<Product[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) {
    const db = createClient(url, key, { auth: { persistSession: false } });
    const statuses = includeConcept ? ["actief", "concept"] : ["actief"];
    const { data, error } = await db.from("products").select("*").in("status", statuses);
    if (error) throw new Error(`Supabase products: ${error.message}`);
    return (data as Row[]).map(fromRow);
  }
  return (localProducts as Product[]).filter((p) => p.status === "actief" || (includeConcept && p.status === "concept"));
}

export async function getProducts(): Promise<Product[]> {
  const all = await loadAll();
  return all.sort((a, b) => (b.scout?.score ?? 0) - (a.scout?.score ?? 0));
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}

export type Filters = {
  voor?: Recipient;
  budget?: Budget;
  leeftijd?: AgeGroup;
  interesse?: Interest;
  optijd?: Occasion;
  /** Uiterlijk in huis op (YYYY-MM-DD); wordt in de pagina gefilterd met de bezorgdatum van bol. */
  uiterlijk?: string;
  /** Vrije zoekterm op titel, merk en korte tekst. */
  q?: string;
};

export function applyFilters(products: Product[], f: Filters, today: string): Product[] {
  const words = (f.q ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  return products.filter((p) => {
    if (words.length) {
      const hay = `${p.title} ${p.brand ?? ""} ${p.short}`.toLowerCase();
      if (!words.every((w) => hay.includes(w))) return false;
    }
    if (f.voor && !p.recipients.includes(f.voor)) return false;
    if (f.leeftijd && !p.ageGroups.includes(f.leeftijd)) return false;
    if (f.interesse && !p.interests.includes(f.interesse)) return false;
    if (f.budget) {
      const b = BUDGETS[f.budget];
      if (p.priceCents < b.min || p.priceCents >= b.max) return false;
    }
    if (f.optijd && !isOnTime(p.deliveryDaysMax, f.optijd, today)) return false;
    return true;
  });
}
