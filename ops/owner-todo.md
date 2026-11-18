# Te doen door eigenaar

OpTijdCadeau is een **affiliate-cadeaugids** (keuze eigenaar 17-11): we verkopen zelf niets en verdienen commissie via links. Geen dropship, geen leveranciers, geen betalingen of retouren.

Gesorteerd op volgorde. Vink af met `[x]`. Sleutels zet je in Vercel (Settings → Environment Variables) en in `.env.local`; nooit in de chat plakken, nooit committen. Sjabloon: `.env.example`.

## Gedaan

- [x] **KvK** — Omega Ksi, KvK 90505611, btw-id NL249643807B01 (17-11).
- [x] **Domein** — optijdcadeau.nl geregistreerd via TransIP (17-11).
- [x] **Contact** — e-mail dogteromc03@gmail.com en telefoon 06 55 08 98 62 op de site (17-11).
- [x] **Vercel** — project `cadeaukompas`, bouwt automatisch bij elke push; dashboard-wachtwoord ingesteld (17-11).
- [x] **GitHub** — https://github.com/cjjdogterom/cadeaukompas (openbaar).
- [x] **Agents lokaal** — geplande taak "optijdcadeau-agents" in de Claude-app, elke 2 uur 08–22 (17-11).

## 1. Nu (blokkeert de livegang)

- [x] **1a. Adres** — Oude Delft 35, 2611 BB Delft (17-11).
- [ ] **1b. Handelsnaam OpTijdCadeau bij KvK registreren** — kvk.nl → Wijziging doorgeven → Handelsnaam toevoegen (online, DigiD/eHerkenning). Elke naam waaronder je handelt moet in het Handelsregister staan.
- [x] **1c. Bol Partnerprogramma** — aangemeld; Site-ID 1560792 staat in Vercel (17-11). Alle bol-links lopen nu via partner.bol.com met jouw ID.
- [ ] **1d. Zakelijke rekening of IBAN** voor de commissie-uitbetalingen van bol en de netwerken.

## 2. Livegang (jij geeft akkoord, ik bereid voor)

- [x] **2a. Teksten** — akkoord eigenaar 17-11 (cookiebeleid, privacy, gebruiksvoorwaarden, hoe wij verdienen, cookiebanner).
- [ ] **2b. Vercel Pro** — het project staat nog op **Hobby** (gezien 18-11: Vercel weigerde een cron met de melding "Hobby accounts"). Vercel → team "chris' projects" → Settings → Billing → Upgrade to Pro. Hobby mag niet commercieel; met Pro kan ook de bezorgdatum-cache elk half uur automatisch worden ververst.
- [x] **2c. Domein gekoppeld** (17-11) — optijdcadeau.nl en www (stuurt door) wijzen naar Vercel, HTTPS werkt, `NEXT_PUBLIC_SITE_URL` staat. De site is bereikbaar maar nog **niet vindbaar** in Google (noindex). Bij livegang-akkoord: `NEXT_PUBLIC_INDEXABLE=true` in Vercel + Redeploy.
- [x] **2d. Indexeren aan** (17-11) — `NEXT_PUBLIC_INDEXABLE=true`; robots.txt staat Google toe, sitemap op /sitemap.xml.

## 2b. Bezorgdatums live van bol (aanbevolen)

- [x] **bol Open API-sleutels** — aangemaakt en in Vercel gezet (18-11). Productfoto's, EAN en actuele prijzen komen nu uit de bol-API; bezorgdatums live.
- [ ] **bol: bankgegevens en bedrijfsgegevens** — partner.bol.com → Account: IBAN toevoegen (anders geen uitbetaling) en "Wil je verder als bedrijf?" → Omega Ksi met KvK en btw-id, zodat commissie op je bedrijf staat.

## 3. Meer winkels (meer producten, meer commissie)

Na elke goedkeuring: zet de sleutels in Vercel (Production) en kopieer op het dashboard de prompt "Producten van een andere winkel toevoegen".

- [x] **3a. Awin-account** — publisher-ID 3159165 staat in Vercel (17-11).
- [x] **3a-2. Awin: 14 winkels aangevraagd** (18-11) — Coolblue, ICI PARIS XL, Paagman, Top1toys, Spellenrijk, Little Dreamers, Action, Marie-Stella-Maris, Sony, Samsung, SharkNinja, Braadbaas, MyPoster, DenkSport. Lijst met ID's: ops/research/awin-aanmeldingen-2026-11-18.md.
- [ ] **3a-3. Awin-goedkeuringen afwachten** — je krijgt per winkel een mail van Awin. Kopieer dan de prompt "Antwoord van bol of een affiliate-netwerk verwerken" en plak de mail; dan koppelen de agents de winkel en zetten producten live.
- [x] **3b. TradeTracker-account** — aangemeld (18-11). Volgende: account-goedkeuring afwachten, dan campagnes aanvragen (de Bijenkorf, fonQ, HEMA, Intertoys e.a.); dat kan ik samen met je doen in het browservenster.
- [x] **3c. Daisycon-account** — aangemeld (18-11). Volgende: account-goedkeuring afwachten, dan programma's aanvragen; dat kan ik samen met je doen in het browservenster.
- [ ] **3d. Amazon.nl Associates** — partnernet.amazon.nl → aanmelden → website optijdcadeau.nl → je krijgt een tracking-ID die eindigt op `-21` → `NEXT_PUBLIC_AMAZON_TAG`. Let op: account vervalt zonder 3 verkopen binnen 180 dagen. Er staan al 7 Amazon-producten klaar als concept.

## 4. Advertenties (na livegang, akkoord per campagne)

- [ ] **4a. Accounts** — Google Ads + Google Analytics 4, Meta Business (pixel), Pinterest Business. Betaalmethode voeg je zelf toe. ID's in Vercel: `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_PINTEREST_TAG_ID`. Google Shopping kan niet met affiliate-producten; het wordt Google Search, Meta en Pinterest.
- [ ] **4b. Akkoord per campagne** — de advertentie-maker zet voorstellen met budget in Akkoord gevraagd; maximaal €500 totaal.
- [ ] **4c. Social accounts** (TikTok, Instagram, Pinterest) op de naam OpTijdCadeau, voor gratis posts.

## 5. Volledig zelfstandig (los van je Mac)

- [ ] **5a. Agents in de cloud** — GitHub → repo → Settings → Secrets and variables → Actions:
  - Secret `ANTHROPIC_API_KEY` (console.anthropic.com → API keys; zet daar ook een maandlimiet onder Billing → Limits).
  - Variable `OPS_ENABLED` = `true` → agent-ronde elke 2 uur (08–22), feed-sync elk uur, advertentie-beoordeling 07:30.
  - Daarna de geplande taak "optijdcadeau-agents" in de Claude-app uitzetten (niet allebei).
- [ ] **5b. Supabase (nodig voor bezoekers in het dashboard)** — supabase.com → New project, regio Frankfurt, gratis. Daarna: SQL Editor → plak en run `supabase/migrations/0001_init.sql` en `0002_page_views.sql`. Dan Settings → API: zet in Vercel (Production) `NEXT_PUBLIC_SUPABASE_URL` en `SUPABASE_SERVICE_ROLE_KEY` (geheim, niet in de chat) en Redeploy. Het dashboard toont dan bezoekers per dag, populairste pagina's en herkomst, zonder je eigen bezoeken, plus klikken naar winkels.

## Administratie

- [ ] **Btw**: affiliate-commissie is een dienst (21% btw), tenzij je de kleineondernemersregeling (KOR) gebruikt. Overleg met een boekhouder.
