# Dropship-productideeën kerst 2026 + stappenplan — 17 nov 2026

Auteur: Leverancier-agent. Alleen openbare pagina's gelezen; niet aangemeld, niets verstuurd. **Niet in `data/products.json` gezet**: prijzen en marges vergen akkoord van de eigenaar. Onbekend = "onbekend, navragen".

## Stappenplan voor de eigenaar: dropship live rond ma 7 december

Kritieke datum: **uiterlijk vr 4 dec moet leverancierscontract + eerste producten + testorder rond zijn**, anders is de livegang op 7 dec niet haalbaar. De laatste kerst-besteldatum voor klanten ligt rond **wo 16–do 17 dec** (aanname uit eerdere research: 1–3 werkdagen + 1 dag buffer; geen leverancier heeft een officiële kerst-bestelstop gepubliceerd).

Tijdsduren van KvK/Belastingdienst/Mollie zijn onbekend, navragen; het schema is een aanname.

| Dag | Wat |
|---|---|
| **Di 17 nov (vandaag)** | KvK-inschrijving online starten (KvK-nummer volgt volgens eerdere research direct bij geslaagde inschrijving; bron: kvk.nl, navragen). Beslis rechtsvorm (bijv. eenmanszaak). Concept-mails nalezen; mail naar de 3 leveranciers kan al vandaag/morgen, ook zonder KvK, met expliciete vraag of oriënteren kan. |
| **Wo 18 nov** | Mails versturen (zie `ops/research/leveranciers-mails-2026-11-17.md`). Btw-id bij Belastingdienst regelen/volgen (duur onbekend, navragen). Mollie-verificatie starten (duur onbekend). Zakelijke bankrekening/e-mail op naam van bedrijf. |
| **Do 19–vr 20 nov** | Antwoorden verzamelen. Check per leverancier: verzendkosten, retour, blind shipping, kerst-bestelstop, KvK-eis. Telefonisch nabellen bij geen antwoord (SpeelgoedFamilie 024 2600 209). Retouradres NL vastleggen (eigen adres of leverancier). |
| **Ma 23–vr 27 nov** | Met KvK + btw-id: aanmelden bij Andriez (gratis) en SpeelgoedFamilie/Basetoys (zelf indienen, approvals `ops/approvals/2026-11-17-leverancier-*.md` op AKKOORD zetten); voorwaarden zelf lezen en accepteren; Gelato-account. Dit kan niet vóór KvK als de leverancier KvK eist. |
| **Ma 30 nov–wo 2 dec** | Inkoopprijzen en voorwaarden in hand: eigenaar keurt verkoopprijzen/marges goed (approval), Compliance checkt herroeping/retourtekst, Catalogus-agent maakt records in `suppliers` en `products` (status concept). |
| **Wo 2–vr 4 dec** | **Testorder**: zelf bestellen via de site of bij leverancier, controleren: neutrale verpakking, levertijd, factuur ontbreekt, retourprocedure. Contract/voorwaarden definitief. Producten klaarzetten. |
| **Ma 7 dec** | Eerste 5–15 producten live (alleen producten met bevestigde voorraad en margin). Levertijd op productpagina's: realistisch en met piekmarge. |
| **Vr 11–do 17 dec** | Bestelstop-banner: laatste besteldatum per leverancier bevestigen (onbekend, navragen) en op de site tonen. |
| **Do 24 dec** | Bezorgd uiterlijk. |

Laatste besteldatum voor kerst per leverancier (nergens openbaar 2026-datum gevonden):
- **Andriez:** onbekend, navragen (site: "vandaag besteld, morgen verzonden"; 1–3 werkdagen).
- **SpeelgoedFamilie/Basetoys:** onbekend, navragen (site: 98% op voorraad, binnen 24 uur verzonden, geen kerst-cutoff vermeld).
- **Gelato:** onbekend, navragen. Dutch deadline-pagina toont 2025; webpagina gaf 403 bij ophalen. Controleer https://www.gelato.com/nl/order-deadlines na inloggen.
- Eigen rekenregel (aanname): bezorging uiterlijk 24 dec, minus 3 werkdagen levertijd en 1 dag buffer = bestellen uiterlijk wo 16 dec; voor personalisatie eerder (waarschijnlijk ma 14 dec, aanname).

## Productideeën

Prijzen: kolom "Inkoop" is zo getoond op de openbare pagina. **Andriez toont prijzen openbaar** (zonder login, correctie op eerdere aanname "na login"), maar de pagina vermeldt niet of deze prijzen inclusief of exclusief btw zijn en of dit de dropship-inkoopprijs is: onbekend, navragen (mail vraag 9). Prijzen bij SpeelgoedFamilie zijn consumentenprijzen incl. btw volgens de dropshippagina; dropship-inkoop via basetoys.nl: "na login". Adviesverkoopprijs: nergens zichtbaar behalve SpeelgoedFamilie-consumentenprijs; eigen verkoopprijs bepaalt de eigenaar. Levertijd = door leverancier gepubliceerde levertijd (geen gegarandeerde piekcijfers; reken 30-50% extra in december, bron Copyfy).

| # | Product | Doelgroep | Leverancier | URL | Getoonde prijs | Adviesverkoop | Levertijd | Personalisatie |
|---|---|---|---|---|---|---|---|---|
| 1 | Cassette Recorder Speler Wit (retro) | muziekliefhebber/vader | Andriez | https://groothandel.andriez.com/product/cassette-recorder-speler-wit-cassetterecorder-bandrecorder/ | €36,21 (ex/incl btw onbekend) | onbekend | 1–3 werkdagen (voorraad) | nee |
| 2 | Draagbare CD Speler Wit USB | nostalgie / tieners | Andriez | https://groothandel.andriez.com/product/draagbare-cd-speler-kinderen-volwassene-wit-usb/ | €34,00 | onbekend | 1–3 werkdagen | nee |
| 3 | Beginners Gips Mierenboerderij (Antfarm) | kinderen/natuur | Andriez | https://groothandel.andriez.com/product/beginners-gips-boerderij-mierenboerderij-mierennest/ | €21,43 | onbekend | 1–3 werkdagen | nee; levend materiaal (mieren) apart navragen |
| 4 | Button Maker Machine 58mm set | creatief/hobby | Andriez | https://groothandel.andriez.com/product/button-maker-machine-58mm-buttons-zelf-maken-set-groen/ | €42,87 | onbekend | 1–3 werkdagen | nee (klant maakt zelf) |
| 5 | Coin Pusher / Muntenschuiver | gamers/kinderen | Andriez | https://groothandel.andriez.com/product/coin-pusher-muntenschuiver-coin-pusher/ | €42,00 | onbekend | 1–3 werkdagen | nee |
| 6 | Cluedo kinderspel | gezin/kind | Andriez | https://groothandel.andriez.com/product/cluedo-kinderspel-bordspel/ | €33,80 | onbekend | 1–3 werkdagen | nee (merkproduct, marge mogelijk krap) |
| 7 | Set 4 Harry Potter speelkaarten | fans | Andriez | https://groothandel.andriez.com/product/set-van-4-harry-potter-speelkaarten-kaartspel/ | €46,00 | onbekend | 1–3 werkdagen | nee (licentiemerk, navragen) |
| 8 | Pluche hondenmand/kattenmand 50 cm roze | huisdiereigenaar | Andriez | https://groothandel.andriez.com/product/50cm-pluche-hondenmand-kattenmand-fluffy-roze/ | €20,10 | onbekend | 1–3 werkdagen | nee |
| 9 | Picknickkleed 130x180 Vintage | wonen/outdoor | Andriez | https://groothandel.andriez.com/product/130-bij-180cm-modern-vintage-stoffen-picknickkleed-kleed-voor-picknick-picknickdeken/ | €23,65 | onbekend | 1–3 werkdagen | nee (seizoen: eerder lente) |
| 10 | Ramses (Ravensburger bordspel) | gezin 7+ | SpeelgoedFamilie | https://speelgoedfamilie.nl/spellen-en-puzzels/bordspel/ramses-58639 | €29,99 consument | €29,99 (consumentenprijs op site) | verzending binnen 24u indien op voorraad | nee |
| 11 | Carcassonne (999 Games) | spelers 7+ | SpeelgoedFamilie | https://speelgoedfamilie.nl/spellen-en-puzzels/bordspel/carcassonne-45034 | €29,99 consument | €29,99 | idem | nee |
| 12 | Barricade Classic (Ravensburger) | gezin | SpeelgoedFamilie | https://speelgoedfamilie.nl/spellen-en-puzzels/bordspel/barricade-classic-183262 | €18,99 consument | €18,99 | idem | nee |
| 13 | Qwirkle Reiseditie (999 Games) | reizigers/spelers 8+ | SpeelgoedFamilie | https://speelgoedfamilie.nl/spellen-en-puzzels/bordspel/qwirkle-reiseditie-13537 | €15,99 consument | €15,99 | idem | nee |
| 14 | Gepersonaliseerde mok (naam/foto/tekst) | voor iedereen, kerstcadeau | Gelato (POD) | https://www.gelato.com/nl/christmas-gifts (403 bij ophalen; assortiment uit zoekresultaat) | na login/onbekend | onbekend | 2–3 dagen NL gemiddeld (Gelato, niet bevestigd voor december) | **ja**: gepersonaliseerd = doorgaans uitgezonderd herroeping (Compliance moet verifiëren) |
| 15 | Gepersonaliseerde poster/kaart | partners/ouders | Gelato (POD) | https://www.gelato.com/nl/print-on-demand/nederland | na login/onbekend | onbekend | idem | **ja**, idem |

Opmerkingen bij de lijst:
- #10–13: bij SpeelgoedFamilie is niet bevestigd dat deze specifieke artikelen op de dropshiplijst staan (die loopt via basetoys.nl, niet bereikbaar bij check). Navragen. Consumentenprijzen laten weinig marge zien voor dropship: inkoopprijs moet na login worden bekeken.
- #1–9 Andriez: prijzen zijn waarschijnlijk groothandel/inkoop. Als een product €36 inkoop is, past het niet in de range €15–60 verkoop met marge. Producten #2, #3, #8, #9 hebben de meeste marge-ruimte onder €60. Prijs, btw-status en margins na akkoord door de eigenaar.
- Andriez-assortiment bevat veel generieke/no-name artikelen en merkproducten (Cluedo, LEGO, Harry Potter): merkartikelen hebben vaak lage marge; check GPSR/CE.
- Dit zijn ideeën uit openbare pagina's, geen aanbeveling zonder bevestigde voorwaarden.

## Top 3 om eerst te onderzoeken (als voorwaarden kloppen)
1. **Draagbare CD-speler wit (Andriez, €34,00)** en/of **Cassette recorder wit (€36,21)**: duidelijk cadeau, retro-trend, prijs getoond, 1–3 werkdagen. Controleer btw-status en elektronica-compliance (CE/WEEE/garantie).
2. **Ramses of Carcassonne (SpeelgoedFamilie, €29,99)**: bewezen merk, neutrale verzending toegezegd; marge pas na login bekend.
3. **Gepersonaliseerde mok (Gelato)**: sterkste cadeau-fit en lokale productie, maar prijs/deadline/herroeping onbekend. Pas live als Gelato de kerst-bestelstop bevestigt.

## Bronnen
- Andriez dropship-pagina: https://groothandel.andriez.com/dropshipping-leveranciers/
- Andriez categorieën (prijzen openbaar): https://groothandel.andriez.com/product-categorie/computer-en-elektronica/ · /vrije-tijd/ (gesorteerd op prijs) · /dieren/ · /huis/
- SpeelgoedFamilie dropshippagina: https://speelgoedfamilie.nl/info/reseller-of-dropshipper-worden-van-speelgoedfamilienl · zoekresultaten bordspellen: https://speelgoedfamilie.nl/spellen-en-puzzels
- Gelato: https://www.gelato.com/nl/order-deadlines (2025-versie, 403 bij ophalen) · https://www.gelato.com/nl/print-on-demand/nederland
- Voorgaande research: `ops/research/leveranciers-2026-11-17.md`
