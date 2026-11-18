#!/usr/bin/env node
// Haalt EAN, foto en actuele prijs op via de live site (/api/bol/catalog) en schrijft ze in data/products.json.
// Producten die bol niet (meer) aanbiedt gaan op gepauzeerd. Draai NA de deploy van nieuwe producten.
// Gebruik: node scripts/bol-enrich.mjs [--only-missing]
import { readFileSync, writeFileSync } from "node:fs";
const BASE = process.env.SITE_URL ?? "https://optijdcadeau.nl";
const onlyMissing = process.argv.includes("--only-missing");
const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam" }).format(new Date());
const items = [];
let total = Infinity;
for (let off = 0; off < total; off += 20) {
  const res = await fetch(`${BASE}/api/bol/catalog?offset=${off}&limit=20${onlyMissing ? "&missing=1" : ""}`);
  if (!res.ok) { console.error("fout", off, res.status); break; }
  const d = await res.json();
  total = d.total;
  items.push(...d.items);
  process.stdout.write(`${Math.min(off + 20, total)}/${total}\r`);
}
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
