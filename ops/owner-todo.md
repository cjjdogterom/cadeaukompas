# Te doen door eigenaar

Gesorteerd op urgentie. Vink af met `[x]` en zet sleutels in `.env.local` (nooit in chat plakken als dat niet hoeft; nooit committen). Sjabloon: `.env.example`.

## Vandaag / morgen (blokkeert omzet)

- [ ] **1. KvK-inschrijving** (eenmanszaak of bestaande bv?)
  - kvk.nl → "Inschrijven eenmanszaak" → afspraak of online met DigiD. Kosten ca. €80 eenmalig.
  - Je ontvangt KvK-nummer en (bij eenmanszaak) automatisch een btw-id van de Belastingdienst.
  - Nodig voor: footer, Mollie, affiliate-netwerken, leveranciers.
- [ ] **2. Zakelijke bankrekening** (bv. bunq, Knab, ING Zakelijk). Nodig voor Mollie-uitbetaling en affiliate-uitbetalingen.
- [ ] **3. Bol Partnerprogramma** — partner.bol.com → "Aanmelden" → website-URL invullen (preview-URL of domein, zie 6).
  - Daarna: Account → "Site-ID" kopiëren → `.env.local`: `NEXT_PUBLIC_BOL_SITE_ID=`
  - Optioneel: Open API / Marketing Catalog API-sleutel (Account → API) → `BOL_API_CLIENT_ID`, `BOL_API_CLIENT_SECRET` (voor prijzen/afbeeldingen/voorraad-sync).
- [ ] **4. Amazon.nl Associates** — partnernet.amazon.nl → aanmelden → tracking-ID (eindigt op `-21`) → `NEXT_PUBLIC_AMAZON_TAG=`
  - Let op: account vervalt als er binnen 180 dagen geen 3 kwalificerende verkopen zijn.
- [ ] **5. Affiliate-netwerken** (één of meer): Awin (awin.com, publisher, eenmalige borg ca. €5 die terugkomt), TradeTracker (tradetracker.com/nl), Daisycon (daisycon.com). Na goedkeuring per adverteerder (Coolblue, HEMA, Intertoys, Bijenkorf, fonQ) apart aanmelden.
  - Sleutels: `AWIN_PUBLISHER_ID`, `AWIN_API_TOKEN`; `TRADETRACKER_CUSTOMER_ID`, `TRADETRACKER_PASSPHRASE`, `TRADETRACKER_SITE_ID`; `DAISYCON_PUBLISHER_ID`, `DAISYCON_MEDIA_ID`.
- [ ] **6. Domeinnaam** kiezen en registreren (bv. via TransIP/Vercel, ca. €10/jaar). Zie vraag 1.

## Dag 3–4 (voor livegang)

- [ ] **7. Vercel-account** (vercel.com, Hobby is gratis maar **niet** toegestaan voor commercieel gebruik → Pro $20/maand). Project koppelen; ik deploy via CLI (`vercel login` doe jij). Zet in Vercel ook `ADMIN_PASSWORD` (zelf verzonnen, sterk) voor het dashboard `/admin`.
- [ ] **8. Supabase-project** (supabase.com → New project, regio Frankfurt `eu-central-1`, gratis tier volstaat).
  - Settings → API: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (geheim!).
- [ ] **9. Mollie** (mollie.com → account → KvK, bankrekening, ID-verificatie, UBO). Test-API-sleutel (`test_…`) mag direct: Developers → API keys → `MOLLIE_API_KEY`. Live-sleutel pas na verificatie en jouw livegang-akkoord. Klarna apart activeren in het dashboard.
- [ ] **10. E-mail**: Resend (resend.com) → domein verifiëren (DNS-records) → `RESEND_API_KEY`. Afzenderadres bv. `bestellingen@<domein>`.
- [ ] **11. Contactgegevens voor footer/voorwaarden**: bedrijfsnaam, vestigingsadres (of zakelijk postadres), e-mail, telefoon (verplicht bereikbaar), KvK, btw-id.
- [ ] **12. Retouradres in Nederland** voor dropship-retouren (of afspraak dat leverancier retouren ontvangt).

## Zodra dropship-leveranciers gekozen zijn

- [ ] **13. Leveranciers aanmelden + contract/voorwaarden** (voorstel volgt van Leverancier-agent in `ops/research/`). Let op: als verkoper ben jij aansprakelijk voor levering, garantie en 14 dagen herroepingsrecht.
- [ ] **14. Btw-administratie**: dropship-verkopen = jouw omzet (21% / 9%); affiliate-commissie = dienst (21% btw, of KOR als je onder €20.000 omzet blijft — overleg boekhouder).

## Advertenties (pas na livegang + akkoord per campagne)

- [ ] **15. Google Ads + Merchant Center**, **Meta Business Manager** (pixel + Conversions API-token), **Pinterest Business**. Betaalmethode toevoegen doe jij. Sleutels: `NEXT_PUBLIC_GA4_ID`, `GA4_API_SECRET`, `NEXT_PUBLIC_META_PIXEL_ID`, `META_CAPI_TOKEN`, `NEXT_PUBLIC_PINTEREST_TAG_ID`.
- [ ] **16. Social accounts** (TikTok, Instagram, Pinterest) op shopnaam.

## Automatisch draaien (agents)

- [x] **17. GitHub-repo** — https://github.com/cjjdogterom/cadeaukompas (gekoppeld en gepusht op 17-11). Let op: de repo is nu **openbaar**, zie vraag 11.
- [ ] **18. Geplande agent-taken aanzetten** (pas als je dat wilt): GitHub → repo → Settings → Secrets and variables → Actions.
  - Secret `ANTHROPIC_API_KEY` (console.anthropic.com → API keys) en de sleutels uit `.env.example` die de jobs nodig hebben.
  - Variable `OPS_ENABLED=true` → feed-sync elk uur, advertentie-beoordeling 07:30, dagrapport 08:00.
  - Variable `DROPSHIP_ENABLED=true` → order-ops elk kwartier (pas na eerste dropship-leverancier).
  - Kosten: API-gebruik (schatting in dagrapport) en GitHub Actions-minuten (gratis bij een openbare repo; privé 2.000 min/maand gratis).
