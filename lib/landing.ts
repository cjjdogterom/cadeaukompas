import "server-only";
import { getProducts } from "./catalog";
import { getDeliveries, type Delivery } from "./delivery";
import { guides } from "./guides";
import { ARRIVE_BY, addBusinessDays, daysUntil, lastOrderDate, todayInNL } from "./deadlines";
import { BUDGETS, INTERESTS, MERCHANTS, RECIPIENTS, type Product } from "./types";

/**
 * Alle echte inhoud voor de homepage, in één keer. Aanroepen na `await connection()`
 * (hangt af van vandaag). Gebruikt door de homepage en de ontwerpvarianten in app/(ontwerp).
 */
export async function getLandingData() {
  const today = todayInNL();
  const products = await getProducts();
  const featured = products.slice(0, 12);
  const pick = (f: (p: Product) => boolean, n = 8) => products.filter(f).slice(0, n);
  const rowDefs = [
    { title: "Schoencadeautjes onder €15", href: "/cadeaus?budget=tot-15", items: pick((p) => p.priceCents < 1500) },
    { title: "Voor kinderen", href: "/cadeaus?voor=kind", items: pick((p) => p.recipients.includes("kind")) },
    { title: "Voor tieners", href: "/cadeaus?voor=tiener", items: pick((p) => p.recipients.includes("tiener")) },
    { title: "Voor je partner", href: "/cadeaus?voor=partner", items: pick((p) => p.recipients.includes("partner")) },
    { title: "Voor opa en oma", href: "/cadeaus?voor=opa-oma", items: pick((p) => p.recipients.includes("opa-oma")) },
    { title: "Voor een collega", href: "/cadeaus?voor=collega", items: pick((p) => p.recipients.includes("collega")) },
  ];
  const deliveries = await getDeliveries([...new Set([...featured, ...rowDefs.flatMap((r) => r.items)])]);
  const toItem = (p: Product) => ({
    slug: p.slug,
    title: p.title,
    brand: p.brand ?? null,
    short: p.short,
    priceCents: p.priceCents,
    merchant: MERCHANTS[p.merchant].name,
    href: `/cadeau/${p.slug}`,
    delivery: deliveries.get(p.slug) as Delivery,
    product: p,
  });
  const interests = Object.entries(INTERESTS).map(([key, label]) => ({
    key,
    label,
    count: products.filter((p) => p.interests.includes(key as Product["interests"][number])).length,
    href: `/cadeaus?interesse=${key}`,
  }));

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
    featured: featured.map(toItem),
    /** Productrijen per thema, zoals een webshop-homepage. */
    rows: rowDefs.map((r) => ({ title: r.title, href: r.href, items: r.items.map(toItem) })),
    interests,
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
