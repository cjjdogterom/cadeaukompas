#!/usr/bin/env node
// Dode-links-check: HEAD/GET op elke merchantUrl in data/products.json. Meldt 4xx/5xx.
import { readFileSync } from "node:fs";

const products = JSON.parse(readFileSync("data/products.json", "utf8"));
const results = await Promise.all(
  products.map(async (p) => {
    try {
      const res = await fetch(p.merchantUrl, {
        method: "GET",
        redirect: "follow",
        headers: { "user-agent": "Mozilla/5.0 (compatible; link-check)" },
        signal: AbortSignal.timeout(15000),
      });
      return { slug: p.slug, status: res.status };
    } catch (e) {
      return { slug: p.slug, status: 0, error: String(e.message ?? e) };
    }
  }),
);
const bad = results.filter((r) => r.status === 0 || r.status >= 400);
console.log(`Gecontroleerd: ${results.length}, problemen: ${bad.length}`);
for (const r of bad) console.log(`- ${r.slug}: ${r.status}${r.error ? ` (${r.error})` : ""}`);
// Let op: sommige winkels blokkeren bots (403/503) — dat is geen dode link; handmatig nalopen.
