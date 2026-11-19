#!/usr/bin/env node
// Haalt EAN, foto en actuele prijs op via de live site (/api/bol/catalog) en schrijft ze in data/products.json.
// Producten die bol niet (meer) aanbiedt gaan op gepauzeerd. Draai NA de deploy van nieuwe producten.
// Gebruik: node scripts/bol-enrich.mjs [--only-missing]
import { readFileSync, writeFileSync } from "node:fs";
const BASE = process.env.SITE_URL ?? "https://optijdcadeau.nl";
const onlyMissing = process.argv.includes("--only-missing");
const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam" }).format(new Date());
const STEP = 10;
// Eén blok ophalen met timeout en 3 pogingen; netwerkfouten breken de hele run niet meer af.
async function getChunk(off) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`${BASE}/api/bol/catalog?offset=${off}&limit=${STEP}${onlyMissing ? "&missing=1" : ""}`, { signal: AbortSignal.timeout(75_000) });
      if (res.ok) return await res.json();
      console.error(`\nfout offset ${off} poging ${attempt}: HTTP ${res.status}`);
    } catch (e) {
      console.error(`\nfout offset ${off} poging ${attempt}: ${e.cause?.code ?? e.name ?? e}`);
    }
    await new Promise((r) => setTimeout(r, 3000 * attempt));
  }
  return null;
}
const items = [];
const failed = [];
let total = Infinity;
for (let off = 0; off < total; off += STEP) {
  const d = await getChunk(off);
  if (!d) {
    failed.push(off);
    if (total === Infinity) { console.error("Eerste blok mislukt; gestopt zonder wijzigingen."); process.exit(1); }
    continue;
  }
  total = d.total;
  items.push(...d.items);
  process.stdout.write(`${Math.min(off + STEP, total)}/${total}\r`);
}
if (failed.length) console.error(`\nOvergeslagen blokken (offset): ${failed.join(", ")} — die producten blijven ongewijzigd.`);
const by = new Map(items.map((i) => [i.slug, i]));
const f = "data/products.json";
const p = JSON.parse(readFileSync(f, "utf8"));
let img = 0, price = 0, paused = 0;
for (const x of p) {
  const i = by.get(x.slug);
  if (!i) continue;
  if (i.ean) x.ean = i.ean;
  if (i.imageUrl && x.imageUrl !== i.imageUrl) { x.imageUrl = i.imageUrl; x.imageLicense = "bol Marketing Catalog API (affiliate)"; img++; }
  if (i.priceCents) {
    if (i.priceCents !== x.priceCents) { x.priceCents = i.priceCents; price++; }
    x.priceCheckedAt = today;
  } else if (x.status === "actief") { x.status = "gepauzeerd"; paused++; }
}
writeFileSync(f, JSON.stringify(p, null, 2) + "\n");
console.log(`\nOpgehaald: ${items.length}. Nieuwe foto's: ${img}. Prijs gewijzigd: ${price}. Gepauzeerd (geen aanbod bij bol): ${paused}. Actief: ${p.filter((x) => x.status === "actief").length}`);
