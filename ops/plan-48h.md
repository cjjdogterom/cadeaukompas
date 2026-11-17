# Plan eerste 48 uur (di 17 nov – do 19 nov 2026)

Doel: op do 19 nov een werkende preview-site met 40–60 affiliate-producten, cadeaugids-filters, cadeauzoeker en eerlijke besteldeadlines. Checkout, juridische pagina's en analytics volgen dag 3–4 (vr 20 – za 21 nov), livegang na akkoord eigenaar.

| Blok | Wat | Wie (agent) | Resultaat |
|---|---|---|---|
| Di middag | Repo, agents, owner-todo, beslissingslog, vragen | Orchestrator | `ops/`, `.claude/agents/` |
| Di middag | Next.js + Tailwind + datamodel (Supabase-migratie + lokale seed-fallback) | Developer | site draait lokaal zonder sleutels |
| Di avond | Cadeaugids, productpagina, uitgaande affiliate-links (`/uit/[slug]`), deadline-logica 4/24 dec | Developer | basis-site |
| Di–wo | Shortlist 50 cadeaus met echte URL, prijs, levertijd, bronnen | Product-scout | `data/research/shortlist-*.json` |
| Di–wo | Vergelijking NL/EU-dropshippers + aanmeldpakket | Leverancier-agent | `ops/research/leveranciers-*.md` |
| Wo | Shortlist → catalogus (unieke NL-teksten, status `concept` tot prijs/link geverifieerd) | Catalogus-agent | `data/products.json` / Supabase `products` |
| Wo | Cadeauzoeker-quiz, 3 SEO-landingspagina's, surprise- & gedichtideeën | Developer + SEO & content | |
| Wo | Concept-juridische pagina's (met invulvelden voor KvK/btw) + compliance-checklist | Compliance | `app/(juridisch)/…`, `ops/compliance-checklist.md` |
| Do | Vercel-preview (zodra eigenaar account/sleutel geeft), QA: links, mobiel, Lighthouse, a11y | QA-agent | QA-rapport, preview-URL |
| Do 08:00 | Dagrapport | Orchestrator | `ops/daily/2026-11-19.md` |

**Kritieke pad:** affiliate-accounts (Bol, Amazon, Awin/TradeTracker/Daisycon) en KvK/btw liggen bij de eigenaar. Zonder partner-ID's linkt de site gewoon naar de winkel zonder commissie — dat is veilig maar levert niets op. Zie `ops/owner-todo.md`, punten 1–4 zijn het meest urgent.

**Afspraken**
- Niets gaat live, geen geld uitgegeven en geen voorwaarden geaccepteerd zonder akkoord eigenaar (zie `ops/decisions.md`).
- Producten zonder geverifieerde prijs (`price_checked_at` ouder dan 48 uur) tonen "prijs indicatief" of worden gepauzeerd.
- Geen productfoto's zonder licentie: tot de affiliate-feeds draaien gebruikt de site eigen illustraties per categorie.
