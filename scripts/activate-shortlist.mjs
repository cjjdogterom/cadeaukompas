#!/usr/bin/env node
// Zet geïmporteerde shortlist-producten op actief als de scout ze vandaag heeft gecontroleerd.
// Gebruik: node scripts/activate-shortlist.mjs <YYYY-MM-DD> <shortlist.json> [...]
import { readFileSync, writeFileSync } from "node:fs";
const [date, ...files] = process.argv.slice(2);
const f = "data/products.json";
const p = JSON.parse(readFileSync(f, "utf8"));
const slugs = new Set(files.flatMap((x) => JSON.parse(readFileSync(x, "utf8")).map((y) => y.slug)));
let on = 0;
const kept = [];
for (const x of p) {
  if (!slugs.has(x.slug) || x.status !== "concept") continue;
  const ok = x.scout?.verified && x.priceCheckedAt === date && (x.scout?.score ?? 0) >= 60 && x.deliveryDaysMax <= 3 && x.merchant === "bol";
  if (ok) { x.status = "actief"; on++; } else kept.push(x.slug);
}
writeFileSync(f, JSON.stringify(p, null, 2) + "\n");
console.log(`Geactiveerd: ${on}. Concept gebleven: ${kept.length}${kept.length ? " (" + kept.join(", ") + ")" : ""}. Actief totaal: ${p.filter((x) => x.status === "actief").length}`);
