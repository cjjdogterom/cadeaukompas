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

- [ ] **1a. Adres voor de site** — je KvK-adres of een zakelijk postadres. Wettelijk verplicht in de footer (art. 3:15d BW). Stuur het in de chat.
- [ ] **1b. Handelsnaam OpTijdCadeau bij KvK registreren** — kvk.nl → Wijziging doorgeven → Handelsnaam toevoegen (online, DigiD/eHerkenning). Elke naam waaronder je handelt moet in het Handelsregister staan.
- [ ] **1c. Bol Partnerprogramma** — partner.bol.com → Aanmelden met je bol-account → website optijdcadeau.nl. Daarna: Account → Site-ID → in Vercel `NEXT_PUBLIC_BOL_SITE_ID`. Zonder dit verdienen de bol-links niets. Bol beoordeelt de site; doe dit op of vlak na de livegang (zie 2).
- [ ] **1d. Zakelijke rekening of IBAN** voor de commissie-uitbetalingen van bol en de netwerken.

## 2. Livegang (jij geeft akkoord, ik bereid voor)

- [ ] **2a. Akkoord op de teksten** — cookiebeleid, privacyverklaring, gebruiksvoorwaarden en "hoe wij verdienen" (dashboard → Akkoord gevraagd).
- [ ] **2b. Vercel Pro** op de dag van livegang (~$20/mnd; Hobby is volgens Vercel alleen voor niet-commercieel gebruik). Vercel → Settings → Billing → Upgrade.
- [ ] **2c. Domein koppelen** — Vercel → project → Settings → Domains → `optijdcadeau.nl` en `www.optijdcadeau.nl` → de DNS-records die Vercel toont invullen bij TransIP (Domeinen → optijdcadeau.nl → DNS). Daarna in Vercel `NEXT_PUBLIC_SITE_URL=https://optijdcadeau.nl` en `NEXT_PUBLIC_INDEXABLE=true`, en Redeploy. Vanaf dat moment is de site openbaar.

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
