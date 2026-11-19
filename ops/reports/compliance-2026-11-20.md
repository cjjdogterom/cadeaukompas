# Compliance — gidsen 18/19-11 en productteksten 19-11 (20-11-2026)

Agent: Compliance · Werkkopie `main` (commit 1180aa6, schoon) · Kader: `ops/compliance-checklist.md` (alleen affiliate) en de hertoets van 18-11 (`ops/compliance/2026-11-18-hertoets.md`).
Dit is geen formeel juridisch advies. Ik heb alleen gelezen. Er zijn geen site-teksten, productdata, juridische pagina's of statusbestanden gewijzigd.

## Wat is getoetst

**Gidsen (26)**, alle in `lib/guides.ts`, gepubliceerd op 18-11 en 19-11 volgens `ops/activity.jsonl` r. 75–149:
- 18-11 (17): sinterklaascadeau-baby-peuter, cadeau-kinderen-4-7-jaar, cadeau-vader-klussen-gereedschap, gamecadeau-tiener-13-17, puzzel-en-spelcadeau-oma-opa, sportcadeau-voor-volwassenen, cadeau-voor-wie-graag-kookt, cadeau-thuiswerker-50-100-euro, muziekcadeau, cadeau-voor-fijnproevers, sinterklaascadeau-jongens-8-12, creatief-cadeau, cadeau-voor-lezers, verwencadeau-voor-haar, kerstcadeau-onder-50-euro, cadeau-voor-een-vriend, cadeau-voor-wie-alles-heeft.
- 19-11 (9): sinterklaascadeau-meisjes-8-12, techcadeau, kerstcadeau-voor-moeder-onder-50, kerstcadeau-vanaf-100-euro, cadeau-partner-50-100-euro, spelcadeau-bord-en-kaartspellen, cadeau-partner-boven-100-euro, kerstcadeau-voor-tiener, sinterklaascadeau-voor-vader.
- Ook gekeken naar de weergave: `app/(shop)/gids/[slug]/page.tsx`, `components/ProductCard.tsx`, `components/PriceTag.tsx`, `components/CardDeadline.tsx`, `components/BudgetNote.tsx`.

**Producten.** 999 producten hebben `status: actief` en `priceCheckedAt: 2026-11-19`.
- Steekproef: 70 actieve producten handmatig gelezen (short en description, plus leeftijd, rating en notities waar nodig). Dat zijn blokken uit het begin, midden en eind van `data/products.json`: r. 3998–4358, 9179–9577, 23636–24117, 29337–29737, 34477–34818, 36167–36654, 47857–48318 en 51192–51582.
- Daarnaast heb ik alle 999 gescand op trefwoorden voor superlatieven, gezondheid, schaarste, korting/deal/adviesprijs, reviews/populariteit, garantie, leeftijd (3+ in 0–3), PEGI, alcohol, messen/wapens en cadeaukaarten.

## Samenvatting

| Ernst | Aantal bevindingen | Betrokken actieve producten / gidsen |
|---|---|---|
| Blokkerend | 3 | 25 actieve producten (plus 3 concepten vóór activeren) |
| Advies | 15 | 8 gidsen, ongeveer 35 producten |

**Wat goed is**
- **Gidsen:** geen superlatieven, geen nepschaarste, geen verzonnen reviews. Overal staat "wij verkopen niets / je bestelt bij de winkel". Bij games wordt PEGI uitgelegd en bij speelgoed wordt steeds naar de leeftijd op de verpakking verwezen. De meisjesgids is bewust genderneutraal.
- **Prijsbelofte in gidsen klopt nu:** de belofte "we tonen de datum waarop we de prijs hebben gecontroleerd" (o.a. `lib/guides.ts` r. 225, 340, 364, 387, 435) wordt nu waargemaakt. Kaarten tonen "indicatief, gecontroleerd {datum}" en verbergen de prijs na 48 uur (`components/PriceTag.tsx` r. 8–21). Punt 5 van de hertoets van 18-11 is daarmee opgelost voor de kaarten.
- **Alleen bol:** geen actief product van een andere winkel. Alle Amazon-, Coolblue- en HEMA-records staan op concept of gepauzeerd.
- **Geen ongepaste producten:** geen alcohol, messen of wapens en geen cadeaukaarten in de actieve catalogus. Wel aanwezig: een kaasschaaf, snoeischaren, laserafstandsmeters (meetgereedschap) en Nerf-speelgoed met leeftijd 8+. Dat is in orde.
- **Prijsclaim klopt:** "Narcis, winnaar van de NS Publieksprijs 2026" (`judith-fanto-narcis`) is juist (DutchNews, nov. 2026).

---

## Blokkerende bevindingen

### B1. Korting-, deal- en adviesprijsclaims in productteksten
**Checklistregel:** Prijzen & claims: "Kortingen: vergelijkingsprijs = laagste prijs laatste 30 dagen (Omnibus); kortingen alleen met akkoord eigenaar". Kader: Wet oneerlijke handelspraktijken (misleidende prijs- en was-prijsclaims), art. 6:193c BW.
**Waarom blokkerend:** er is geen akkoord van de eigenaar voor kortingsclaims. De site kan de 30-dagenprijs niet tonen. De teksten zijn statisch, terwijl de Black Friday-prijzen tijdelijk zijn, dus de claim wordt vanzelf onwaar terwijl de tekst blijft staan.

| Slug (status) | Citaat | Voorgestelde tekst |
|---|---|---|
| `babyliss-smooth-pro-235-stijltang-st394e` (actief, r. 22636) | "Een goed beoordeelde tang voor alle haartypes, nu met flinke korting." | "Een tang voor alle haartypes." |
| `sony-wf-1000xm5-oordopjes-roze` (actief, r. 30713) | short: "…met sterke ruisonderdrukking, nu met bol-korting." | short: "Kleine draadloze oordopjes met ruisonderdrukking." Ook "zitten in de topklasse van Sony" (r. 30714) wordt "het topmodel oordopjes van Sony". |
| `lego-icons-ford-model-t-11376` (actief, r. 51548) | "De prijs is momenteel een dagdeal." | Zin schrappen. |
| `sami-tamimi-boustany` (actief, r. 45785) | "De bol-prijs ligt nu onder de adviesprijs." | Zin schrappen. |
| `freddie-mercury-a-life-in-lyrics-engels` (actief, r. 46323) | "De bol-prijs ligt nu duidelijk onder de adviesprijs." | Zin schrappen. |
| `sony-ps-lx5bt-premium-platenspeler` (actief, r. 47058) | "De prijs ligt nu onder de adviesprijs van Sony." | Zin schrappen. |
| `theo-of-golden-allen-levi` (actief, r. 18583) | "Er zijn nog weinig reviews, de prijs is nu gunstig." | Zin schrappen. |
| Concept, vóór activeren: `jbl-charge-essential-3-…` (r. 40982), `kitchenaid-artisan-5ksm95psebm-mat-zwart` (r. 47107) | "nu met Black Friday-korting"; "ligt onder de adviesprijs van 399 euro" | Schrappen. |

**Fix (Catalogus):** in short en description nooit "korting", "deal", "dagdeal", "Black Friday", "adviesprijs" of "nu gunstig" gebruiken. Die informatie hoort alleen in `scout.notes`, die niet publiek is.

### B2. Voorraad- en schaarsteclaims ("voorraad bijna op")
**Checklistregel:** "Geen 'nog maar X op voorraad', afteltimers of valse urgentie". Kader: misleidende urgentie (art. 6:193c/6:193g BW).
**Waarom blokkerend:** dit zijn letterlijk voorraadclaims. Ze waren op 18/19-11 bij bol te zien, maar we kunnen ze niet actueel houden.

| Slug (actief) | Citaat | Voorgestelde tekst |
|---|---|---|
| `stanley-fatmax-rolbandmaat-8-meter-magnetisch` (r. 47558) | "Let op: de voorraad bij deze verkoper was bijna op." | Zin schrappen. |
| `micro-mini-micro-deluxe-magic-step-aqua` (r. 48995) | "Bij bol is de voorraad bijna op." | Zin schrappen. |
| `micro-maxi-micro-deluxe-flux-led-step-zwart` (r. 49038) | "Voorraad bij bol is bijna op." | Zin schrappen. |
| `hape-grand-city-station-houten-treinstation` (r. 49176) | "Voorraad bij bol is bijna op." | Zin schrappen (zie ook A11). |
| `hape-grote-dubbele-hangbrug` (r. 49267) | "Voorraad bij bol is bijna op." | Zin schrappen. |
| `ugears-houten-3d-model-pickup-lumberjack` (r. 51736) | "De voorraad bij deze verkoper is bijna op." | Zin schrappen. |
| Concept: `kitchenaid-artisan-…` (r. 47107) | "Op de pagina staat dat de voorraad bijna op is" | Schrappen vóór activeren. |

### B3. Speelgoed "vanaf 3 jaar" in de leeftijdsgroep 0–3 (baby- en peutergids)
**Checklistregel:** de checklist heeft nog geen regel voor leeftijdsadvies (zie voorstel onderaan). Kader: Reclamecode (zorgvuldigheid bij kinderen) en misleidende informatie over essentiële kenmerken (art. 6:193c/d BW). Speelgoed met "3+" draagt meestal de waarschuwing "niet geschikt voor kinderen onder 36 maanden" (kleine onderdelen, verstikkingsgevaar; Speelgoedrichtlijn/EN 71).
**Waarom blokkerend:** de gids `sinterklaascadeau-baby-peuter` belooft "speelgoed dat veilig is" en "kleine onderdelen zijn niet geschikt" (`lib/guides.ts` r. 224–225). Toch komen deze producten door `ageGroups: ["0-3", …]` in die gids terecht (`gids/[slug]/page.tsx` r. 30), en de kaart toont alleen de short, zonder leeftijd.

Actieve producten waarvan de eigen tekst "vanaf 3 jaar" zegt en die in 0–3 staan:
`nijntje-muziekset-tamboerijn-trommel` (r. 27659), `brio-centraal-stationset-33989` (r. 45252), `brio-treinbaan-starterset-22-delig` (r. 45301), `bluey-speelhuis-4-kamers` (r. 45345), `bluey-supermarkt-speelset` (r. 45391), `brio-trein-van-de-brandweer-33844` (r. 48477), `brio-trein-met-boerderijdieren-33404` (r. 48524), `brio-magnetische-spoorwegovergang-33750` (r. 48571), `brio-world-bluey-treinset` (r. 48665), `hape-houten-treinset-50-delig-emmer` (r. 49128), `hape-licht-en-geluid-bergtunnel` (r. 49219), `hape-grote-dubbele-hangbrug` (r. 49267).
Nog te controleren (staan in 0–3 zonder leeftijd in de tekst, BRIO is meestal 3+): `brio-treinset-met-boerderij-33719`, `brio-rode-passagierstrein-33505`.

**Fix (Catalogus):** kies per product één van twee:
- (a) "0-3" uit `ageGroups` halen en "4-7" laten staan. Dit is de voorkeur, want de gids heet "baby en peuter".
- (b) "0-3" laten staan en de short beginnen met de leeftijd, bijvoorbeeld: "Vanaf 3 jaar (niet voor kinderen onder 3): houten treinset met …".

Optioneel voor Developer: toon op kaarten in de 0–3-gids een leeftijdslabel.

---

## Adviesbevindingen

**A1. Gidsen beloven "alleen cadeaus die op tijd komen", maar de code filtert daar niet op.**
`gids/[slug]/page.tsx` r. 25 en 33 filtert alleen op het gelegenheid-label (`occasions`), niet op de deadline. De pagina is statisch. Alleen de besteldatum op de kaart verdwijnt na de deadline (`CardDeadline.tsx`).
Regel: "Levertijd en 'bestel uiterlijk'-datum kloppen".
- `sinterklaascadeau-voor-vader`, FAQ r. 843: "…en toont alleen cadeaus die daarvoor nog op tijd komen." Voorstel: "Deze gids rekent met pakjesavond op 5 december. Bij elk cadeau zie je tot wanneer je kunt bestellen; staat er geen datum meer, dan komt het niet meer op tijd voor Sinterklaas."
- `kerstcadeau-voor-moeder-onder-50`, intro r. 682: "…die voor kerst nog op tijd bezorgd kunnen worden." Voorstel: "…tussen €25 en €50. Bij elk cadeau zie je tot wanneer je kunt bestellen om het voor kerst in huis te hebben."
- `cadeau-thuiswerker-50-100-euro`, FAQ r. 398, en `cadeau-partner-boven-100-euro`, FAQ r. 793: "…die voor kerst (nog) op tijd komen." Voorstel: "…cadeaus voor kerst, met per cadeau de uiterste besteldatum."
- Alternatief (Developer): in de gids `isOnTime(...)` toepassen. Uiterlijk vóór 2 december voor de Sint-gidsen en vóór 21 december voor de kerstgidsen.

**A2. Bedenktijd en garantie onvolledig uitgelegd.** Regel: geen misleiding over consumentenrechten; wettelijke garantie (conformiteit).
- `kerstcadeau-vanaf-100-euro`, FAQ r. 718: "Bij webwinkels geldt in Nederland meestal een bedenktermijn bij online kopen". Voorstel: "Koop je online bij een bedrijf, dan heb je als consument in de regel 14 dagen bedenktijd. Er zijn uitzonderingen, zoals gepersonaliseerde of verzegelde producten. Lees de retourvoorwaarden op de winkelpagina en bewaar de verpakking."
- Zelfde gids, tip r. 713: "kijk of er een fabrieksgarantie bij zit". Voorstel: "…en kijk of er fabrieksgarantie bij zit. Los daarvan heb je altijd recht op een product dat deugt (wettelijke garantie)."
- `cadeau-partner-boven-100-euro`, tip r. 787: "…binnen de bedenktijd terugsturen, maar de voorwaarden verschillen per winkel." Voorstel: "…binnen de bedenktijd (meestal 14 dagen) terugsturen; hoe je retourneert en wie de verzendkosten betaalt, verschilt per winkel."

**A3. Lichte gezondheids- en herstelclaims.** Kader: Reclamecode (geen medische werking suggereren bij niet-medische producten).
- Gids `sportcadeau-voor-volwassenen`, r. 340: "massageapparaten voor het herstel na een training". Voorstel: "massageapparaten om na een training te ontspannen". FAQ r. 349 "voor het herstel" op dezelfde manier aanpassen.
- `maicura-prose-gen2-massage-gun` (r. 49363–49364): short "voor wie serieus wil herstellen"; description "bij stijve spieren … diverse lichaamsdelen kunt behandelen". Voorstel short: "De uitgebreidere massage gun van Maicura met tien opzetstukken, voor wie vaak sport." Description: "…bedoeld voor regelmatig gebruik na het sporten. Met tien opzetstukken masseer je verschillende spiergroepen. Geen medisch hulpmiddel."
- `beurer-mg-149-shiatsu-massagekussen` (r. 43666): "Past bij wie last heeft van een stijve nek … een bekend merk voor gezondheidsproducten". Voorstel: "Fijn voor wie na een lange dag even wil ontspannen. Een ontspanningscadeau van Beurer."
- `2behealthy-massage-gun-met-foamroller` (r. 32980): short "voor stijve spieren". Voorstel: "Massagepistool met foamroller voor na het sporten of een lange dag." De zin "Geen medisch hulpmiddel" mag blijven.
- `needventure-nordic-walking-stokken` (r. 50474): "Ze verlichten de benen". Voorstel: "Ze geven steun bij langere tochten of heuvelachtig terrein."
- `playgro-badspeelset-14-delig` (r. 48142): short "die niet schimmelen". Voorstel: "Afgesloten badspeeltjes waar geen water in kan lopen, in een cadeauset." De fabrikantclaim "geen schimmel" niet overnemen.

**A4. Review- en populariteitsclaims in de short.** Regel: "Geen nepreviews; reviewscores alleen met bron en aantal". De kaart toont de short zonder de rating, die alleen op de productpagina met bron en aantal staat.
- `suzanne-vermeer-schiereiland` (r. 18917): "met bijna alleen maar hoge waarderingen". Het gaat om 16 reviews. Voorstel: "Een Nederlandse spanningsroman van Suzanne Vermeer."
- `remington-shine-therapy-s8500-stijltang` (r. 22443): "Een populaire stijltang". Voorstel: "Een stijltang met arganolie-coating…".
- `manduka-pro-yogamat-xl-zwart` (r. 50327): "geliefd bij yogadocenten". Daar is geen bron voor. Voorstel: "Een extra lange yogamat met goede grip."
- In de description, zonder bron: "populair bij yogaliefhebbers" (`liforme-yogamat-185x68-grijs`, r. 19684), "Een vaste favoriet bij het klusgereedschap" (`stanley-schroevendraaierset-34-delig`, r. 21210), "Een geliefd cadeau" (r. 11797 en r. 22588), "Een vaste favoriet bij wie graag voetbalt" (`ea-sports-fc-26-xbox-series-x`, r. 47708), "Een gewilde set bij racefans" (`lego-icons-mclaren-mp4-4-ayrton-senna-10330`, r. 51399). Voorstel: weglaten of neutraal maken ("Een klassieke keuze voor…").
- Reviewcijfers in de description, zoals "Bij 23 beoordelingen gemiddeld 4,8" (r. 46078–47058, 19106, 19444, 45835), verouderen. Het `rating`-veld toont ze al met bron en datum. Voorstel: de cijfers uit de description halen.

**A5. PEGI 16-game bij 13–17 jaar.** `marvels-spider-man-2-ps5` (r. 17229–17243) staat in `ageGroups: ["13-17", …]` en verschijnt dus in de gids `gamecadeau-tiener-13-17` en de kerstgids voor tieners. De eigen notitie zegt "alleen tonen bij tieners van 16+" (r. 17267). De short noemt geen PEGI.
Voorstel short: "Open-wereld actiegame met Spider-Man voor PlayStation 5 (PEGI 16)." Overweeg "13-17" weg te halen. Kader: Reclamecode, kinderen en jongeren.

**A6. LEGO-sets voor 18+ ingedeeld bij tieners.** Een voorbeeld is `lego-technic-fast-and-furious-dodge-charger-42231` (r. 51248): "De pagina rekent de set tot volwassenen, maar ook ouderen tieners kunnen hem aan." Andere grote Technic- en Icons-sets staan ook in 13–17. Het 18+-label van LEGO is geen veiligheidslabel, maar we spreken het advies van de fabrikant niet tegen.
Voorstel: "LEGO raadt deze set aan vanaf 18 jaar; voor een handige oudere tiener ook te doen." Corrigeer ook de spelfout "ouderen tieners" (r. 51248, 51399, 51548).

**A7. Dartbord met (stalen) pijlen bij 13–17.** `winmau-sniper-dartbord-set-met-dartpijlen` (r. 29408–29411). Controleer de leeftijd op de verpakking; dartsets hebben vaak 14+ of 16+. Voorstel: "13-17" weghalen, of de leeftijd in de short zetten.

**A8. Veiligheidsinformatie bij kindproducten.**
- `buki-scheikunde-150-experimenten` (r. 52151): "veilige scheikundeproefjes". Voorstel: "…om thuis scheikundeproefjes te doen, onder toezicht van een volwassene. Lees de waarschuwingen op de verpakking." Scheikundesets vallen onder een aparte veiligheidsnorm (EN 71-4).
- `rp-telescoop-225x-zoom-kinderen-beginners` (r. 48095): voeg toe "Kijk er nooit mee naar de zon."

**A9. Leeftijd 7+ in de groep 4–7.** `lego-ninjago-mini-ninja-combomecha-30699` (r. 3301, "Aanbevolen vanaf 7 jaar") staat in "4-7". Voorstel: alleen "8-12", of de leeftijd in de short noemen.

**A10. Garantieclaims als verkoopargument.** Voorbeelden: "levenslange garantie van de fabrikant" (`stanley-quencher-h2o-flowstate-tumbler-1-18l-ash`, r. 36669), "25 jaar garantie" (r. 31823), "3 jaar garantie" (r. 22869, r. 2523), "5 jaar fabrieksgarantie" (r. 14023). Voorstel: altijd "fabrieksgarantie volgens de fabrikant" schrijven en in de short weglaten. Anders lijkt het op een garantie van ons.

**A11. Twijfel over het product in de publieke tekst.** Deze zinnen zijn eerlijk, maar laten zien dat niet vaststaat wat de klant krijgt (conformiteit, essentiële kenmerken):
- "De titel noemt telescopisch, de specificaties zeggen nee" (r. 15565)
- "de pagina is niet helemaal duidelijk over wat er precies in de set zit" (`bosch-ixo-7-bit-set-06039e000b`, r. 36864)
- "Details over bandmateriaal en lengte verschillen op de pagina" (`guess-gw0320l2-dameshorloge-36mm`, r. 9499)
- "Het aantal onderdelen in titel en specificaties verschilt" (`hape-grand-city-station-houten-treinstation`, r. 49176)

Voorstel (Catalogus): opnieuw controleren. Lukt dat niet, zet het product dan op gepauzeerd. Zo niet publiceren.

**A12. Signaal over babyspeelgoed.** `playgro-badspeelset-14-delig` (0–3): de notitie zegt "Eén review meldt afgaande verf" (r. 48178). Bij speelgoed dat in de mond gaat is dat een veiligheidssignaal. Voorstel (Catalogus): controleren en bij twijfel pauzeren.

**A13. Prijsoordelen in statische tekst.** Voorbeelden: "voor een mooie prijs" (r. 21210), "voor een redelijke prijs" (r. 3739, 51399), "De prijs is laag" (r. 45935, 46128), "De prijs is vriendelijk" (r. 52151). Prijzen veranderen, dus zulke zinnen kunnen gaan misleiden. Voorstel: weglaten, of "een klein cadeau" / "een betaalbaar cadeau" gebruiken als het bedrag structureel laag is.

**A14. Genderformulering.** `geronimo-games-dragomino-kinderspel` (r. 34787): "Goed voor kleine jongens (en meisjes)". De meisjesgids zegt "We selecteren op leeftijd en interesse, niet op geslacht". Voorstel: "Goed voor jonge kinderen die net hun eerste bordspellen leren spelen."

**A15. Kleine gidstekstpunten.**
- `kerstcadeau-voor-tiener`, metaDescription r. 803: "Met eerlijke levertijd". Dat is zelfaanprijzing in een zoekresultaat. Voorstel: "Met levertijd en uiterste besteldatum voor kerst op 24 december."
- `cadeau-voor-lezers`, r. 511: "want één titel is Engelstalig". De selectie verandert per ronde. Voorstel: "Let bij een boek op de taal; dat staat bij elk product."
- `creatief-cadeau`, r. 493: "Dat staat bij het product vermeld". Catalogus moet dat dan wel bij elk Engelstalig product vermelden. In de steekproef klopte het.

---

## Voorstel voor de checklist (niet doorgevoerd, alleen lezen)
Toe te voegen onder "Prijzen & claims", met akkoord van Orchestrator:
- [ ] Geen dynamische prijs-, deal- of voorraadclaims in statische teksten (short/description/gidsen): geen "korting", "deal", "adviesprijs", "voorraad bijna op".
- [ ] **[blokkerend]** Leeftijdsadvies van de fabrikant komt overeen met `ageGroups`. 3+-speelgoed staat niet in 0–3, tenzij de short "vanaf 3 jaar" zegt. Games noemen PEGI in de short als die 12 of hoger is.
- [ ] Geen review- of populariteitsclaim in de short. Reviewcijfers alleen via het `rating`-veld.

## Akkoord nodig?
Nee. Alle fixes betreffen productdata (Catalogus), gidsteksten (SEO-content) of code (Developer), dus geen juridische pagina's of voorwaarden. Daarom is er geen akkoordverzoek gemaakt. Wel een vraag aan de eigenaar, via Orchestrator: wil je ooit kortingen of adviesprijzen tonen? Zo ja, dan is daar een apart akkoord en een 30-dagen-prijsbron voor nodig (Omnibus). Tot die tijd geldt: niet tonen.

## Bron
- Prijsclaim Narcis: [DutchNews — Narcis by Judith Fanto takes home top book prize](https://www.dutchnews.nl/2026/11/narcis-by-judith-fanto-takes-home-top-book-prize/)

---

**COMPLIANCE: BLOCK.** Dit geldt alleen voor de productteksten en indeling in B1–B3: 25 actieve producten, met een kleine datafix voor Catalogus. De 26 gidsen zelf hebben geen blokkerend punt. De adviezen A1 (vóór 2 december) en A2–A15 kunnen in de volgende rondes.
