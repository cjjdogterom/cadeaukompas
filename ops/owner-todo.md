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

- [x] **1a. Adres** — Oude Delft 35, Delft (17-11). Postcode nog doorgeven, dan volledig.
- [ ] **1b. Handelsnaam OpTijdCadeau bij KvK registreren** — kvk.nl → Wijziging doorgeven → Handelsnaam toevoegen (online, DigiD/eHerkenning). Elke naam waaronder je handelt moet in het Handelsregister staan.
- [x] **1c. Bol Partnerprogramma** — aangemeld; Site-ID 1560792 staat in Vercel (17-11). Alle bol-links lopen nu via partner.bol.com met jouw ID.
- [ ] **1d. Zakelijke rekening of IBAN** voor de commissie-uitbetalingen van bol en de netwerken.

## 2. Livegang (jij geeft akkoord, ik bereid voor)

- [x] **2a. Teksten** — akkoord eigenaar 17-11 (cookiebeleid, privacy, gebruiksvoorwaarden, hoe wij verdienen, cookiebanner).
- [x] **2b. Vercel Pro** — geregeld door eigenaar (17-11).
- [x] **2c. Domein gekoppeld** (17-11) — optijdcadeau.nl en www (stuurt door) wijzen naar Vercel, HTTPS werkt, `NEXT_PUBLIC_SITE_URL` staat. De site is bereikbaar maar nog **niet vindbaar** in Google (noindex). Bij livegang-akkoord: `NEXT_PUBLIC_INDEXABLE=true` in Vercel + Redeploy.
- [x] **2d. Indexeren aan** (17-11) — `NEXT_PUBLIC_INDEXABLE=true`; robots.txt staat Google toe, sitemap op /sitemap.xml.

## 2b. Bezorgdatums live van bol (aanbevolen)

- [ ] **bol Open API-sleutels** — partner.bol.com → Account → scroll naar **Open API** → **Toevoegen** → naam bv. "optijdcadeau". Je krijgt een Client ID en Client Secret. Zet ze zelf in Vercel (Production) als `BOL_API_CLIENT_ID` en `BOL_API_CLIENT_SECRET` (Secret niet in de chat plakken) en Redeploy. Dan toont de site per cadeau de bezorgdatum die bol belooft en filtert "uiterlijk in huis op" daarop; zonder sleutels is het een schatting uit onze levertijden.

## 3. Meer winkels (meer producten, meer commissie)

- [ ] **3a. Affiliate-netwerk(en)** — Awin (awin.com, publisher, borg ca. €5 die terugkomt), TradeTracker (tradetracker.com/nl) en/of Daisycon (daisycon.com). Daarna per winkel aanmelden (Coolblue, HEMA, Intertoys, Bijenkorf, fonQ). Sleutels: `AWIN_PUBLISHER_ID`, `AWIN_API_TOKEN`; `TRADETRACKER_CUSTOMER_ID`, `TRADETRACKER_PASSPHRASE`, `TRADETRACKER_SITE_ID`; `DAISYCON_PUBLISHER_ID`, `DAISYCON_MEDIA_ID`. Dan zet de catalogus-agent de concept-producten van die winkels live.
- [ ] **3b. Amazon.nl Associates** (optioneel) — partnernet.amazon.nl → tracking-ID (eindigt op `-21`) → `NEXT_PUBLIC_AMAZON_TAG`. Account vervalt zonder 3 verkopen in 180 dagen.

## 4. Advertenties (na livegang, akkoord per campagne)

- [ ] **4a. Accounts** — Google Ads + Google Analytics 4, Meta Business (pixel), Pinterest Business. Betaalmethode voeg je zelf toe. ID's in Vercel: `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_PINTEREST_TAG_ID`. Google Shopping kan niet met affiliate-producten; het wordt Google Search, Meta en Pinterest.
- [ ] **4b. Akkoord per campagne** — de advertentie-maker zet voorstellen met budget in Akkoord gevraagd; maximaal €500 totaal.
- [ ] **4c. Social accounts** (TikTok, Instagram, Pinterest) op de naam OpTijdCadeau, voor gratis posts.

## 5. Volledig zelfstandig (los van je Mac)

- [ ] **5a. Agents in de cloud** — GitHub → repo → Settings → Secrets and variables → Actions:
  - Secret `ANTHROPIC_API_KEY` (console.anthropic.com → API keys; zet daar ook een maandlimiet onder Billing → Limits).
  - Variable `OPS_ENABLED` = `true` → agent-ronde elke 2 uur (08–22), feed-sync elk uur, advertentie-beoordeling 07:30.
  - Daarna de geplande taak "optijdcadeau-agents" in de Claude-app uitzetten (niet allebei).
- [ ] **5b. Supabase** (optioneel) — supabase.com → project in regio Frankfurt → `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` in Vercel en als GitHub-secret. Dan worden klikken naar winkels geteld (zonder persoonsgegevens) en ziet het dashboard klikken per product.

## Administratie

- [ ] **Btw**: affiliate-commissie is een dienst (21% btw), tenzij je de kleineondernemersregeling (KOR) gebruikt. Overleg met een boekhouder.
