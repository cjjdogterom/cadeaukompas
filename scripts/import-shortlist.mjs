#!/usr/bin/env node
// Catalogus-agent: voegt shortlist(s) van de Product-scout samen in data/products.json.
// Gebruik: node scripts/import-shortlist.mjs data/research/shortlist-2026-11-17-a.json [...meer]
// Bestaande producten (zelfde slug) worden niet overschreven; nieuwe krijgen status "concept".
import { readFileSync, writeFileSync } from "node:fs";

const RECIPIENTS = ["partner", "moeder", "vader", "collega", "tiener", "kind", "vriend", "opa-oma", "thuiswerker"];
const AGES = ["0-3", "4-7", "8-12", "13-17", "volwassen"];
const INTERESTS = ["koken", "eten-drinken", "gamen", "lezen", "sport", "wellness", "tech", "creatief", "thuis", "muziek", "spellen", "bouwen"];
const MERCHANTS = ["bol", "amazon", "coolblue", "hema", "intertoys", "bijenkorf", "fonq", "eigen"];
const MIN_SCORE = Number(process.env.MIN_SCORE ?? 60);

const target = "data/products.json";
const catalog = JSON.parse(readFileSync(target, "utf8"));
const bySlug = new Map(catalog.map((p) => [p.slug, p]));
const problems = [];
let added = 0;

for (const file of process.argv.slice(2)) {
  for (const raw of JSON.parse(readFileSync(file, "utf8"))) {
    const p = { ...raw };
    const clean = String(p.title ?? "").split(/\s+[-–|]\s+/)[0].trim();
    if (clean && clean !== p.title) { p.merchantTitle = p.title; p.title = clean; }
    const issues = [];
    if (!/^[a-z0-9-]+$/.test(p.slug ?? "")) issues.push("slug");
    if (!MERCHANTS.includes(p.merchant)) issues.push(`merchant ${p.merchant}`);
    try { new URL(p.merchantUrl); } catch { issues.push("merchantUrl"); }
    if (!Number.isInteger(p.priceCents) || p.priceCents <= 0) issues.push("priceCents");
    p.recipients = (p.recipients ?? []).filter((r) => RECIPIENTS.includes(r));
    p.ageGroups = (p.ageGroups ?? []).filter((a) => AGES.includes(a));
    p.interests = (p.interests ?? []).filter((i) => INTERESTS.includes(i));
    if (!p.recipients.length) issues.push("recipients leeg");
    if (!p.interests.length) issues.push("interests leeg");
    if (!p.ageGroups.length) p.ageGroups = ["volwassen"];
    p.occasions = p.occasions?.length ? p.occasions : ["sinterklaas", "kerst"];
    p.deliveryDaysMin = p.deliveryDaysMin ?? 1;
    p.deliveryDaysMax = Math.max(p.deliveryDaysMax ?? 3, p.deliveryDaysMin);
    p.imageUrl = p.imageLicense ? p.imageUrl ?? null : null;
    p.status = "concept";
    p.type = p.type ?? "affiliate";
    p.sources = p.sources ?? [];
    if ((p.scout?.score ?? 0) < MIN_SCORE) issues.push(`score ${p.scout?.score ?? "?"} < ${MIN_SCORE}`);

    if (issues.length) { problems.push(`${file} › ${p.slug}: ${issues.join(", ")}`); continue; }
    if (bySlug.has(p.slug)) continue;
    bySlug.set(p.slug, p);
    added++;
  }
}

writeFileSync(target, JSON.stringify([...bySlug.values()], null, 2) + "\n");
console.log(`Toegevoegd: ${added}. Totaal in catalogus: ${bySlug.size}.`);
if (problems.length) console.log(`Overgeslagen (${problems.length}):\n- ${problems.join("\n- ")}`);
