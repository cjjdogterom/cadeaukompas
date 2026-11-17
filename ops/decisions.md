# Beslissingslog

Formaat: datum · beslissing · reden · eigenaar-akkoord (ja / nee / n.v.t. = valt binnen mandaat agents)

| Datum | Beslissing | Reden | Akkoord |
|---|---|---|---|
| 2026-11-17 | Repo-root is het Next.js-project; `app/` = site (App Router), `ops/` = plannen/rapporten, `.claude/agents/` = agents | Volgt de gevraagde structuur; Next.js gebruikt `app/` zelf al | n.v.t. |
| 2026-11-17 | Werknaam shop: **Cadeaukompas** (instelbaar in `lib/site.ts`) | Eigenaar heeft nog geen naam/domein gekozen; werknaam is omkeerbaar | nee — wacht op eigenaar (vraag 1) |
| 2026-11-17 | Data-laag met fallback: zonder Supabase-sleutels leest de site `data/products.json`; met sleutels de tabel `products` | Bouwen kan door zonder te wachten op accounts; zelfde type voor beide | n.v.t. |
| 2026-11-17 | Affiliate-links lopen via `/uit/[slug]` (302 + klik-event). Zonder partner-ID: gewone winkellink, geen commissie | Eén plek voor tracking, dode-link-detectie en disclosure | n.v.t. |
| 2026-11-17 | "Op tijd voor Sinterklaas" = bezorgd uiterlijk **vr 4 dec**; voor kerst uiterlijk **do 24 dec**. Rekenen in werkdagen (ma–vr) + 1 werkdag piekbuffer | 5 dec 2026 valt op zaterdag; conservatief rekenen voorkomt teleurgestelde klanten en misleiding | n.v.t. (veiligste optie) — eigenaar mag buffer aanpassen |
| 2026-11-17 | Geen productfoto's van winkels kopiëren; eigen categorie-illustraties tot feed-afbeeldingen met licentie beschikbaar zijn | Auteursrecht; feeds van Bol/netwerken geven gebruiksrecht | n.v.t. |
| 2026-11-17 | Prijzen in catalogus zijn "indicatie" tot de feed-sync ze bevestigt; producten krijgen status `concept` tot link + prijs geverifieerd | Geen misleidende prijzen (Wet oneerlijke handelspraktijken) | n.v.t. |
| 2026-11-17 | Feed-sync (elk uur) en order-ops (elk kwartier) zijn gewone scripts zonder LLM; alleen dagrapport en advertentie-beoordeling draaien via `claude -p` | Kosten en voorspelbaarheid: een LLM-run elk kwartier kost veel en voegt niets toe zolang er niets misgaat | n.v.t. |
| 2026-11-17 | Catalogus: 48 producten uit 2 scout-shortlists geïmporteerd (score ≥ 60), allemaal status `concept`; 1 gepauzeerd (Echo Dot, 404) | Prijzen zijn grotendeels nog niet door een feed bevestigd; concept is alleen zichtbaar op preview | n.v.t. |
| 2026-11-17 | Advies: Sinterklaas = alleen affiliate; dropship pas voor kerst (vroegst ~30 nov, realistisch ~7 dec) | Leverancier-onderzoek: KvK/btw blokkeren aanmelding, voorwaarden moeten per mail nagevraagd worden | nee — wacht op eigenaar (vraag 4) |
| 2026-11-17 | Project verhuisd van OneDrive naar `~/Projects/cadeausite`; in OneDrive staat alleen nog een verwijzing (VERHUISD.md) | `npm install` in OneDrive duurde >20 min en liep vast, hier 6 s; `.env.local` hoort niet in cloudsync. Back-up wordt de (privé) GitHub-repo | ja (17-11, in chat) |
| 2026-11-17 | Code staat op GitHub: `cjjdogterom/cadeaukompas` (branch `main`) | Back-up en basis voor geplande taken | ja (17-11, in chat) |
| 2026-11-17 | Geplande workflow staat uit tot repository-variabelen `OPS_ENABLED` / `DROPSHIP_ENABLED` op `true` staan | Voorkomt dat jobs elk kwartier draaien of falen zonder sleutels (kosten, foutmeldingen) | n.v.t. (veiligste optie) |
