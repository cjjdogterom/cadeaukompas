# Compliance — eerste toetsing (17-11-2026)

Agent: Compliance · Getoetst: broncode (werkkopie `main`, incl. niet-gecommitte wijzigingen van de Developer) en de live site https://optijdcadeau.nl (gewone fetch, homepage, /cadeaus, /cadeau/hitster-original-nederlandstalig, /privacy, /hoe-wij-verdienen, /contact).
Kader: `ops/compliance-checklist.md` (stand 17-11: alleen affiliate). Geen formeel juridisch advies.

## Samenvatting

| Status | Aantal |
|---|---|
| OK | 13 |
| NIET OK | 6 (waarvan 1 blokkerend) |
| N.V.T. | 8 |

**Blokkerend (1):**
1. **Bedrijfsgegevens: postcode ontbreekt in het vestigingsadres** (footer, /contact, /privacy, /voorwaarden — allemaal uit `lib/site.ts` regel 11: `"Oude Delft 35, Delft"`). Art. 3:15d BW en de Handelsregisterwet vragen een volledig geografisch adres. Let op: de site is al live met dit adres. Fix: postcode toevoegen in `lib/site.ts` → akkoordverzoek `ops/approvals/2026-11-17-compliance-bedrijfsgegevens.md`.

**Niet-blokkerend, wel voor de volgende release oplossen:**
- Productkaarten tonen de prijs zonder "indicatief" en zonder controledatum; de 48-uurregel wordt nergens afgedwongen (alle prijzen staan op 17-11 en verlopen op 19-11).
- "Veelgekozen dit jaar" op de homepage is een populariteitsclaim zonder onderbouwing (de selectie is gewoon de top 8 op scout-score).
- Homepage belooft "We kijken per cadeau naar de bezorgdatum die de winkel belooft", terwijl de bol-API nog niet actief is: live staat overal een eigen schatting ("verwacht uiterlijk").
- Privacyverklaring mist grondslagen voor contact en klikregistratie, verwijzing naar het cookiebeleid en de affiliate-netwerken als ontvanger.
- Verwerkersovereenkomsten (Vercel, Supabase) nog niet bevestigd door de eigenaar.

**Eindoordeel:** zie onderaan (BLOCK zolang de postcode ontbreekt).

---

## Identiteit & contact

| # | Punt | Status | Onderbouwing / bewijs | Fix |
|---|---|---|---|---|
| 1 | **[blokkerend]** Footer: naam, adres, e-mail, telefoon, KvK, btw | **NIET OK** | `components/Footer.tsx` r. 44–50 toont naam (Omega Ksi), adres, e-mail, telefoon, KvK 90505611, btw-id. Live footer bevestigt: "Oude Delft 35, Delft", **geen postcode**. Bron: `lib/site.ts` r. 11. | Postcode toevoegen in `lib/site.ts` (`address`). Daarmee zijn footer, /contact, /privacy en /voorwaarden in één keer goed. Akkoordverzoek: `ops/approvals/2026-11-17-compliance-bedrijfsgegevens.md`. Tevens vraag aan eigenaar: is "OpTijdCadeau" als handelsnaam bij de KvK ingeschreven? |
| 2 | Contactpagina met reactietermijn | OK | `app/(shop)/(juridisch)/contact/page.tsx` r. 11: "we reageren binnen één werkdag"; live bevestigd. | Klein tekstpunt: "Vragen over een cadeau of een bestelling?" kan suggereren dat wij bestellingen afhandelen; meegenomen in akkoordverzoek affiliate-teksten. |

## Affiliate

| # | Punt | Status | Onderbouwing / bewijs | Fix |
|---|---|---|---|---|
| 3 | **[blokkerend]** Affiliate-disclosure bij elke affiliate-knop + aparte pagina | OK | Enige affiliate-knop is "Bekijk bij {winkel}" op de productpagina; direct eronder: "Je bestelt en betaalt bij {winkel} … Wij ontvangen mogelijk een commissie, jij betaalt hetzelfde. Meer uitleg" (`app/(shop)/cadeau/[slug]/page.tsx` r. 100–111; live bevestigd op /cadeau/hitster-original-nederlandstalig). Aparte pagina /hoe-wij-verdienen bestaat; footer op elke pagina en intro van /cadeaus noemen commissie. | Advies (niet blokkerend): /hoe-wij-verdienen r. 11 zegt "Bij de **meeste** cadeaus verkopen wij niet zelf" — klopt niet meer sinds de keuze "alleen affiliate"; moet "Wij verkopen zelf niets". Zodra een Amazon-tag actief is, is de verplichte Amazon-zin nodig ("Als Amazon-partner verdienen wij aan in aanmerking komende aankopen"). Beide in `ops/approvals/2026-11-17-compliance-affiliate-teksten.md`. |
| 4 | Affiliate-links `rel="sponsored nofollow"` | OK | `app/(shop)/cadeau/[slug]/page.tsx` r. 103: `rel="sponsored nofollow noopener"`. Redirect `/uit/[slug]` zet `X-Robots-Tag: noindex, nofollow` (`app/uit/[slug]/route.ts` r. 31) en staat in `robots.ts` disallow. Klikregistratie zonder persoonsgegevens (r. 19–26). | — |
| 5 | Prijs "indicatief bij <winkel>" met controledatum; ≤ 48 uur bij actief | **NIET OK** | Productpagina OK: "Indicatieve prijs bij bol incl. btw, gecontroleerd op di 17 nov. De prijs bij de winkel is leidend." Maar **productkaarten** (`components/ProductCard.tsx` r. 31–33) tonen alleen "€ 19,99 bij bol" zonder "indicatief" en zonder datum; dat staat live op homepage, gidsen en /cadeaus. De gidsteksten beweren "we tonen altijd de datum waarop we de prijs hebben gecontroleerd" (`lib/guides.ts` r. 90, 133, 179) — op de kaart is dat niet zo. Er is **geen automatische controle op 48 uur**: `lib/catalog.ts` filtert alleen op status; alle 44 actieve producten hebben `priceCheckedAt: "2026-11-17"` en zijn vanaf 19-11 te oud. | Developer: op de kaart "indicatief · gecontroleerd {datum}" tonen (of prijs verbergen); in `getProducts()` actieve producten met `priceCheckedAt` ouder dan 48 uur niet tonen of de prijs weglaten. Catalogus: dagelijkse prijscontrole. Geen juridische tekst, dus geen akkoord nodig. |
| 6 | Geen suggestie dat wij de verkoper zijn | OK | Knoptekst "Bekijk bij {winkel}", tekst "Je bestelt en betaalt bij {winkel}", /voorwaarden art. 2 "Wij verkopen zelf niets … wij zijn geen partij bij die koop". JSON-LD noemt de winkel als `seller`. | Zie punt 2 en 3 (twee tekstjes die nog naar "zelf verkopen" ruiken). |

## Prijzen & claims

| # | Punt | Status | Onderbouwing / bewijs | Fix |
|---|---|---|---|---|
| 7 | **[blokkerend]** Prijzen incl. btw; verzendkosten vóór checkout | OK | Footer: "Alle prijzen zijn inclusief btw." Productpagina: "incl. btw". `priceCents` is incl. btw (`lib/types.ts` r. 74). Verzendkosten-vóór-checkout is N.V.T. (geen eigen checkout). | Advies, niet blokkerend: bij de prijs "excl. eventuele verzendkosten van de winkel" vermelden; de gids "onder €15" waarschuwt al voor verzendkosten (`lib/guides.ts` r. 94). Bij twijfel jurist (vraag in `ops/vragen-eigenaar.md`). Meegenomen in akkoordverzoek affiliate-teksten. |
| 8 | Geen "nog maar X", afteltimers, valse urgentie | OK | Geen voorraadclaims of timers gevonden (grep op uitverkocht/op=op/laatste kans/aanbieding). `components/DaysLeft.tsx` telt dagen tot de echte datum (5 dec) en verdwijnt daarna; topbalk noemt een berekende datum. | Let op na 2 dec: topbalk (`components/Header.tsx` r. 14–21) en kaarten zonder bezorgdata ("Op tijd voor Sint: bestel t/m …") blijven een verstreken datum tonen. Developer: na de deadline verbergen of omschakelen naar kerst. |
| 9 | Geen nepreviews; scores alleen met bron en aantal | **NIET OK** | Beoordelingen: OK — "Beoordeling bij bol.com productpagina (gezien tijdens scouting): 4,5 / 5 (1395 reviews)" (`app/(shop)/cadeau/[slug]/page.tsx` r. 126–130). Maar homepage-kop **"Veelgekozen dit jaar"** (`app/(shop)/page.tsx` r. 81) is een populariteitsclaim zonder data; de selectie is de top 8 op interne scout-score (`lib/catalog.ts` r. 46). Misleidend in de zin van art. 6:193c BW. Kleiner: "Het bekendste strategiespel van Nederland" (CATAN, `data/products.json`) zonder bron. | Developer/SEO: kop wijzigen in bv. "Onze favorieten" of "Uitgelicht". CATAN-tekst neutraler ("Een klassiek strategiespel"). Ratings: datum van aflezen toevoegen (bv. "gezien op 17-11"). |
| 10 | Kortingen: vergelijkingsprijs = laagste 30 dagen; alleen met akkoord | OK | Geen was-prijzen of kortingen in code of data (`lib/types.ts` heeft geen vergelijkingsprijs-veld); live geen kortingen gezien. | — |
| 11 | Levertijd en "bestel uiterlijk" kloppen met `lib/deadlines.ts` | **NIET OK** | Berekening klopt: productpagina, kaarten en topbalk gebruiken `lastOrderDate()`; live "Bestel t/m woensdag 2 december" bij 1 werkdag = correct (4 dec, 1 dag buffer). `/cadeaus` gebruikt `estimate()` (zelfde werkdagen + buffer). Maar: homepage (`app/(shop)/page.tsx` r. 44) zegt "We kijken per cadeau naar de bezorgdatum **die de winkel belooft**", terwijl de bol-API nog geen sleutels heeft (activity 18-11 00:20) en live overal "verwacht uiterlijk" (eigen schatting) staat. Ook kan de productpagina (schatting) afwijken van de kaart (bol-belofte) zodra de API actief is. | Developer: tekst conditioneel maken ("…de bezorgdatum die de winkel belooft, of anders onze schatting met een dag marge"), en productpagina dezelfde bron laten gebruiken als de kaart. Zie ook punt 8 (verstreken datums). |

## Dropship / koop op afstand (zodra checkout live)

| # | Punt | Status | Onderbouwing |
|---|---|---|---|
| 12 | **[blokkerend]** Algemene voorwaarden vóór bestelling | N.V.T. | Geen eigen verkoop (keuze eigenaar 17-11). Gebruiksvoorwaarden staan wel online. |
| 13 | **[blokkerend]** Herroepingsrecht + modelformulier | N.V.T. | Idem; herroeping loopt via de winkel. |
| 14 | **[blokkerend]** Knop "Bestelling met betalingsverplichting" | N.V.T. | Geen checkout. |
| 15 | Orderbevestiging per e-mail | N.V.T. | Geen orders. |
| 16 | Wettelijke garantie vermeld | N.V.T. | Verwijzing naar winkel staat op productpagina en /contact. |
| 17 | Retouradres en retourkosten | N.V.T. | Retour via winkel. |

## Privacy & cookies

| # | Punt | Status | Onderbouwing / bewijs | Fix |
|---|---|---|---|---|
| 18 | **[blokkerend]** Geen analytics/marketing vóór toestemming | OK | `components/CookieConsent.tsx` r. 107–133: scripts van Google/Meta/Pinterest worden pas via `addScript()` geladen na `consent.analytics` / `consent.marketing`; zonder ID's laadt niets. `app/layout.tsx` bevat geen tags. Netwerkcheck kon ik met WebFetch niet live herhalen (geen browser); de lokale test van de Developer (17-11) staat in de checklist. ID's zijn volgens `ops/status/agents.json` nog niet ingesteld. | **Herhalen met echte ID's zodra ze in Vercel staan, vóór de eerste advertentie.** |
| 19 | Cookiebanner: weigeren even makkelijk, geen vooraf aangevinkt, later wijzigbaar | OK | "Alleen noodzakelijk" en "Alles accepteren" zelfde stijl en niveau (r. 210–216); vinkjes standaard `false` (r. 141–142); "Cookie-instellingen" in footer (`components/Footer.tsx` r. 41) en op /cookies. | — |
| 20 | Consent Mode v2 default `denied` | OK | `CookieConsent.tsx` r. 41–46: alle vier signalen `denied` vóór `update`. | — |
| 21 | Privacyverklaring compleet | **NIET OK** | `app/(shop)/(juridisch)/privacy/page.tsx`: verantwoordelijke, doelen, bewaartermijnen (logs 30 dgn, contact 1 jr), Vercel/Supabase/Google/Meta/Pinterest, doorgifte buiten EER, rechten en AP-klacht staan erin. Ontbreekt: grondslag bij **contact** en **klikregistratie** (r. 20–21), bewaartermijn klikregistratie, verwijzing naar /cookies voor cookietermijnen, en dat **affiliate-netwerken/winkels (bol partnerprogramma, later Amazon/Awin)** bij doorklikken eigen verwerkingsverantwoordelijke zijn. Mollie/Resend uit de checklist zijn N.V.T. (geen checkout/mail) en staan terecht niet genoemd. | Aanvullingen in `ops/approvals/2026-11-17-compliance-privacyverklaring.md`. |
| 22 | Verwerkersovereenkomsten (eigenaar) | **NIET OK** | Geen bewijs in `ops/` dat de DPA's van Vercel en Supabase zijn geaccepteerd. Privacyverklaring zegt "sluiten we waar nodig verwerkersovereenkomsten". | Eigenaar: DPA van Vercel en Supabase accepteren/downloaden (zit in hun voorwaarden of dashboard) en vastleggen in `ops/decisions.md`. Vraag toegevoegd aan `ops/vragen-eigenaar.md`. |
| 23 | Formulieren vragen alleen noodzakelijke gegevens | OK | Geen formulieren met persoonsgegevens: alleen datumkiezer (homepage), filters en cadeauzoeker. /contact heeft geen formulier (live bevestigd). | — |

## Reclame

| # | Punt | Status | Onderbouwing |
|---|---|---|---|
| 24 | Advertenties herkenbaar; Reclamecode; kinderen < 12 | N.V.T. | Nog geen advertenties (`ops/ads/drafts/` leeg, advertentie-maker inactief). Site-content: de gids "kinderen 8–12" richt zich op ouders, niet direct op kinderen — in orde. Toets bij eerste advertentie. |
| 25 | Platformregels Google/Meta/Pinterest/TikTok | N.V.T. | Geen campagnes. Let bij eerste campagne op punt 9 ("Veelgekozen") en punt 11 (bezorgclaim): misleidende claims zijn ook in strijd met Google Ads/Meta-beleid. |

## Toegankelijkheid & techniek

| # | Punt | Status | Onderbouwing / bewijs | Fix |
|---|---|---|---|---|
| 26 | Alt-teksten, labels, contrast AA, toetsenbord | OK (codecheck) | `ProductArt` krijgt `alt={product.title}` bij echte foto's, illustraties zijn `aria-hidden` met de titel als tekst ernaast; skiplink "Naar inhoud" (`app/layout.tsx`); formulierlabels aanwezig; cookiebanner is `role="dialog"` met knoppen. Contrast niet gemeten (geen browsertool). | QA: contrastmeting (o.a. `text-muted` op `cream`) bij de volgende QA-ronde. |
| 27 | HTTPS, geen gemengde content | OK | Live via https; geen `http://`-verwijzingen in app/, components/ of `data/products.json`. | — |

---

## Overige bevindingen (buiten de checklist)

- **Handelsnaam:** footer noemt "Omega Ksi", voorwaarden zeggen "handelend onder de naam OpTijdCadeau". Controleer of OpTijdCadeau als handelsnaam bij de KvK staat (Handelsnaamwet/Handelsregisterwet). Vraag aan eigenaar.
- **Amazon:** 8 Amazon-producten staan op concept/gepauzeerd. Bij activering met een Amazon-tag is de vaste Amazon-disclosurezin verplicht (Amazon Associates Operating Agreement).
- **Concept-producten in preview** tonen het label "concept" en "nog niet gecontroleerd" en hebben geen JSON-LD-prijs; in productie worden ze niet geladen (`lib/catalog.ts` r. 9). In orde.

## Akkoordverzoeken aangemaakt

1. `ops/approvals/2026-11-17-compliance-bedrijfsgegevens.md` — postcode in adres (blokkerend).
2. `ops/approvals/2026-11-17-compliance-privacyverklaring.md` — aanvullingen privacyverklaring.
3. `ops/approvals/2026-11-17-compliance-affiliate-teksten.md` — "wij verkopen zelf niets" overal consequent, verzendkosten-zin, Amazon-zin (bij activering).

Niet-juridische fixes (punten 5, 8, 9, 11, 26) zijn voor Developer / Catalogus / SEO-content en vragen geen akkoord-protocol.

**COMPLIANCE: BLOCK** — opheffen zodra de postcode in het adres staat (punt 1). De overige NIET OK-punten blokkeren niet, maar punt 5 (48-uurregel) moet vóór 19-11 opgelost zijn of de prijzen moeten opnieuw gecontroleerd worden.
