# Advertentie-testkader (vastgelegd 17 nov 2026 — niet achteraf wijzigen)

Wijzigingen aan dit kader alleen met akkoord eigenaar en een regel in `ops/decisions.md`.

## Budget (max €500 totaal, 17 nov – 24 dec)

| Kanaal | Aandeel | Budget |
|---|---|---|
| Google Shopping/Search | 40% | €200 |
| Meta (Instagram/Facebook) | 35% | €175 |
| Pinterest | 15% | €75 |
| Reserve (naar best presterend kanaal) | 10% | €50 |

Organisch (gratis): TikTok, Instagram, Pinterest.

## Elk experiment heeft vooraf
hypothese · variant · kanaal · doelgroep · landingspagina/product · budget · start/eind · succescriterium · **verwachte marge (dropship) of verwachte commissie per klik (affiliate)**.

Verwachte commissie per klik (affiliate) = gem. orderwaarde × commissie% × conversieratio bij winkel. Startaanname tot er data is: conversie 3% (Bol/Amazon), 1,5% (overig). Herzien zodra ≥ 200 uitgaande klikken per winkel.

## Beoordelingsregels (in deze volgorde)

1. **Minimumdrempel**: geen oordeel vóór **€15 besteed** óf **1.000 vertoningen** (wat eerst komt). Daarvoor: "te vroeg — doorlopen".
2. **Stoppen** als na de drempel:
   - CTR < 0,8%, of
   - CPA > verwachte marge per order (dropship), of
   - kosten per affiliate-klik > verwachte commissie per klik.
3. **Opschalen** (max **+30% per dag**, binnen kanaalbudget + reserve) als:
   - dropship: ROAS ≥ 2,5, of
   - affiliate: kosten per uitgaande klik < 50% van verwachte commissie per klik.
4. **Aanpassen** (nieuwe variant, zelfde budget) in alle andere gevallen na 2× de drempel.
5. Kanalen vergelijken op **winst na advertentiekosten**, niet op klikken of CTR.

## Deadlines
- Advertenties met "op tijd voor Sinterklaas" stoppen automatisch op de laatste besteldatum van het getoonde product (uiterlijk 3 dec).
- Kerst-advertenties idem, uiterlijk 22 dec.

## Rapportage
Dagelijks `ops/reports/ads-<datum>.md`, wekelijks (maandag) `ops/reports/kanalen-week-<nr>.md`.
