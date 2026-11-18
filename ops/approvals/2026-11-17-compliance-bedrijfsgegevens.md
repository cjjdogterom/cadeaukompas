# Akkoord gevraagd: postcode toevoegen aan het bedrijfsadres

Status: AFGEHANDELD (adres met postcode door eigenaar opgegeven 17-11, staat in lib/site.ts; handelsnaam bij KvK staat nog open in owner-todo 1b)
Datum: 2026-11-17 · Agent: Compliance · Code: `lib/site.ts` (regel 11, `company.address`) · Rapport: `ops/compliance/2026-11-17-eerste-toetsing.md` punt 1

## Wat
Het vestigingsadres op de site is nu "Oude Delft 35, Delft", zonder postcode. Voorstel: in `lib/site.ts` het adres aanvullen tot "Oude Delft 35, <postcode> Delft". Dat ene veld vult de footer, /contact, /privacy en /voorwaarden.

Daarnaast een controlevraag: staat "OpTijdCadeau" als handelsnaam bij jouw KvK-inschrijving (90505611)? De voorwaarden zeggen "handelend onder de naam OpTijdCadeau". Zo niet, dan kun je die handelsnaam gratis toevoegen via KvK.

## Waarom
Art. 3:15d BW en de Handelsregisterwet vragen een volledig, vindbaar vestigingsadres op de website. Het staat op de checklist als **blokkerend** punt; de site is nu al live met het onvolledige adres.

## Kosten
Geen (handelsnaam toevoegen bij KvK: gratis).

## Verwacht resultaat
Blokkerend checklistpunt opgelost; compliance-oordeel van BLOCK naar GO (andere punten blokkeren niet).

## Alternatief
Een ander (zakelijk) adres gebruiken als je je woonadres niet op de site wilt; dat moet dan wel het adres zijn dat bij KvK als vestigingsadres staat.

## Akkoord geven
Geef de postcode door en zeg "akkoord adres" (of zet hierboven `Status: AKKOORD`). De Developer past daarna alleen `lib/site.ts` aan.
