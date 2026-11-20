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

---

## Hertoets 20-11, ronde 11:15

Agent: Compliance · Werkkopie `main` (commit b5dff84). Ik heb alleen gelezen. Er zijn geen productteksten, gidsen, code, juridische pagina's of statusbestanden gewijzigd. Dit is geen formeel juridisch advies.

### Wat is getoetst
- **Producten: 262 actieve producten** in `data/products.json`, r. 52175–65241. Dat is alles na het laatste product uit de toets van 01:35 (`buki-scheikunde-150-experimenten`, r. 52127). Per product heb ik title, short en description volledig gelezen. Bij speelgoed, games en babyproducten heb ik ook `ageGroups` gecontroleerd. Concept- en gepauzeerde producten in dit blok heb ik meegelezen, maar niet meegeteld.
- **Trefwoordscan over alle 1231 actieve producten** op korting, deal, adviesprijs, Black Friday, voorraad bijna op, prijsoordelen, superlatieven, populariteit en reviews, gezondheid, duurzaamheid, garantie en levertijd.
- **Gidsen (7)**, alle toegevoegd op 20-11 in `lib/guides.ts`: `verwencadeau-voor-opa-en-oma` (r. 333), `sinterklaascadeau-voor-moeder` (r. 874), `kerstcadeau-kinderen-8-12` (r. 898), `bouwcadeau-voor-volwassenen` (r. 922), `cadeau-tiener-15-25-euro` (r. 947), `cadeau-collega-onder-15-euro` (r. 972) en `cadeau-thuiswerker-25-50-euro` (r. 995). De 2 gidsen waar SEO-content nu (11:15) aan werkt, zaten nog niet in het bestand en zijn dus niet getoetst.
- Ook gekeken naar de weergave: `app/(shop)/gids/[slug]/page.tsx` (filter op budget via `priceCents` en `BudgetNote`) en `components/CardDeadline.tsx`.

### Wat goed is
- **B1 en B2 van 01:35 zijn opgelost.** In title, short en description van actieve producten staat geen "korting", "adviesprijs", "dagdeal", "Black Friday", "nu gunstig" of "voorraad bijna op" meer. Zulke informatie staat alleen nog in `scout.notes`, en die zijn niet publiek.
- **Nieuwe teksten bevatten geen prijs-, schaarste- of levertijdclaims.** Er staat nergens "morgen in huis", "op tijd", "gratis verzending", "op=op" of "laatste kans".
- **Alleen bol.** Alle nieuwe actieve producten hebben `merchant: "bol"`.
- **Leeftijd 0–3 is in orde.** Er zitten 18 nieuwe actieve producten in de groep 0–3 (VTech Baby, Fisher-Price, Tiny Love, Janod, DUPLO, Nijntje-boek, Hudora-step, Smoby-garage). Die noemen allemaal 0–36 maanden, vanaf de geboorte, vanaf 3, 6 of 9 maanden, of vanaf 1 of 2 jaar. Er staat geen 3+-speelgoed in 0–3. `brio-luxe-treinset-33727` ("niet geschikt voor kinderen onder 3 jaar") en de PlayMais-sets (3+) staan correct alleen in 4–7.
- **Games noemen de PEGI-leeftijd**, meestal al in de short. `god-of-war-ragnarok-ps5` (PEGI 18) staat alleen in "volwassen". `saros-ps5` (PEGI 16) noemt in de short "vanaf 16 jaar".
- **Veiligheid bij kinderproducten wordt goed vermeld:** krimpfolie en FIMO onder toezicht, magnetisch dartbord "zonder scherpe punt", skateboard "combineer met beschermers", walkie-talkiebereik "onder ideale omstandigheden".
- **Massageproducten** (`beurer-mg-139-…`, `beurer-fm-60-…`) beschrijven ontspanning en geen behandeling. Daarmee volgen ze A3.
- **Gidsen:** geen superlatieven, geen nepschaarste en geen verzonnen reviews. Overal staat "wij sturen je door en verkopen zelf niets" en "controleer de levertijd bij de winkel". De datum van pakjesavond klopt: 5 december 2026 is een zaterdag. De collegagids waarschuwt terecht voor verzendkosten onder een minimumbedrag. Dat helpt bij de prijsaanduiding. Bij de kerstgids voor kinderen van 8 tot 12 staat "check de leeftijdsaanduiding op de verpakking".

### Blokkerende punten
**Geen.** Geen van de nieuwe teksten of gidsen valt onder een [blokkerend] checklistpunt of onder de blokkerende categorieën van 01:35 (B1 korting, B2 voorraad, B3 3+ in 0–3).

### Adviezen

**H1. Review- en populariteitsclaims zonder bron (zoals A4).** Regel: "Geen nepreviews; reviewscores alleen met bron en aantal". De rating staat al met bron en aantal in het `rating`-veld.

| Slug (r.) | Citaat | Voorstel |
|---|---|---|
| `tomodachi-life-nintendo-switch` (55386) | "Het wordt door kopers hoog gewaardeerd." | Schrappen. |
| `suzanne-collins-sunrise-on-the-reaping-engels` (58574) | "Een gewild boek voor onder de boom." | "Een boek voor onder de boom voor fans van de reeks." |
| `guinness-world-records-2027-nl` (58814) | "Een geliefd cadeau voor kinderen die…" | "Een cadeau voor kinderen die…" |
| `rutger-thomas-paco-1-de-magische-halsband` (58910) | short: "Het eerste deel van de populaire serie…" | "Het eerste deel van de serie van Rutger, Thomas en Paco, als paperback." |
| `het-leven-van-een-loser-20-partypooper` (59004–59005) | short: "Het nieuwste deel van de populaire dagboekreeks…"; "Een zekere keuze voor wie…" | short: "Deel 20 van de dagboekreeks vol cartoons, in hardcover."; "Een logische keuze voor wie…" |
| `pieter-koolwijk-een-rugzak-vol` (59423) | "Een goed gewaardeerd boek voor onder de boom." | "Een boek voor onder de boom." |
| `jochem-myjer-de-gorgels-en-het-geheim-van-de-gletsjer` (59697) | "Een populair cadeau voor kinderen vanaf 8 jaar…" | "Een cadeau voor kinderen vanaf 8 jaar…" |
| `god-of-war-ragnarok-ps5` (61687) | "Een vaste favoriet voor wie…" | "Een keuze voor volwassen spelers die…" |
| `bialetti-moka-express-4-kops` (53886) | "Een bewezen keuze voor wie…" | "Een klassieke keuze voor wie…" |
| `logitech-c920s-hd-pro-webcam` (64913) | "Een veelgebruikte webcam…" | "Een webcam…" |

**H2. Gezondheids- en ergonomieclaims bij producten die geen medisch hulpmiddel zijn (zoals A3).** Kader: Reclamecode, geen medische werking suggereren.
- `fellowes-premium-gel-polssteun-verstelbaar-grijs` (r. 64118): "Een nuttig cadeau voor iemand met klachten door lang typen." Dit suggereert dat het product helpt tegen klachten (RSI). Voorstel: "Een nuttig cadeau voor iemand die veel typt."
- `fellowes-crystal-gel-polssteun-toetsenbord-paars` (r. 64073), short: "…die de polsen ontlast tijdens het typen…". Voorstel: "Een zachte gelsteun om je polsen op te laten rusten tijdens het typen, in een vrolijk paars."
- `dutchone-laptopstandaard-aluminium-zwart` (r. 64564): "…en je nek ontspannener." Voorstel: "Zo staat je scherm hoger, dichter bij ooghoogte."

**H3. Vage duurzaamheidsclaims.** Kader: ACM Leidraad Duurzaamheidsclaims. Zeg wat je bedoelt, of laat het weg.
- `wera-kraftform-schroevendraaierset-6-delig` (r. 53445): "Een duurzaam cadeau…". Voorstel: "Een cadeau dat lang meegaat, voor een vader of opa…".
- `klean-kanteen-classic-800-ml-flip-sport-cap-sea-spray` (r. 65156): "Een duurzaam cadeau voor wie veel water drinkt of sport." Voorstel: "Een herbruikbare fles voor wie veel water drinkt of sport." ("herbruikbaar" klopt en is concreet.)

**H4. Vergelijkende en absolute claims zonder onderbouwing.**
- `bose-soundlink-flex-gen-2` (r. 54681): "klinkt voller dan de meeste kleine boxen". Voorstel: "Hij is stevig gebouwd en heeft een volle klank voor zijn formaat."
- `brabantia-tasty-keukenweegschaal-digitaal-dynamo` (r. 54433), short: "…dus nooit meer lege batterijen." Voorstel: "…dus je hebt geen batterijen nodig."

**H5. Tijdgebonden woorden in statische tekst.** "Nieuwste" en "nieuw" worden vanzelf onwaar.
- `richard-osman-moordclub-het-onmogelijke-fortuin` (r. 60559): "Het nieuwste Nederlandstalige deel…". Voorstel: "Een Nederlandstalig deel uit de Moordclub-reeks, met veel humor."
- `saros-ps5` (r. 55433): "Nieuwe PlayStation 5-game van Sony…". Voorstel: "PlayStation 5-game van Sony (PEGI 16), voor spelers vanaf 16 jaar."
- `het-leven-van-een-loser-20-partypooper`: zie H1.

**H6. Leeftijdsindeling (geen 3+ in 0–3, wel kleine punten).**
- `smoby-little-smoby-garage` (r. 61819–61832) staat in 0–3, maar de tekst noemt geen leeftijd ("gemaakt voor de kleinste bestuurders"). In de eigen notitie staat: beschrijving vanaf 18 maanden, specificaties 2 jaar. Voorstel short: "Een speelgarage met verdiepingen, wasstraat en pomp, vanaf 18 maanden volgens de fabrikant." En in de description "de kleinste bestuurders" vervangen door "peuters vanaf 18 maanden". Bij twijfel over 18 maanden of 2 jaar: "vanaf 2 jaar" aanhouden.
- `sackboy-a-big-adventure-ps5` (r. 62053–62066), PEGI 7, staat in 4–7. De description noemt "vanaf 7 jaar", maar de short niet. Voorstel short: "Een vrolijk springspel voor PS5 (PEGI 7) dat alleen of met vrienden en familie te spelen is." Of "4-7" weghalen. Dit is hetzelfde type punt als A9.
- `brio-luxe-treinset-33727` (r. 61957), short: "…die ook voor kleine handen makkelijk werkt." Het product is 3+, dus "kleine handen" kan doen denken aan een peuter. Voorstel: "…die ook voor kinderen vanaf 3 jaar makkelijk werkt."
- `lego-ninjago-geheimen-van-de-ninja-boek` (r. 58107, 7+ met minifiguur) en `geronimo-stilton-fantasia-xix` (r. 58060, 7+) staan in 4–7. De leeftijd staat in de description, dus dit is een licht punt. Overweeg "4-7" weg te halen.

**H7. Genderformulering (zoals A14).**
- `hyperx-cloud-jet-draadloze-gaming-headset` (r. 55287): "Een praktisch cadeau voor een jongen die online speelt." Voorstel: "…voor een tiener die online speelt."
- `kapitein-onderbroek-2-aanval-van-de-pratende-plees` (r. 58155): "Een geschikt boek voor jongens die liever lachen dan lang lezen." Voorstel: "…voor kinderen die liever lachen dan lang lezen."

**H8. Twijfel over het product in de publieke tekst (zoals A11).**
- `pukka-herbal-favourites-collection-30-theezakjes` (r. 64664): "De paginatitel en omschrijving verschillen licht over de exacte theesoorten." Voorstel (Catalogus): opnieuw controleren en de zin schrappen. Lukt dat niet, dan "vijf soorten" laten staan zonder smaken te noemen, of het product pauzeren.

**H9. Gids `bouwcadeau-voor-volwassenen`: de intro past niet bij het filter.** De intro (r. 929) zegt "In deze selectie staan bouwsets voor volwassenen: van LEGO-boeketten … tot modelbouw". Het filter `{ leeftijd: "volwassen", interesse: "bouwen" }` (r. 931) haalt ook gereedschap binnen dat Catalogus als "bouwen" labelt, zoals `stanley-fatmax-griptang-gebogen-bek-250mm` (interests `bouwen`, `thuis`). Een gids die iets anders toont dan hij belooft, kan als misleidend worden gezien. Het risico is klein, maar het is ook slecht voor de bezoeker. Voorstel: (a) Developer of SEO-content gebruikt een eigen interesse of tag voor bouwsets (bijvoorbeeld `bouwsets`), of (b) Catalogus haalt `bouwen` weg bij gereedschap en zet daar `klussen` of `thuis`, of (c) de intro wordt "bouwsets, modelbouw en gereedschap voor wie graag zelf iets maakt".

**H10. Kleine gidstekstpunten.**
- `cadeau-tiener-15-25-euro`, FAQ r. 966: "Bij elk product zie je de uiterste besteldatum voor beide feestdagen." De kaart toont er maar één, eerst Sint en daarna kerst (`CardDeadline.tsx` r. 8–16). Alleen de productpagina toont beide. Voorstel: "Op de pagina van elk cadeau zie je de uiterste besteldatum voor Sinterklaas en voor kerst."
- `cadeau-tiener-15-25-euro`, FAQ r. 965 ("Veel gezinnen kiezen een bedrag tussen €15 en €25") en `cadeau-collega-onder-15-euro`, FAQ r. 989 ("Veel teams spreken een bedrag tussen €10 en €25 af"): dit zijn feitelijke claims zonder bron. Het risico is laag. Voorstel: "Een bedrag tussen €15 en €25 komt vaak voor" / "Bedragen tussen €10 en €25 komen vaak voor", of de zin weglaten.

**H11. Spelling.**
- `sony-wh-ch735n-noise-cancelling-koptelefoon` (r. 65057): "kantoorkrijger" moet "kantoorwerker" of "thuiswerker" zijn.
- `stanley-fatmax-blade-armor-rolbandmaat-5m` (r. 53198): "Een stevige meetlint" moet "Een stevig meetlint" zijn.

**H12. Concept en gepauzeerd: aanpassen vóór activeren.**
- `fresh-n-rebel-bold-m2-bluetooth-speaker-blauw` (gepauzeerd, r. 54831): "voor een zacht prijsje" is een prijsoordeel (zoals A13). Voorstel: "…van een Nederlands merk."
- `karcher-wv-6-plus-ruitenreiniger` (concept, r. 63452): "Een cadeau waar vooral thuiswonende moeders en vaders blij mee zijn." Dit is een rollenpatroon en de zin loopt niet. Voorstel: "Een praktisch cadeau voor wie zelf de ramen lapt."

**H13. Levertijden van ronde 10:15 controleren vóór de site weer live gaat.** Volgens `ops/activity.jsonl` (r. 200) zijn de bol-verrijking en de bezorgdatums in ronde 10:15 niet gedraaid. De kaarten rekenen de besteldatum uit `deliveryDaysMax` (regel: "Levertijd en 'bestel uiterlijk'-datum kloppen met `lib/deadlines.ts`"). Voorstel (Catalogus/Developer): ververs vóór de herlancering de levertijd en prijs van de 70 producten uit die ronde. Een `priceCheckedAt` ouder dan 48 uur verbergt de prijs al automatisch.

### Akkoord nodig?
Nee. Alle adviezen gaan over productdata (Catalogus), gidsteksten (SEO-content) of het gidsfilter (Developer). Er worden geen juridische pagina's of voorwaarden geraakt.

**COMPLIANCE: GO** voor de 262 nieuwe actieve productteksten en de 7 gidsen van 20-11. Er zijn geen blokkerende punten. De adviezen H1–H13 kunnen in de volgende rondes worden opgepakt. H6 (Smoby-garage) en H9 (bouwgids) bij voorkeur vóór de herlancering.

---

## Hertoets 12:15

Agent: Compliance · Werkkopie `main` (na commit 9234107, ongecommitte wijzigingen in `data/products.json` en `lib/guides.ts`). Dit is geen formeel juridisch advies.

### Wat is getoetst
- **Producten:** alle slugs uit `data/research/shortlist-2026-11-20-moeder-oma-collega-thuiswerker-12.json` (35) en `data/research/shortlist-2026-11-20-jongens-vader-gereedschap-peuter-12.json` (41), zoals ze in `data/products.json` staan. Velden: title, short, description, ageGroups en recipients.
  - **67 nieuw toegevoegd** (r. 68896–72079): 65 actief, 2 concept (`kneipp-shower-moments-geschenkset-3-mini-douches`, `dahle-507-rolsnijmachine-creative-4-in-1`).
  - **2 stonden er al** en zijn niet overschreven: `playmobil-sky-trails-starter-kit-xxl-72269` (r. 26589, alleen 8-12, short "vanaf 7 jaar") en `ticket-to-ride-mijn-eerste-reis-europe` (r. 47449). Beide in orde.
  - **7 niet opgenomen**, dus niet getoetst: `kneipp-body-mind-balance-moments-iris-vetiver`, `kneipp-relaxing-favourites-douchegel-douchescrub-set`, `leitz-nexxt-nietmachine-25-vel-zwart`, `bosch-gereedschapskoffer-41-delig`, `bosch-bitset-7-delig-handschroevendraaier`, `janod-houten-mandje-fruit-groenten` en `avento-voetbaltrainer-met-elastiek-kinderen`. Goed dat de Bosch-koffer niet is opgenomen: EAN-prefix 694, verkoper De StuntShop en 41 tegenover 47 onderdelen. Niet activeren zonder eerst te controleren of het echt een Bosch-product is.
- **Gidsen (2):** `cadeau-collega-25-50-euro` (`lib/guides.ts` r. 1068) en `cadeau-vader-25-50-euro` (r. 1091). De claim "een dag extra marge" klopt met `PEAK_BUFFER_DAYS = 1` in `lib/deadlines.ts` r. 18. Alle `related`-slugs bestaan.

### Wat goed is
- Er staan geen superlatieven, prijs- of voorraadclaims ("op=op", "bijna uitverkocht", "morgen in huis", "korting") in de publieke teksten. Zulke informatie staat alleen in `scout.notes`. Er zijn ook geen review- of populariteitsclaims, geen "nieuwste" en geen beloftes dat iets op tijd komt.
- **Voetenbaden** (Beurer FB 20/FB 30, Brixy, Tristar) en **Kneipp**-sets beschrijven functies en geur, geen gezondheidseffect. "Voetreflex" uit de winkeltitel is niet overgenomen.
- **Leeftijden kloppen met de fabrikant.**
  - PLAYMOBIL 4+ staat in 4-7.
  - LEGO City 5+/6+ en de bordspellen 6+/7+ noemen hun leeftijd in de short.
  - De DUPLO-set (2+), de loopfietsen (vanaf 2 jaar, Veloretti 2-4) en de Micro-step (18 maanden) staan in 0-3.
  - De Playgro-producten (12 en 9 maanden) en de puzzels (vanaf 1 jaar) staan ook in 0-3.
  - 3+-producten in 0-3 noemen allemaal "vanaf 3 jaar" in de short, zoals volgens de B3-uitzondering moet: `janod-brico-kids-ton-100-stuks`, `janod-spel-crazy-sticks` en `klein-bosch-mini-speelgoed-gereedschapskist-met-boormachine`.
- **PEGI:** `nintendo-super-mario-odyssey-switch` noemt PEGI 7 in title en short en staat in 8-12 en 13-17.
- **Veiligheid:** de loopfiets en de step vermelden "onder toezicht", de nijntje-puzzel ook. Bij de Klein-speelgoedboor staat dat er batterijen nodig zijn.
- **Gidsen:** er staan geen superlatieven of schaarste in. Er staat "wij sturen je door en verkopen zelf niets", "controleer de levertijd bij de winkel" en "prijzen kunnen wijzigen; we tonen de controledatum".

### Blokkerende punten
**Geen.**

### Direct doorgevoerde tekstcorrecties (12 slugs plus 1 gids)
| Slug | Was | Nu | Waarom |
|---|---|---|---|
| `kneipp-embrace-life-favourites-geschenkset` (short) | "Een klein set" | "Een kleine set" | Spelling (de set) |
| `kneipp-shower-moments-geschenkset-3-mini-douches` (concept) | "Een eenvoudig cadeau onder de 15 euro." | "Een eenvoudig klein cadeau." | Statische prijsclaim (A13) |
| `kneipp-goodbye-stress-geschenkset` | "Een cadeau voor wie een drukke periode heeft." | geschrapt | Samen met de productnaam suggereert dit een werking tegen stress (cosmeticaclaim, Reclamecode) |
| `kneipp-luxe-geschenkset-relaxing-lavendel-3-delig` | "Een vertrouwde keuze…" | "Een verzorgingscadeau…" | Reputatieclaim zonder bron (A4) |
| `kozie-springvorm-26-cm-pfas-vrij` | title ", PFAS-vrij"; "De antiaanbaklaag is PFAS-vrij" | uit de title gehaald; "volgens de verkoper PFAS-vrij" | Milieu- en gezondheidsclaim die wij niet kunnen onderbouwen (ACM Leidraad Duurzaamheidsclaims) |
| `kozie-muffinvorm-12-stuks-pfas-vrij` | idem, plus "Een goedkoop cadeau" | idem, plus "Een klein cadeau" | Idem, plus prijsoordeel (A13) |
| `beurer-fb20-elektrisch-voetenbad` | "leg de voeten even omhoog" | "laat de voeten even weken" | Klopte niet met het gebruik |
| `leitz-vilten-bureau-onderlegger-70x36-donkergrijs` | "die bij elk thuiswerkbureau past" | "voor op het thuiswerkbureau" | Absolute claim |
| `bosch-schroevendraaierset-8-delig` | "Daarmee kan een vader…"; "Geleverd door bol zelf." | "Daarmee kun je de meeste schroeven in huis aan."; verkoperszin geschrapt | Verkoper kan wisselen (statische claim); genderneutraal |
| `playgro-floating-fun-friends-badspeelgoed` | "Ze zijn van BPA-vrij kunststof en voldoen aan EN 71." | "Volgens de fabrikant zijn ze…" | Claim toeschrijven aan de bron |
| `klein-bosch-mini-speelgoed-gereedschapskist-met-boormachine` | "naast papa meehelpen" | "naast een volwassene meehelpen" | Genderformulering (A14) |
| `lego-city-donuttruck-60452` (short) | "afneembaar kiosk" | "afneembare kiosk" | Spelling (de kiosk) |
| Gids `cadeau-vader-25-50-euro`, FAQ 2 | "Veel gezinnen spreken een bedrag af. Bij elk cadeau staat de uiterste besteldatum voor beide gelegenheden." | "Op de pagina van elk cadeau zie je de uiterste besteldatum voor Sinterklaas en voor kerst." | Feitelijke claim zonder bron (H10). De kaart toont maar één datum (`CardDeadline.tsx`). |

Er zijn geen andere velden, prijzen of statussen gewijzigd. Er is geen product op concept gezet. JSON-opbouw en inspringing zijn ongewijzigd gebleven: alleen stringwaarden zijn vervangen.

### Adviezen
**T1. Is het wel het juiste product? (A11/H8)** Catalogus moet dit controleren vóór (her)activeren:
- `kneipp-shower-moments-geschenkset-3-mini-douches` (concept): de URL-slug zegt "favourites-4-stuks", de title "3 mini douches". Laten staan op concept tot vaststaat welke set de klant krijgt.
- `kozie-muffinvorm-12-stuks-pfas-vrij`: de URL zegt "mini-muffinvorm", de tekst "muffinvorm voor 12 muffins". Controleer of het om mini-muffins gaat.
- `janod-i-wood-vorm-en-geluid-puzzel`: de title noemt "geluid", de specificaties zeggen dat er geen geluid is (scout-notitie). Controleer dit en pas zo nodig de title aan.
- `dahle-507-rolsnijmachine-creative-4-in-1` (concept): er zijn twee snijlengtes en twee prijzen (€ 57,50 en € 33,95). Prijs en variant controleren vóór activeren.

**T2. Twijfel over het product in de publieke tekst (A11).** "Een reviewer meldde dat de platbektang ontbrak" (`stanley-dynagrip-tangenset-3-delig-150mm`), "het exacte aantal per type verschilt" (`stanley-schroevendraaierset-42-delig-softbag`) en "het aantal pionnen verschilt op de pagina (5 of 6)" (`clementoni-ganzenbord-disney`). Dat is eerlijk, maar laat zien dat de inhoud niet vaststaat. Voorstel: opnieuw controleren en de zin schrappen.

**T3. Veiligheidsgegeven onduidelijk.** Bij `hudora-scooter-start-200-step-oranje` staat het maximale kindgewicht als 30 of 100 kg op de pagina. In onze tekst staat "tegenstrijdig vermeld". Voorstel (Catalogus): bij Hudora of in de handleiding controleren en het juiste getal noemen. Lukt dat niet vóór de herlancering, dan pauzeren. Overweeg bij de steps en loopfietsen "draag een helm" toe te voegen.

**T4. Seizoensproduct.** `playmobil-christmas-adventskalender-noordpool-72226`: na de laatste besteldatum voor 1 december op gepauzeerd zetten. De tekst zelf belooft niets ("let op de besteldatum").

**T5. 3+-speelgoed met kleine onderdelen in 0-3.** Dit is toegestaan volgens de B3-uitzondering omdat de short "vanaf 3 jaar" zegt. Toch verschijnen bouten, schroefjes en stokjes zo in peutergidsen (`janod-brico-kids-ton-100-stuks`, `janod-spel-crazy-sticks`, `klein-bosch-mini-…`). Voorstel voor de eigenaar: 3+ voortaan alleen in 4-7 indelen. Dat is strenger dan nu en voorkomt verwarring met "niet geschikt voor kinderen onder 36 maanden".

**T6. Gidsen: belooft de intro wat het filter toont (zoals H9)?**
- `cadeau-collega-25-50-euro` noemt "voor bij de koffie of thee", "een pauze met het team" en in de FAQ "een spel voor het team".
- `cadeau-vader-25-50-euro` (metaDescription) noemt "koffie, spel, sport of iets voor in huis".

Voorstel (SEO-content): op de preview nakijken of het filter (`voor` + `budget: "25-50"`) die soorten producten echt toont. Is dat niet zo, pas dan de opsomming aan.

**T7. Buiten de opdracht gezien.** `sportcadeau-voor-vader` (r. 1047, 1055 en 1060) spreekt van "herstel" en "een hulpmiddel voor het herstel". Dat is dezelfde soort claim als A3. Voorstel: "om na het sporten te ontspannen".

### Akkoord nodig?
Nee. Alleen productteksten en één gids-FAQ zijn aangepast. Er zijn geen juridische pagina's, checkout of prijzen geraakt.

**COMPLIANCE: GO** voor de 67 nieuwe producten en de 2 gidsen van ronde 12:15. Er zijn geen blokkerende punten. T1 (Kneipp Shower Moments en Dahle blijven concept) en T3 (Hudora) bij voorkeur vóór de herlancering.
