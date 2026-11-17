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
| 2026-11-17 | Repo `cjjdogterom/cadeaukompas` blijft openbaar | Keuze eigenaar | ja (17-11, in chat) |
| 2026-11-17 | Omdat de repo openbaar is: `ops/support/` staat in .gitignore; geen persoonsgegevens (namen, e-mail, adressen, ordergegevens van klanten) in bestanden in git — die staan alleen in de database | AVG; een openbare repo is publicatie | n.v.t. (verplicht) |
| 2026-11-17 | 20 producten op `actief` gezet (alle uit shortlist B: kind/tiener/vriend). Voorwaarde: prijs gecontroleerd op 17-11 én link gaf HTTP 200 | Productie toonde geen producten; regel: actief alleen met geverifieerde link + prijs ≤ 48 uur | ja (17-11, in chat) |
| 2026-11-17 | Deze 20 prijzen vóór do 19-11 opnieuw controleren, anders terug naar `concept` | 48-uursregel; feed-sync bestaat nog niet (wacht op Bol-API-sleutel) | n.v.t. |
| 2026-11-17 | Catalogus-agent: 13 extra producten geactiveerd (prijs + pagina gecontroleerd), 10 gepauzeerd (niet leverbaar), 4 concept (403/onduidelijke prijs). Nu 33 actief | Volgens regel: actief alleen met geverifieerde prijs ≤ 48 uur | n.v.t. (binnen mandaat, regel goedgekeurd 17-11) |
| 2026-11-17 | Dropship-checkout gebouwd maar uit (`NEXT_PUBLIC_CHECKOUT_ENABLED`); verzendkosten, retourkosten, retouradres en livegang wachten op eigenaar | Checkout en juridische pagina’s = akkoord-protocol | nee — zie ops/approvals/2026-11-17-dropship-checkout.md |
| 2026-11-17 | Inkoopprijzen nooit in `data/products.json` (openbare repo), alleen in database | Marges zijn bedrijfsgevoelig | n.v.t. |
| 2026-11-17 | 11 producten uit shortlist C geactiveerd (prijs op productpagina 17-11 + link 200). Nu 44 actief, allemaal bol | Zelfde regel als eerder | n.v.t. (binnen mandaat) |
