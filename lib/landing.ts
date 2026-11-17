import "server-only";
import { getProducts } from "./catalog";
import { getDeliveries, type Delivery } from "./delivery";
import { guides } from "./guides";
import { ARRIVE_BY, addBusinessDays, daysUntil, lastOrderDate, todayInNL } from "./deadlines";
import { BUDGETS, MERCHANTS, RECIPIENTS, type Product } from "./types";

/**
 * Alle echte inhoud voor de homepage, in één keer. Aanroepen na `await connection()`
 * (hangt af van vandaag). Gebruikt door de homepage en de ontwerpvarianten in app/(ontwerp).
 */
export async function getLandingData() {
  const today = todayInNL();
  const products = await getProducts();
  const featured = products.slice(0, 12);
  const deliveries = await getDeliveries(featured);

  const recipients = Object.entries(RECIPIENTS).map(([key, label]) => ({
    key,
    label,
    count: products.filter((p) => p.recipients.includes(key as Product["recipients"][number])).length,
    href: `/cadeaus?voor=${key}`,
  }));
  const budgets = Object.entries(BUDGETS).map(([key, b]) => ({
    key,
    label: b.label,
    count: products.filter((p) => p.priceCents >= b.min && p.priceCents < b.max).length,
    href: `/cadeaus?budget=${key}`,
  }));

  /** Besteldeadlines per levertijd: het "vertrekbord" van pakjesavond en kerst. */
  const deadlines = [1, 2, 3].map((days) => ({
    deliveryDays: days,
    label: days === 1 ? "Morgen in huis" : `${days} werkdagen levertijd`,
    sinterklaas: lastOrderDate(days, "sinterklaas"),
    kerst: lastOrderDate(days, "kerst"),
    count: products.filter((p) => p.deliveryDaysMax === days).length,
  }));

  return {
    today,
    totalProducts: products.length,
    featured: featured.map((p) => ({
      slug: p.slug,
      title: p.title,
      brand: p.brand ?? null,
      short: p.short,
      priceCents: p.priceCents,
      merchant: MERCHANTS[p.merchant].name,
      href: `/cadeau/${p.slug}`,
      delivery: deliveries.get(p.slug) as Delivery,
      product: p,
    })),
    recipients,
    budgets,
    deadlines,
    sint: { arriveBy: ARRIVE_BY.sinterklaas, daysLeft: daysUntil("2026-12-05", today), fastestOrderBy: lastOrderDate(1, "sinterklaas") },
    kerst: { arriveBy: ARRIVE_BY.kerst, daysLeft: daysUntil("2026-12-25", today), fastestOrderBy: lastOrderDate(1, "kerst") },
    guides: guides.map((g) => ({ slug: g.slug, title: g.title, intro: g.intro[0] ?? "", href: `/gids/${g.slug}` })),
    tomorrowDelivery: addBusinessDays(today, 1),
  };
}

export type LandingData = Awaited<ReturnType<typeof getLandingData>>;
