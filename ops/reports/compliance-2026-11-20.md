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

---

## Hertoets 13:15

Agent: Compliance · Werkkopie `main` (na commit 4ae1839, ongecommitte wijzigingen in `data/products.json` en `lib/guides.ts`). Dit is geen formeel juridisch advies.

### Wat is getoetst
- **Producten:** de slugs uit `data/research/shortlist-2026-11-20-moeder-oma-spellen-sport-tech-13.json` (35) en `data/research/shortlist-2026-11-20-jongens-vader-muziek-sport-tech-gereedschap-13.json` (35), zoals ze in `data/products.json` staan (r. 72088–75003). Velden: title, short en description, plus ageGroups en recipients bij kind- en tienerproducten.
  - **60 opgenomen:** 56 actief en 4 concept (`soundcore-life-q30-anc-koptelefoon`, `soundcore-p30i-draadloze-oordopjes-anc`, `powerlocus-p2-draadloze-kinderkoptelefoon` en `tinyplay-kindercamera-met-fotoprinter-48mp`).
  - **10 niet opgenomen**, dus niet getoetst: `stelton-emma-theekan-met-filter-1-liter-zwart`, `ravensburger-puzzel-sweet-street-1000-stukjes`, `alecto-fr-115bw-walkietalkie-set-van-2`, `bresser-junior-telescoop-32x-kinderen`, `dunlop-opvouwbaar-voetbaldoel-90x59`, `dunlop-opvouwbaar-voetbaldoel-mini-55x44`, `varta-day-light-key-chain-sleutelhangerlamp`, `varta-aluminium-light-f20-pro-zaklamp`, `robotime-3d-puzzel-tower-bridge-led-tg412` en `robotime-modelbouwpakket-sailing-ship-118-delig`.
- **Gidsen (2):** `cadeau-opa-oma-onder-15-euro` (`lib/guides.ts` r. 1114) en `cadeau-vader-15-25-euro` (r. 1138): intro, tips, FAQ en meta. De budgetsleutels `tot-15` en `15-25` bestaan (`lib/types.ts` r. 40–41) en alle `related`-slugs bestaan.

### Wat goed is
- **Fitbit:** de tekst beschrijft functies ("telt stappen, volgt slaap, laat de hartslag zien") en geen gezondheidseffect. Er staan geen medische claims in.
- **Kinderkoptelefoons:** het woord "veilig" uit de winkeltitels ("Veilig luisteren tot 85 dB", "Veilig - Duurzaam") is niet overgenomen. Er staan alleen de dB-grenzen in.
- **Leeftijden:** in deze ronde zit geen product in 0–3. TinyPlay (fabrikant 4+) staat in 4–7 en 8–12. Bresser staat alleen in 8–12. De Robotime-bouwpakketten (12+) staan in 13–17 en volwassen en noemen hun leeftijd in de description. Weerwolven staat in 13–17 en volwassen.
- **Geen** "nieuwste", superlatieven, "op=op", "morgen in huis", korting of adviesprijs in de publieke tekst. Adviesprijzen en "(deal)" staan alleen in `scout.notes`.
- **Gidsen:** er staan geen superlatieven, schaarste of verzonnen reviews in. Wel staat erin: "wij sturen je door en verkopen zelf niets", "controleer de levertijd bij de winkel" en "prijzen kunnen wijzigen; we tonen de controledatum". De claim "een dag extra marge" klopt met `PEAK_BUFFER_DAYS`.

### Blokkerende punten
**B-13.1 (opgelost door tekstcorrectie): voorraadclaim in een actief product.** Dit valt onder de regel "Geen 'nog maar X op voorraad' … of valse urgentie" (zoals B2 van 01:35). `bresser-junior-telescoop-microscoop-set-smartphone` (actief) had in de description: "De voorraad bij bol was bijna op toen de pagina werd bekeken." Ik heb die zin geschrapt. Daarvoor was geen keuze van de eigenaar nodig: de standaardfix van B2 is "zin schrappen". Er zijn verder geen blokkerende punten.

### Direct doorgevoerde tekstcorrecties (25 slugs plus 2 gidsen)
| Slug | Was | Nu | Waarom |
|---|---|---|---|
| `fitbit-inspire-3-activity-tracker-geel` | (geen kanttekening) | toegevoegd: "De metingen zijn een indicatie; het is geen medisch hulpmiddel." | Hartslag- en slaapmeting mogen niet als medische meting overkomen (Reclamecode, A3) |
| `philips-eco-conscious-hd5120-00-filterkoffiezetter` | short "deels gemaakt van gerecycled plastic"; description "met een behuizing van gerecycled plastic" | beide "volgens Philips deels …" | Duurzaamheidsclaim toegeschreven aan de bron en consistent gemaakt (ACM Leidraad Duurzaamheidsclaims) |
| `moccamaster-cup-one-off-white` | short "…, met 5 jaar garantie"; "staat bekend om het gelijkmatige brouwen"; "een of twee" | garantie uit de short; "volgens de fabrikant geldt 5 jaar fabrieksgarantie"; reputatiezin geschrapt; "één of twee" | A10 (garantie), A4 (reputatie), spelling |
| `moccamaster-kbg-select-black` | short "…, met 5 jaar garantie"; "op de juiste temperatuur"; "Een duurzaam cadeau" | garantie uit de short; "Volgens Moccamaster … vaste temperatuur; de fabrikant geeft 5 jaar fabrieksgarantie"; "Een cadeau dat lang meegaat" | A10, claim aan de bron toegeschreven, H3 |
| `vatten-premium-rvs-theepot-1-2-liter-dubbelwandig` | "wordt aan de buitenkant niet heet" | "minder heet" | Absolute claim, met kans op verbranding |
| `dopper-travel-mug-thermosbeker-400-ml-blazing-black` | "Past in de meeste bekerhouders" | "Past in veel bekerhouders" | Niet te onderbouwen |
| `basil-tour-waterproof-dubbele-fietstas-28-liter-zwart` (short) | "die volledig waterdicht is" | "die volgens Basil volledig waterdicht is" | Claim aan de bron toegeschreven |
| `clementoni-puzzel-500-het-oude-schoenhuis` | "Een goedkoop cadeautje" | "Een klein cadeautje" | Prijsoordeel (A13) |
| `jan-van-haasteren-puzzel-blik-op-oneindig-500-stukjes` | "Zoals bij alle puzzels van deze tekenaar … in elke hoek" | "Zoals bij de puzzels van Jan van Haasteren … overal" | Absolute claim |
| `philips-tak4200ct-draadloze-kinderkoptelefoon` | "als veilige inschatting" | "als voorzichtige inschatting" | "Veilig" bij een kinderkoptelefoon kan als veiligheidsclaim worden gelezen |
| `bresser-junior-microscoop-40x-640x-koffer` | (geen) | toegevoegd: "Laat het zelf maken van preparaten samen met een volwassene doen." | Veiligheid bij een kindproduct (A8) |
| `bresser-junior-telescoop-microscoop-set-smartphone` | voorraadzin | geschrapt; toegevoegd: "Kijk met de telescoop nooit naar de zon." | B-13.1 en A8 |
| `sterk-in-de-keuken-kids-kinderkookboek` | "bedoeld om samen of zelfstandig te koken" | toegevoegd: "laat een volwassene helpen bij messen, oven en fornuis" | Veiligheid bij 8–12 |
| `tycano-pop-up-voetbaldoelen-120x90-set-van-2` | "Op de pagina stond ook een kleurvariant als niet leverbaar; de zwarte uitvoering was bestelbaar." | geschrapt; toegevoegd: "Laat een volwassene de doelen opzetten, inklappen en vastzetten." | Statische voorraadinformatie. Pop-updoelen met een veerkrachtig glasvezelframe en grondpennen staan in 4–7. |
| `virtufit-pop-up-voetbaldoelen-120x90-set-van-2` | "De beoordeling is gemiddeld (3,7 uit 30 reviews)." | geschrapt; dezelfde zin over opzetten door een volwassene | Reviewcijfer in de description (A4); de rating staat al met bron. Veiligheid. |
| `hori-nintendo-switch-joy-con-oplaadstation` | (geen) | toegevoegd: "gemaakt voor de Joy-Cons van de eerste Nintendo Switch; controleer bij de winkel of het past als iemand een Switch 2 heeft" | Essentieel kenmerk. De Joy-Con 2 heeft een andere aansluiting (art. 6:193d BW). |
| `varta-aluminium-light-f30-pro-zaklamp` | "de fabrikant geeft 1 jaar garantie" | "Volgens de fabrikant geldt 1 jaar fabrieksgarantie, naast je wettelijke rechten." | "1 jaar garantie" kan suggereren dat de wettelijke garantie korter is (A10, conformiteit) |
| `wera-kraftform-100-vde-torx-schroevendraaierset-6-delig` | "geschikt voor werk onder spanning tot 1000 volt" | "De isolatie is volgens VDE getest tot 1000 volt; werk thuis altijd spanningsloos." | Veiligheid: niet aanzetten tot werken aan een spanningvoerende installatie |
| `stanley-mobile-work-center-gereedschapswagen-1-70-326` (short) | "Moduleerbare" | "Modulaire" | Spelling |
| `wera-kraftform-xxl-2-schroevendraaierset-12-delig` | (geen) | toegevoegd: "een spanningszoeker geeft alleen een indicatie en vervangt geen spanningstester" | Veiligheid |
| `knipex-00-20-72-v01-werkplaats-tangenset-2-delig` | "Bekend merk met een goede naam onder klussers." | geschrapt | Reputatieclaim zonder bron (A4) |
| `knipex-00-20-12-elektro-tangenset-3-delig-vde` | "Geen reviews op de pagina." | "; werk thuis altijd spanningsloos." | De reviewstatus is statisch en veroudert (A4). Veiligheid. |
| `bosch-professional-gsb-18v-65-klopboormachine-solo` | "past bij iemand die al Bosch 18V-accu's heeft" | "… al blauwe Bosch Professional 18V-accu's heeft; de groene Bosch-accu's voor thuisgebruik passen er niet op." | Misleiding over een essentieel kenmerk. In dezelfde ronde staat de groene EasyDrill 18V-40, en die accu's passen niet op deze machine. |
| `robotime-3d-puzzel-luchtschip-airship-176-delig` | "Fabrikant adviseert minimaal 12 jaar." | "Volgens de specificaties vanaf 12 jaar; de productbeschrijving noemt 14+." | De leeftijd op de pagina is tegenstrijdig; het product staat ook in 13–17 |
| `robotime-modelbouwpakket-army-jeep-369-delig` | "voor een zoon of vader" | "voor een tiener of volwassene" | Genderformulering (A14) |
| Gids `cadeau-opa-oma-onder-15-euro`, tip 1 | "iets dat op raakt" | "iets dat opraakt" | Spelling |
| Gids `cadeau-vader-15-25-euro`, tip 3 | "iets kleins uit de gids voor onder €15" | "iets kleins" | Er bestaat geen vadergids onder €15 en de gids linkt er ook niet naar |

Er zijn geen prijzen, statussen, links, slugs of andere velden gewijzigd. Alleen stringwaarden zijn vervangen. De JSON-opbouw en de inspringing van 2 spaties zijn ongewijzigd.

### Adviezen (open)
**U1. Twijfel over het product in de publieke tekst (A11/T2).** Catalogus moet dit opnieuw controleren en daarna de zin schrappen of het product pauzeren:
- `jbl-junior-470nc-kinderkoptelefoon-noise-cancelling`: "de specificaties en de beschrijving spreken elkaar tegen over de microfoon".
- `philips-tak4200ct-draadloze-kinderkoptelefoon`: "De pagina noemt wisselende cijfers voor de accuduur". Het gaat om 45 of 20 uur.
- `stanley-mobile-work-center-gereedschapswagen-1-70-326`: "de wielinformatie [is] tegenstrijdig".
- `bosch-easydrill-1200-accuboormachine-2x-12v`: de tekst noemt een "12-delige boor- en bitset", de winkeltitel alleen een "dubbele schroefbit". Controleer wat er in de doos zit.
- `weerwolven-van-wakkerdam-het-pact-kaartspel`: de short zegt "uitgebreidere Het Pact-doos", de winkeltitel zegt "basisspel". Controleer de inhoud.

**U2. Leeftijd is een inschatting.** Bij de kinderkoptelefoons (behalve TinyPlay), de Bresser-sets (8+), het kinderkookboek en de pop-updoelen (4–7) staat geen leeftijdsadvies van de fabrikant op de pagina. Dat is niet blokkerend: er zit geen 3+ in 0–3 en er is geen tegenspraak. Voorstel (Catalogus): controleer de verpakking of de fabrikantensite. Vind je een hogere minimumleeftijd, pas dan `ageGroups` aan. Kijk daarbij vooral naar de pop-updoelen in 4–7.

**U3. Fietslamp van 550 lumen** (`axa-niteline-550-fietsverlichting-set`). Een fel voorlicht mag tegenliggers niet verblinden. Voorstel: "Richt het voorlicht iets naar beneden, zodat je tegenliggers niet verblindt."

**U4. Gidsen: belooft de intro wat het filter toont (T6/H9)?**
- `cadeau-opa-oma-onder-15-euro` noemt "een doosje thee, een kort boek, een puzzelboekje … of iets voor de vogels in de tuin" en in de FAQ "een kaars of handcrème".
- `cadeau-vader-15-25-euro` noemt "iets voor de koffie, iets voor verzorging, een boek …".

Voorstel (SEO-content): kijk op de preview of het filter (`voor` + `budget`) die soorten producten echt toont. Is dat niet zo, pas dan de opsomming aan.

**U5. Hori en Bosch Professional laten verifiëren.** Ik heb de tekst al aangepast, maar Catalogus moet bij de fabrikant nagaan (a) dat het Hori-station niet geschikt is voor de Joy-Con 2 en (b) dat de GSB 18V-65 alleen werkt met blauwe Bosch Professional 18V-accu's. Klopt (a) niet, dan kan de zin over de Switch 2 weg.

**U6. Concepten.** De teksten van de 4 conceptproducten zijn in orde en hoeven niet aangepast te worden vóór activeren. Volgens de eigen notities blijft wel open: de herkomst van de verkoper (Soundcore ×2 en PowerLocus).

**U7. Licht punt, niet aangepast.** `stelton-em77-thermoskan-1-liter-zwart`: "De bekende Deense design-thermoskan". Dat is feitelijk te verdedigen (designklassieker uit 1977), maar als het consequent moet: "De Deense design-thermoskan EM77".

### Akkoord nodig?
Nee. Alleen productteksten en twee gidstips zijn aangepast. Er zijn geen juridische pagina's, checkout of prijzen geraakt. De eigenaar hoeft niets te kiezen.

**COMPLIANCE: GO** voor de 60 producten (56 actief, 4 concept) en de 2 gidsen van ronde 13:15. Het enige blokkerende punt (B-13.1, voorraadclaim) is met een tekstcorrectie opgelost. U1 en U5 bij voorkeur vóór de herlancering.

## Hertoets 14:15

Agent: Compliance · Werkkopie `main` (na commit f76a2b3, ongecommitte wijzigingen in `data/products.json` en `lib/guides.ts`). Dit is geen formeel juridisch advies.

### Wat is getoetst
- **Producten (45, alle actief):** de slugs uit `data/research/shortlist-2026-11-20-moeder-oma-wellness-sport-14.json` (25) en `data/research/shortlist-2026-11-20-jongens-vaders-peuter-14.json` (33), zoals ze in `data/products.json` staan (r. 75005–77112). Velden: short en description, plus ageGroups bij kindproducten.
  - **Moeder/oma (12 opgenomen):** `rockerz-yogamat-extra-dik-petrol`, `aj-sports-foamroller-set-4-delig`, `tunturi-yoga-massage-roller-90-cm`, `abbey-camp-nordic-walking-stokken-zwart-grijs`, `abbey-camp-wandelstokken-anti-shock-zwart`, `northwall-zijden-slaapmasker-oordopjes-zwart`, `beurer-fb35-voetenbad`, `medisana-mc200-shiatsu-massagekussen`, `beurer-mg135-shiatsu-massagekussen`, `dopper-insulated-thermosfles-1-liter-zwart`, `tonys-chocolonely-proeverijtje-taart-288-gram`, `gardena-snoeischaar-classic-18mm`.
  - **13 niet opgenomen** (dus niet getoetst): `tunturi-yogablok-kurk`, `avento-yogamat-basic-173-grijs`, `breaking-limits-pilates-bar-weerstandsbanden-set`, `tunturi-springtouw-verstelbaar`, `beauty-pillow-zijden-slaapmasker-silver`, `ella-verzwaard-slaapmasker-200-gram`, `medisana-mcn-shiatsu-massagekussen-nek-rug`, `wmf-kitchenminis-thee-en-waterkoker-1-liter`, `tefal-glass-ki6058-waterkoker`, `tonys-chocolonely-kerstcadeau-melk-karamel-zeezout-2x180`, `yankee-candle-geschenkset-9-geuren-met-houder`, `gardena-plantenspuit-1-liter`, `pro-garden-kweekset-68-delig`.
  - **Jongens/vaders/peuter:** alle 33 opgenomen en actief. Daarvan 12 in 0–3 (inclusief de Hape Miniband, die ook in 4–7 staat).
- **Gidsen (2):** `wellnesscadeau-voor-je-moeder` (`lib/guides.ts` r. 1161) en `cadeau-moeder-15-25-euro` (r. 1184): meta, intro, tips en FAQ. De filtersleutels `interesse: "wellness"` en `budget: "15-25"` bestaan (`lib/types.ts` r. 29 en 41) en alle `related`-slugs bestaan.

### Wat goed is
- **Massage en wellness:** in geen enkele tekst staan woorden als "pijn", "herstel", "blessure", "therapie" of "doorbloeding". Dat de Medisana MC200 niet geschikt is bij zwangerschap of een pacemaker stond alleen in `scout.notes`. Het staat nu ook in de publieke tekst (zie tabel).
- **Leeftijd 0–3 is correct:** alle 12 producten in 0–3 hebben een minimumleeftijd van de fabrikant onder 3 jaar. Babygym 0+, stuurtje 1–3, speelkasteel 10–36 mnd, sensorische bal en Nijntje-mat 6–36 mnd, Nijntje-knuffel 6 mnd+, Hape-kubus 10 mnd+, otter 0+, drumstel 1,5–4, looptrainer en Hape-stapelblokken 18 mnd+. De Hape Miniband (2+) staat in 0–3 en 4–7. Alle 3+-producten staan niet in 0–3 (regel B3): BRIO-trein, Hape-werkbank en de drie BRIO Builder-sets. NERF (8+), de LEGO-sets (7+ en 8+) en de puzzels (6+) staan in passende groepen.
- **Geen** "voorraad bijna op", "op=op", "morgen in huis", deal-, advies- of kortingsprijs in de publieke tekst. Die informatie staat alleen in `scout.notes`. Waar het reviewaantal te klein of twijfelachtig is, is de rating leeggelaten: NERF ×3, LEGO Speed Champions ×2, Clementoni ×4 en Medisana MC200.
- **Gidsen:** er staan geen superlatieven, schaarste of medische claims in. Wel staat erin: "wij sturen je door en verkopen zelf niets", "controleer de levertijd bij de winkel" en "prijzen kunnen wijzigen". De data in de FAQ kloppen: za 5 december en do 24 december 2026.

### Blokkerende punten
Geen. Er is geen product op concept gezet.

### Direct doorgevoerde tekstcorrecties (21 slugs plus 1 gids)
| Slug | Was | Nu | Waarom |
|---|---|---|---|
| `rockerz-yogamat-extra-dik-petrol` | short "voor thuis yoga"; "die de knieën en rug ondersteunt" | "voor yoga, pilates en rekoefeningen thuis"; "die zacht ligt onder knieën en rug" | Spelling. "Ondersteunt" klinkt als een lichamelijk effect (A3). |
| `aj-sports-foamroller-set-4-delig` | short "voor losse spieren"; "stijve spieren wil losmaken"; "Er zit een weerstandsband en …" | "om zelf te masseren"; "na afloop zelf wil masseren"; "Er zitten …" | Effect op de spieren is een gezondheidsclaim (A3). Ook een grammaticafout. |
| `abbey-camp-nordic-walking-stokken-zwart-grijs` | "Nordic walking ontlast de knieën" | "Met nordic walking gebruik je tijdens het lopen ook je armen en schouders." | Gezondheidsclaim over gewrichten (A3) |
| `abbey-camp-wandelstokken-anti-shock-zwart` | "… of bij gevoelige gewrichten" | geschrapt | Impliciete gezondheidsclaim (A3) |
| `northwall-zijden-slaapmasker-oordopjes-zwart` | short "een voordelig slaapcadeautje"; "voor een rustigere nacht" | "een klein slaapcadeautje"; "die geluid dempen" | Prijsoordeel (A13). Slaapeffect als claim (A3). |
| `medisana-mc200-shiatsu-massagekussen` | "Handig bij een stijve nek of rug …"; "Een merk dat vaker in de gezondheidszorgwinkel te vinden is." | "Fijn om even te ontspannen na een lange dag. Volgens de fabrikant niet gebruiken tijdens de zwangerschap of met een pacemaker; lees vooraf de gebruiksaanwijzing." | Klacht en oplossing samen lezen als een medische claim. De zin over de zorgwinkel suggereert medische betrouwbaarheid zonder bron (A3/A4). De contra-indicatie is essentiële info (A8). |
| `beurer-mg135-shiatsu-massagekussen` | short "met drie jaar garantie"; "Een duurzamer cadeau van een bekend Duits merk." | short zonder garantie; "Volgens de fabrikant geldt 3 jaar fabrieksgarantie, naast je wettelijke rechten. Lees voor gebruik de veiligheidsaanwijzingen in de handleiding." | Garantie (A10). Vage vergelijkende duurzaamheidsclaim (H3). Reputatie (A4). Veiligheid (A8). |
| `dopper-insulated-thermosfles-1-liter-zwart` | short "lekvrije"; "Lekvrij in de tas"; "dat bekend staat om …" | short "van 1 liter"; "Volgens Dopper lekvrij …"; "Dopper is een Nederlands merk van herbruikbare flessen." | Absolute claim nu toegeschreven aan de bron (zoals Basil bij 13:15). Reputatie (A4). |
| `gardena-snoeischaar-classic-18mm` | "met een bekend merk achter de kwaliteit" | geschrapt | Kwaliteits- en reputatieclaim zonder bron (A4) |
| `vtech-baby-mijn-eerste-stuurtje` | "die niet bij de verpakking zitten" | "die niet zijn meegeleverd" | Taal |
| `bosch-easyimpact-18v-40-klopboorschroevendraaier-set` | "Bosch geeft 3 jaar garantie bij registratie." | "Volgens Bosch geldt na registratie 3 jaar fabrieksgarantie, naast je wettelijke rechten." | A10 (conformiteit) |
| `clementoni-baby-speelkasteel-rollende-bal` | "deels van gerecycled kunststof" | "volgens Clementoni deels …" | Duurzaamheidsclaim toegeschreven aan de bron (ACM Leidraad Duurzaamheidsclaims) |
| `hape-meester-werkbank-35-gereedschappen` | "Alle gereedschap heeft …" | "Al het gereedschap heeft …" | Taal |
| `brio-builder-constructie-set-34587` | "met Bob de Bouwer als personage" | geschrapt | Een gelicentieerd personage bij BRIO Builder is niet aannemelijk en niet onderbouwd. Dat raakt een essentieel kenmerk (art. 6:193c BW). Zie U-14.2. |
| `brio-builder-starter-gereedschapskist-34586` | short "echt speelgoedgereedschap"; "Een betaalbare kennismaking" | "speelgoedgereedschap"; "Een kleine kennismaking" | Tegenstrijdig ("echt"). Prijsoordeel (A13). |
| `nerf-elite-2-0-volt-sd-1-blaster` | (geen) | "; richt nooit op ogen of gezichten" | Veiligheid, gelijk aan de Flip 8 (A8) |
| `nerf-elite-2-0-shockwave-rd-15-blaster` | (geen) | "; richt nooit op ogen of gezichten" | Veiligheid (A8) |
| `fisher-price-bedtijd-otter-knuffel` | short "… bij het slapen" | "… voor het slapengaan"; toegevoegd: "Gebruik de otter onder toezicht van een volwassene en leg hem niet in bed bij een slapende baby." | Product 0+. Advies voor veilig slapen: geen los speelgoed in bed bij een slapende baby (A8). Zie U-14.3. |
| `bosch-impact-control-35-delige-metaalboren-schroefbitset` | "Bosch geeft 1 jaar fabrieksgarantie." | "Volgens Bosch geldt 1 jaar fabrieksgarantie, naast je wettelijke rechten." | A10 (conformiteit) |
| `lego-speed-champions-toyota-gr-supra-76901` | "een breder chassis" | "een chassis" | Vergelijking zonder referentiepunt |
| `ravensburger-puzzel-bij-de-dinosaurussen-xxl-100` | "Een betaalbaar cadeau" | "Een klein cadeau" | Prijsoordeel (A13) |
| Gids `wellnesscadeau-voor-je-moeder`, intro | "wordt vaak vaker gebruikt" | "wordt vaak meer gebruikt" | Taal |

Er zijn geen prijzen, statussen, ratings, links, slugs of andere velden gewijzigd. Alleen stringwaarden in short en description zijn vervangen, plus één zin in de intro van de gids.

### Adviezen (open)
**U-14.1. Ratings met twijfel over herkomst (Catalogus).** Bij de NERF- en LEGO-sets is de rating om dezelfde reden leeggelaten, maar bij deze twee niet:
- `northwall-zijden-slaapmasker-oordopjes-zwart` toont 4,7 (218). Volgens de eigen notitie horen die reviews "deels bij een andere Northwall-listing".
- `beurer-mg135-shiatsu-massagekussen` toont 4,4 (92). Volgens de notitie "kan [dit] ook reviews van verwante modellen bevatten".

Voorstel: zet `rating` op `null` tot vaststaat dat de reviews bij dit product horen ("geen nepreviews"). Het is niet blokkerend, omdat bol de score op deze productpagina zo toont en de bron erbij staat. Ook kleine aantallen zijn inconsistent: `bosch-easyimpact-18v-40-klopboorschroevendraaier-set` toont 5,0 (2) en `brio-builder-pull-back-motor-set-34595` toont 4,5 (2). Elders wordt de rating bij 1–2 reviews leeggelaten.

**U-14.2. Productinhoud verifiëren (Catalogus):**
- `brio-builder-constructie-set-34587`: zit er een (gelicentieerd) figuur bij? Ik heb "Bob de Bouwer" voorzorgshalve geschrapt.
- `hape-multifunctionele-miniband-houten-muziekset`: "Er zit een AA-batterij bij" bij een houten instrumentenset zonder elektronica die wordt genoemd. Volgens de eigen notitie bevat het veld verpakkingsinhoud een fout. Controleer dit en schrap de zin als hij niet klopt.
- `adidas-tango-rosario-voetbal-wit`: "handgestikt". Controleer bij adidas of de bal hand- of machinegestikt is.
- `brio-trein-op-batterijen-33319`: de titel zegt "kiepwagon", de description "kolenwagon". Maak dit gelijk.
- `bosch-pro-impact-40-delige-mixed-boor-bitset`: de EAN (6949…) en de URL ("accesorios") wijken af van wat Bosch gewoonlijk gebruikt. Controleer of verkoper ToolMax.nl een origineel Bosch-product levert. Is dat twijfelachtig, pauzeer dan het product.
- `beurer-fb35-voetenbad`: de pagina toont meerdere uitvoeringen. Controleer dat de koopknop naar de uitvoering met aromafilter gaat die de tekst noemt.
- `fisher-price-loop-met-mij-zebra-looptrainer`: er bestaan varianten in andere talen. Controleer dat de link naar de Nederlandstalige uitvoering gaat, of zet in de tekst dat de taal per variant verschilt.

**U-14.3. Bedtijd Otter (Catalogus).** Vergelijk de toegevoegde zin over veilig slapen met de veiligheidsaanwijzingen van Fisher-Price. Is de fabrikant strenger of anders, neem dan die tekst over.

**U-14.4. Massage- en warmteapparaten breder (Catalogus, later).** De gids `wellnesscadeau-voor-je-moeder` toont via het filter ook oudere massagekussens, massagebanden en warmtekussens. Bijvoorbeeld de Beurer MG 149, MG 151, MG 139 en HK-warmtekussens. Voorstel: geef ook die teksten in een volgende ronde een korte zin "lees voor gebruik de veiligheidsaanwijzingen", en controleer dat er geen klachtclaims ("bij rugpijn") in staan.

**U-14.5. Gidsen: belooft de intro wat het filter toont (zoals U4)?** In `wellnesscadeau-voor-je-moeder` noemen de intro en de FAQ een handcrème, een warm kussen, een kaars en een deken. In `cadeau-moeder-15-25-euro` gaat het om lezen, thee/koffie, puzzelen en ontspannen. Die soorten producten bestaan in de catalogus. Voorstel (SEO-content): kijk op de preview of het filter ze ook echt binnen `voor: moeder` (en het budget) toont.

**U-14.6. Licht, niet aangepast.** De tekst van `tonys-chocolonely-proeverijtje-taart-288-gram` vermeldt "Fairtrade chocolade". Dat is een keurmerkclaim die op de bol-pagina staat. Prima, mits het Fairtrade-logo op de verpakking staat. Catalogus kan dat bij de volgende controle meenemen.

### Akkoord nodig?
Nee. Alleen productteksten en één zin in een gids zijn aangepast. Er zijn geen juridische pagina's, checkout, prijzen of statussen geraakt.

**COMPLIANCE: GO** voor de 45 actieve producten en de 2 gidsen van ronde 14:15. Er zijn geen blokkerende punten. U-14.1 en U-14.2 (vooral Bosch PRO en Miniband) bij voorkeur vóór de herlancering.

## Hertoets 15:15

Agent: Compliance · Werkkopie `main` (na commit ef1d6a0, ongecommitte wijzigingen in `data/products.json` en `lib/guides.ts`). Dit is geen formeel juridisch advies.

### Wat is getoetst
- **Producten (52, alle actief):** de slugs uit `data/research/shortlist-2026-11-20-moeder-oma-sport-tech-muziek-15.json` (27) en `data/research/shortlist-2026-11-20-kind-vader-opa-15.json` (31), zoals ze in `data/products.json` staan (r. 77502–80150). Velden: short en description, plus ageGroups bij kind-, tiener- en gameproducten.
  - Niet getoetst: `instax-mini-film-wit-2x10-stuks` en `lego-city-vintage-stoomtrein-60511` (concept); `canon-selphy-qx20-mobiele-fotoprinter-terracotta`, `soundcore-sleep-a20-slaapoordopjes-beige`, `tunturi-yoga-grid-foam-roller-33-cm-petrol` en `einhell-accu-universele-blazer-ge-ub-18-250` (niet opgenomen). Goed dat de Sleep A20 niet is opgenomen: de tekst ("voor wie echt moeite heeft met slapen", slaapmonitoring) lag dicht tegen een gezondheidsclaim aan.
- **Gidsen (2):** `cadeau-moeder-50-100-euro` (`lib/guides.ts` r. 1207) en `cadeau-opa-oma-25-50-euro` (r. 1230). De budgetsleutels `50-100` en `25-50` bestaan (`lib/types.ts` r. 42–43) en alle `related`-slugs bestaan.

### Wat goed is
- **Games alleen voor volwassenen:** `grand-theft-auto-vi-ps5-code-in-a-box` (PEGI 18), `marvels-wolverine-ps5` (PEGI 18) en `ea-sports-fc-27-ps5` (PEGI 16) staan alle drie alleen in `ageGroups: ["volwassen"]` met recipients vader/partner/vriend. PEGI 16 voor FC 27 klopt (nieuwe PEGI-regel voor betaalde willekeurige items, zie bron).
- **Geen** "voorraad bijna op", "laatste kans", "morgen in huis", adviesprijs of Black Friday in de publieke tekst; dat staat alleen in `scout.notes` (op één punt na, zie B-15.1).
- **Leeftijden:** geen product in 0–3. PLAYMOBIL-reddingsvoertuig (5+) noemt de leeftijd in de short; Speed Champions (9+), Wicket en Avengers (12+) staan in passende groepen. Modelbouw met verf en lijm (Airfix, Revell) staat alleen in volwassen.
- **Weerstandsbanden en sportproducten** beschrijven functies, geen gezondheidseffect. De Tunturi-foamroller (tekst "stijfheid verminderen") en de Sleep A20 zijn niet opgenomen; activeer ze niet zonder eerst de tekst aan te passen (A3). De walkietalkies noemen het bereik als "opgegeven" en zeggen dat het in de praktijk kleiner is. De Einhell-accu's en de Kobo Remote waarschuwen voor compatibiliteit.
- **Gidsen:** geen superlatieven, schaarste of reviewclaims. Wel: "wij sturen je door en verkopen zelf niets", "controleer de levertijd bij de winkel", "prijzen kunnen wijzigen; we tonen de controledatum", en een retourtip. "Een duurder cadeau is niet automatisch een beter cadeau" is eerlijk advies.

### Blokkerende punten
**B-15.1 (opgelost door tekstcorrectie): aanbiedingsclaim in een actief product.** `soundcore-liberty-5-draadloze-oordopjes` had in de short "…van Anker, in de aanbieding." Dat valt onder B1 (korting/deal in statische tekst, Omnibus). Zin geschrapt. Verder geen blokkerende punten.

### Direct doorgevoerde tekstcorrecties (22 slugs plus 1 gids)
| Slug | Was | Nu | Waarom |
|---|---|---|---|
| `soundcore-liberty-5-draadloze-oordopjes` (short) | "…van Anker, in de aanbieding." | "…van Anker." | B-15.1 |
| `beurer-mg-99-massage-gun` | short "Een draadloze massagepistool … voor stijve spieren"; "De fabrikant geeft drie jaar garantie."; "na een lange dag stijve schouders heeft" | "Een draadloos massagepistool … voor na het sporten"; "Volgens de fabrikant geldt 3 jaar fabrieksgarantie, naast je wettelijke rechten."; "na een lange dag wil ontspannen. Geen medisch hulpmiddel; lees voor gebruik de veiligheidsaanwijzingen." | A3 (klacht + oplossing), A10, A8, spelling (het pistool) |
| `grand-theft-auto-vi-ps5-code-in-a-box` | short "De nieuwe GTA …"; "Het nieuwste deel van de GTA-reeks" | "GTA VI voor PlayStation 5 (PEGI 18) …"; "Het zesde hoofddeel van de GTA-reeks" | H5 (tijdgebonden), PEGI in de short |
| `ea-sports-fc-27-ps5` | short "De nieuwste voetbalgame …"; "Het nieuwe deel …"; "PEGI 16." | "Voetbalgame van EA voor PS5 (PEGI 16) …"; "Het deel van 2026 …"; "PEGI 16, vanwege betaalde willekeurige items in de game." | H5, PEGI in de short; de reden voorkomt verwarring met eerdere delen (PEGI 3) |
| `lego-marvel-avengers-doomsday-nieuwe-avengers-toren-76352` | "Een groot en nieuw cadeau" | "Een groot cadeau" | H5 |
| `polaroid-go-gen-3-white` | short "De kleinste Polaroid-camera … in klassiek lijstje"; "Er zijn nog geen reviews op de pagina, dus dit is een nieuwer model." | "Een kleine Polaroid-instantcamera in wit, voor afdrukken met het bekende Polaroid-lijstje."; zin geschrapt | Superlatief zonder bron; statische reviewstatus (A4) en H5 |
| `denver-pocket-printer-mcp6010-wit` | short "Een betaalbare mini fotoprinter"; "Een goedkoper alternatief voor de merkprinters" | "Een mini fotoprinter"; "Een alternatief voor de fotoprinters" | A13 (prijsoordeel, prijsvergelijking) |
| `denver-vpl-120-platenspeler-zwart` (short) | "Een betaalbare retro-platenspeler …" | "Een retro-platenspeler met ingebouwde speakers en auto-stop." | A13 |
| `lego-star-wars-bb-8-astromech-droid-75452` | "Een betaalbare Star Wars-set" | "Een kleinere Star Wars-set" | A13 |
| `jbl-tuner-xl-dab-radio-bluetooth-zwart` | "geeft ruimer geluid dan een kleine speaker" | "geeft een ruimer geluid" | H4 (vergelijking) |
| `instax-mini-link-pocket-printer-ash-white` | "in ongeveer een kwartminuut" | "na ongeveer vijftien seconden" | Taal |
| `soundcore-sport-x20-anc-oordopjes-wit` | "zodat je verkeer nog hoort" | "zodat je meer van je omgeving hoort; let in het verkeer altijd goed op" | Veiligheidsbelofte (A8) |
| `denver-digitale-fotolijst-pff1070b-oplaadstation` (short) | "Een draadloze fotolijst … zonder snoer in de woonkamer" | "Een fotolijst met eigen accu en oplaadstandaard, zodat hij ook een tijd zonder snoer kan staan." | Het oplaadstation heeft een snoer; absolute claim over een essentieel kenmerk |
| `denver-senioren-mobiele-telefoon-4g-bas24800l` | "Er hoort een oplaadstation bij. … die gewoon wil bellen en appen." | "…; een simkaart zit er niet bij. … die vooral wil bellen en sms'en." | Een telefoon "zonder ingewikkelde apps" belooft geen WhatsApp; simkaart apart is essentiële info (art. 6:193d BW) |
| `wera-kraftform-xxl-schroevendraaierset-12-delig` | "geïsoleerd tot 1000 volt"; "Een cadeau waar een vader jaren plezier van heeft." | "De isolatie is volgens VDE getest tot 1000 volt; werk thuis altijd spanningsloos."; "…, bijvoorbeeld een vader met een eigen werkplek." | Veiligheid (zoals 13:15); levensduurbelofte |
| `playmobil-pirates-groot-piratenschip-71530` | "kan ook mee in bad of het zwembad" | "kan onder toezicht ook mee in bad of het zwembad" | Veiligheid bij waterspel (A8) |
| `lego-city-passagiersvliegtuig-60367` (short) | (geen leeftijd) | "…, vanaf 7 jaar." | 7+ in 4–7 (A9) |
| `lego-city-centraal-station-60469` (short) | "bij uitstek een set voor een treinfan" | "voor een treinfan vanaf 7 jaar" | A9; superlatief |
| `lego-jurassic-world-mosasaurus-bootaanval-77983` (short) | "ruim 700 onderdelen" | "met zo'n 700 onderdelen, vanaf 7 jaar" | A9; aantal onderdelen onzeker volgens de notitie |
| `carrera-go-mario-kart-p-wing-mario-vs-yoshi-4-9m` (short) | "voor twee spelers" | "voor twee spelers vanaf 6 jaar" | 6+ in 4–7 (A9); zie U-15.2 |
| `lego-star-wars-mandalorian-grogu-zweefkinderwagen-75403` (short) | (geen leeftijd) | "…, vanaf 10 jaar." | 10+ in 8–12 (A9) |
| `vtech-kidizoom-printcam-graffiti-roze` (short) | (geen leeftijd) | "…, vanaf 5 jaar." | 5+ in 4–7 (A9) |
| Gids `cadeau-moeder-50-100-euro`, intro | "waar ze zich soms aan ergert of iets voor mist" | "waar ze zich soms aan ergert of wat ze mist" | Taal |

Er zijn geen prijzen, statussen, ratings, ageGroups, links, slugs of andere velden gewijzigd. Alleen stringwaarden in short en description zijn vervangen, plus één zin in de intro van een gids.

### Adviezen (open)
**U-15.1. Ratings op 1–2 reviews of van andere producten (Catalogus, zoals U-14.1).** Elders wordt de rating bij 1–2 reviews leeggelaten, hier niet: `airfix-d-day-fighters-geschenkset-50192` 5,0 (1), `lego-jurassic-world-mosasaurus-bootaanval-77983` 5,0 (1), `lego-marvel-avengers-doomsday-nieuwe-avengers-toren-76352` 5,0 (1), `wera-kraftform-xxl-schroevendraaierset-12-delig` 4,5 (2) en `instax-mini-41-instant-camera-zwart` 4,0 (2). Bij `rubye-diamond-painting-japanse-tuin-30x40` toont de rating 4,5 (2053), maar de bron zegt zelf "score geldt voor alle Rubye-pakketten". Voorstel: in alle zes gevallen `rating` op `null` ("geen nepreviews").

**U-15.2. Productgegevens verifiëren (Catalogus, zoals A11/U1):**
- `carrera-go-mario-kart-p-wing-mario-vs-yoshi-4-9m`: de description zegt nog "De beschrijving noemt vanaf 6 jaar, de specificaties noemen 14 jaar." Controleer bij Carrera. Is het 6+, schrap dan die zin. Is het hoger, haal "4-7" weg en pas de short aan. Er staat ook nog geen rating (nieuw product).
- `onemelon-drops-draadloze-oordopjes-slapen`: "De pagina is niet eenduidig over de bluetooth-versie". Opnieuw controleren en de zin schrappen.
- `denver-senioren-mobiele-telefoon-4g-bas24800l`: het modelnummer wisselt op de pagina (BAS24800L/BAS18800L). Controleer welk model de klant krijgt, en of het toestel WhatsApp ondersteunt; zo ja, dan mag "appen" terug.
- `beurer-mg-99-massage-gun`: accuduur 4 of 5 uur op de pagina (noemen we niet, prima zo laten).
- `lego-city-passagiersvliegtuig-60367` (913 of 930 onderdelen) en de mosasaurus: aantallen staan nu als "zo'n/ruim", dat is in orde.

**U-15.3. Gidsen: belooft de intro wat het filter toont (zoals U4/U-14.5)?**
- `cadeau-moeder-50-100-euro` noemt "iets voor in de keuken, een apparaat voor thuis of iets om bij te ontspannen" en in de tips "koffie, koken of lezen". In deze ronde zijn vooral fotoprinters, radio's, platenspelers en oordopjes toegevoegd. Keukenspullen tussen €50 en €100 voor moeder moeten er ook zijn.
- `cadeau-opa-oma-25-50-euro` noemt "de krant, de tuin" en in de FAQ "goede koffie of thee".

Voorstel (SEO-content): op de preview nakijken en anders de opsomming aanpassen.

**U-15.4. Licht, niet aangepast.**
- `soundcore-sport-x20-anc-oordopjes-wit` ("Reviewers noemen de pasvorm prettig, ook met een bril") en `soundcore-liberty-5-…` ("Een reviewer vindt de microfoon voor bellen niet sterk"): kwalitatieve reviewsamenvattingen zonder aantal. De tweede is juist eerlijk; de eerste kan neutraler ("De oorhaakjes passen ook met een bril, volgens reviewers").
- `onemelon-drops-…`: "ook geschikt om mee te slapen" is een gebruiksclaim, geen gezondheidsclaim. In orde zolang er geen effect op de slaap wordt beloofd.
- `einhell-twinpack-…`: "voor alle Einhell Power X-Change-gereedschap" is de claim van Einhell zelf; eventueel "volgens Einhell".
- `denver-digitale-fotolijst-10-1-inch-pff1012b`: "wifi-fotolijst" staat in de short. Prima; de notitie "werkt alleen met wifi en de Frameo-app" is daarmee gedekt.

### Akkoord nodig?
Nee. Alleen productteksten en één gidszin zijn aangepast. Er zijn geen juridische pagina's, checkout, prijzen of statussen geraakt.

**COMPLIANCE: GO** voor de 52 actieve producten en de 2 gidsen van ronde 15:15. Het enige blokkerende punt (B-15.1, aanbiedingsclaim) is met een tekstcorrectie opgelost. U-15.1 en U-15.2 (Carrera en seniorentelefoon) bij voorkeur vóór de herlancering.

Bron PEGI FC 27: [PC Gamer — EA Sports FC 27 gets a PEGI 16 rating in Europe because of loot boxes](https://www.pcgamer.com/gaming-industry/ea-sports-fc-27-gets-a-pegi-16-rating-in-europe-because-of-loot-boxes/)

## Hertoets 16:15

Agent: Compliance · Werkkopie `main` (na commit 46160b3, ongecommitte wijzigingen in `data/products.json` en `lib/guides.ts`). Dit is geen formeel juridisch advies.

### Wat is getoetst
- **Producten (65, alle actief):** de slugs uit `data/research/shortlist-2026-11-20-vrouw-tuin-muziek-opa-16.json` (34) en `data/research/shortlist-2026-11-20-jongen-vader-gamen-16.json` (36), zoals ze in `data/products.json` staan (r. 80131–83488). Velden: title, short, description en rating, plus ageGroups bij kind-, tiener- en hobbyproducten.
  - **Vrouw/tuin/muziek/opa: 33 actief.** `999-games-clever-dobbelspel` staat op concept en `storvik-molde-kniestukken-knielappen` is niet opgenomen; beide niet getoetst.
  - **Jongen/vader/gamen: 32 actief.** Op concept en niet getoetst: `squago-walkie-talkie-set-3-stuks`, `wilson-nba-team-tribute-basketbal-maat-7`, `8bitdo-ultimate-2c-draadloze-controller-roze` (tekst noemt nog "controleer dat op de pagina") en `fitage-massage-gun-mini-zwart` (tekst noemt nog "controleer dat vóór publicatie"). Die zinnen moeten eruit vóór activeren.
- **Gidsen (2):** `cadeau-kind-50-100-euro` (`lib/guides.ts` r. 1254) en `cadeau-vader-onder-15-euro` (r. 1278). De budgetsleutels `50-100` en `tot-15` bestaan (`lib/types.ts` r. 40 en 43) en alle `related`-slugs bestaan.

### Wat goed is
- **Geen** korting, deal, adviesprijs, Black Friday, "actieprijs", "voorraad bijna op", "morgen in huis" of "op=op" in de publieke tekst. "(dealprijs)" en "(actieprijs)" staan alleen in `scout.notes` (imoshion, BP-drumstel, Soundcore 2 en Boom 3i).
- **Medisana MG 150:** "Spierherstel" uit de winkeltitel is niet overgenomen. De tekst beschrijft alleen functies. Er staan geen gezondheidsclaims bij de scheerapparaten, zwembrillen of knielkussens (op één zin na, zie tabel).
- **Leeftijden:** er zit geen product in 0–3. Bluey-karaoke en Bluey-walkietalkies (3+) staan in 4–7 en noemen de leeftijd. Kruzzel (3+, onder toezicht) staat in 4–7. Het BP-drumstel (6+) staat in 8–12 en 13–17. Robotime, Rubik's Coach en Phantom (8+) staan in passende groepen. Modelbouwlijm en -verf (Revell, Tamiya) staan alleen in "volwassen" met recipients vader/vriend; de Revell-verf noemt 16+.
- **Ratings:** waar de reviews bij een ander model of een andere editie horen, is de rating al leeggelaten (Esschert Eikel, Keer op Keer ×2, Rubik's ×3, Robotime ×2). Hetzelfde geldt bij 1–3 reviews (Gardena Comfort, Speedo Hydrosity, Soundcore 2, Bresser, Lexibook, 8BitDo).
- **Walkietalkies en elektronica** noemen het bereik als "ongeveer" of "volgens de pagina". Er staat ook bij dat batterijen niet zijn meegeleverd en dat de toestellen niet waterdicht zijn.
- **Gidsen:** er staan geen superlatieven, schaarste of reviewclaims in. Wel: "wij sturen je door en verkopen zelf niets", "controleer de levertijd bij de winkel" en "prijzen kunnen wijzigen; we tonen de controledatum". In de kindergids staat ook "let op de leeftijdsaanduiding … en of er batterijen nodig zijn", en de vadergids wijst op verzendkosten bij kleine bedragen.

### Blokkerende punten
**Geen.** Er is geen product op concept gezet.

### Direct doorgevoerde correcties (32 slugs plus 1 gids)
| Slug | Was | Nu | Waarom |
|---|---|---|---|
| `ravensburger-puzzel-weihnachtszeit-kerst-1000-stukjes` | "Een winterse kersttafereel"; "Een klein, betaalbaar cadeau" | "Een winters kersttafereel"; "Een klein cadeau" | Taal (het tafereel). Prijsoordeel (A13). |
| `esschert-design-vogelhuisje-winterkoning-nestkast-bruin` | "Het past in elke tuin"; "Een betaalbaar cadeau"; rating 4,3 (54) | "Het kan in de tuin of … aan de gevel hangen"; "Een klein cadeau"; rating `null` | Absolute claim. A13. Dezelfde score 4,3 (54) staat bij de Eikel, en volgens de notitie daar hoort die deels bij een ander Esschert-model (geen nepreviews, U-14.1). |
| `esschert-design-nestkast-eikel-winterkoning` | "Een leuk en tuinvriendelijk cadeau" | "Een leuk cadeau" | Vage milieuclaim (H3) |
| `gardena-comfort-gereedschap-set-3-stuks` | short "voor planten, wieden en snoeien"; "Een compleet beginnetje"; "Gardena staat bekend om degelijk handgereedschap met een prettige grip." | short "voor in de tuin of op het balkon"; "Een setje handgereedschap …; welke drie onderdelen erin zitten, zie je op de winkelpagina." | Volgens de notitie is niet gecontroleerd welke 3 stuks erin zitten. Dan geen functies of "compleet" claimen (essentiële kenmerken, art. 6:193c BW). Reputatieclaim (A4). |
| `speedo-biofuse-2-0-zwembril-zwart-smoke` (short) | "Een bekende zwembril" | "Een zwembril" | Reputatieclaim (A4) |
| `speedo-biofuse-2-0-zwembril-dames-blauw` | "De glazen zijn anti-condens en beschermen tegen UV-straling." | "De glazen zijn volgens Speedo …" | Beschermingsclaim (ogen) toegeschreven aan de bron |
| `jbl-clip-5-bluetooth-speaker-paars` | "op wandel" | "tijdens een wandeling" | Taal |
| `ace-padel-nexo-lite-padelracket-beginners` | "Een goede eerste racket" | "Een racket" | Oordeel zonder onderbouwing; ook taal (het racket) |
| `virtufit-control-padelracket-wit-zwart-beginners` | short "Een betaalbaar padelracket"; "Een voordelig cadeau" | "Een padelracket"; "Een cadeau" | A13 |
| `jaxplore-nordic-walking-stokken-opvouwbaar-110-135` | "Een gezond cadeau voor wie graag wandelt." | "Een cadeau voor wie graag wandelt." | Gezondheidsclaim (A3, zoals Abbey Camp bij 14:15) |
| `knielkussen-tuin-groen-set-van-2` | "Ze beschermen de knieën"; "Een handig en betaalbaar cadeau" | "Ze liggen zacht onder de knieën"; "Een handig cadeau" | Beschermingsclaim bij een merkloze schuimmat (A3). A13. |
| `elho-essential-bee-hotel-18cm-fibrous-grey` | short "van gerecycled plastic"; "gemaakt van gerecycled materiaal"; "Een duurzaam cadeau" | "volgens Elho van gerecycled plastic"; "volgens de fabrikant gemaakt van gerecycled plastic"; "Een cadeau" | Duurzaamheidsclaim toegeschreven aan de bron en vage claim geschrapt (ACM Leidraad Duurzaamheidsclaims, H3) |
| `qubis-bonsai-starters-kit-kweekset` | (geen) | "Let op: volgens de winkelpagina kan dit artikel niet retour." | Volgens de notitie geldt er geen retour. Onze gidsen spreken over terugsturen binnen de bedenktijd, dus dit is essentiële informatie (art. 6:193d BW). |
| `soundcore-2-bluetooth-speaker-zwart` | "Een betaalbaar muziekcadeau" | "Een muziekcadeau" | A13. Volgens de notitie is het een actieprijs die na Black Friday kan stijgen. |
| `voltano-dubbele-fietstas-rolltop-48-liter-zwart` (short) | "Een waterdichte dubbele fietstas" | "…, volgens de verkoper waterdicht." | Absolute claim toegeschreven aan de bron (zoals Basil bij 13:15). De description deed dat al. |
| `999-games-keer-op-keer-dobbelspel` (short) | "Een populair Nederlands dobbelspel …, leuk met elk gezelschap" | "Een Nederlands dobbelspel …, goed te spelen met een gemengd gezelschap" | Populariteitsclaim (H1); absolute claim |
| `hyperx-chargeplay-quad-switch-oplaadstation` | (geen) | "Gemaakt voor de Joy-Cons van de eerste Nintendo Switch; controleer bij de winkel of het past als iemand een Switch 2 heeft." | Essentieel kenmerk; Joy-Con 2 heeft een andere aansluiting (zoals Hori bij 13:15). Staat ook in 8–12. |
| `medisana-mg-150-massage-gun-mini` | short "Een draadloze massagepistool"; (geen kanttekening) | "Een draadloos massagepistool"; "Geen medisch hulpmiddel; lees voor gebruik de veiligheidsaanwijzingen." | Taal. Gelijk aan Beurer MG 99 (A3/A8). De winkeltitel noemt "Spierherstel". |
| `spalding-silver-series-basketbal-outdoor-maat-7` | "een slijtvaste rubberen buitenlaag en is geschikt" | "een rubberen buitenlaag en is bedoeld" | Volgens de notitie melden reviews snelle slijtage; de claim "slijtvast" is dan niet te onderbouwen |
| `robotime-rolife-zappelin-houten-bouwpakket` (short) | (geen leeftijd) | "…, vanaf 10 jaar." | 10+ in 8–12 (A9) |
| `coole-kids-koken-jenny-chandler` | (geen) | "; laat een volwassene helpen bij messen, oven en fornuis." | Veiligheid in 4–7 en 8–12 (zoals het kookboek bij 13:15) |
| `bellatio-skate-beschermset-maat-m-6-8-jaar` | (geen) | "Een helm zit er niet bij; combineer de set met een goed passende helm." | De short noemt een "complete set". Veiligheid bij een kinderproduct (A8). |
| `thrustmaster-y-300cpx-gaming-headset-wit` | "De pagina is op sommige punten tegenstrijdig over kabellengte en driverformaat." | geschrapt | A11. We noemen kabellengte en driver niet, dus de zin voegt alleen twijfel toe. |
| `philips-s1151-00-scheerapparaat-series-1000` | "Een degelijke basismodel voor wie lichte baardgroei of een gevoelige huid heeft." | "Een eenvoudig basismodel voor wie lichte baardgroei heeft." | Taal. Huidclaim zonder bron. |
| `revell-contacta-professional-modelbouwlijm-25g` | "voor wie een bouwpakket cadeau krijgt" | "voor een volwassene die …"; toegevoegd: "De lijm bevat oplosmiddelen: gebruik hem in een geventileerde ruimte en bewaar hem buiten bereik van kinderen." | Oplosmiddelen niet bij kinderen aanprijzen. De notitie noemt chemische stoffen. |
| `revell-contacta-liquid-lijm-met-kwast-18g` | "past bij een bouwpakket." | "… voor een volwassene." en dezelfde waarschuwing | Idem |
| `tamiya-87038-extra-thin-cement-met-kwast` | "kan tijdens gebruik ontvlambaar worden, lees dus eerst het etiket" | "De lijm is ontvlambaar en bevat oplosmiddelen: lees eerst het etiket, gebruik hem in een geventileerde ruimte en bewaar hem buiten bereik van kinderen." | Veiligheid. De oude zin onderschatte het risico. |
| `revell-hobbyverf-enamel-basic-colours-6x14ml` | "buiten bereik van kinderen bewaren" | "gebruik de verf in een geventileerde ruimte en bewaar hem buiten bereik van kinderen" | Enamelverf bevat oplosmiddelen |
| `bresser-junior-microscoop-40-640x-experimenteerset` | (geen) | "Controleer bij de winkel of er batterijen bij zitten." | Volgens de notitie zitten de 2x AA mogelijk niet bij (essentiële info) |
| `toobs-kinderbakset-26-delig-schort-recepten` | "Een leeftijd wordt niet vermeld." | "…; bakken met oven en spuitzak doe je samen met een volwassene." | Echt bakken in 4–7 en 8–12 (A8) |
| `jenga-vernieuwde-editie-digitale-dobbelsteen` (short) | "…, nu met een digitale dobbelsteen." | "…, in een versie met digitale dobbelsteen, vanaf 6 jaar." | "Nu" is tijdgebonden (H5). 6+ in 4–7 (A9). |
| `rubiks-cube-3x3-sleutelhanger` | "Een klein cadeau voor onder de €10" | "Volgens de pagina niet geschikt voor kinderen onder 8 jaar (kleine onderdelen); de aanbevolen leeftijd op de pagina is 14 jaar. Een klein cadeau" | Statische prijsclaim (A13). Leeftijd staat in de notitie maar niet in de tekst, terwijl het product in 8–12 staat. |
| Gids `cadeau-vader-onder-15-euro`, intro | "of iets lekkers voor bij de borrel" | "of iets lekkers" | "Borrel" verwijst naar alcohol, en de catalogus heeft geen alcohol. Zo belooft de gids niets dat er niet is. |

Alleen de velden short, description en rating (1×) zijn gewijzigd, plus één zin in een gidsintro. Er zijn geen prijzen, statussen, ageGroups, links of slugs gewijzigd. De JSON-opbouw en de inspringing zijn ongewijzigd.

### Adviezen (open)
**V1. Leeftijdsindeling (Catalogus).**
- `rubiks-cube-3x3-sleutelhanger` staat in 8–12 met recipient `kind`, maar de pagina noemt 14+ als aanbevolen leeftijd. De veiligheidsgrens is 8 jaar, dus dit is niet blokkerend. Voorstel: haal "8-12" en `kind` weg, of controleer bij Spin Master welke leeftijd geldt.
- `toobs-kinderbakset-26-delig-schort-recepten` en `coole-kids-koken-jenny-chandler` staan in 4–7 zonder leeftijdsadvies van de fabrikant of uitgever (zoals U2). Voorstel: controleer de leeftijd op de verpakking of de uitgeverssite.
- `imoshion-sing-shine-karaokeset-discolamp` (8–12) en `bresser-junior-microscoop-…` (8–12) hebben geen minimumleeftijd op de pagina. Dat is een licht punt.

**V2. Ratings met mogelijk gedeelde reviews (Catalogus, zoals U-14.1).** `craved-padelracket-elite-pro-roze-zwart` 4,7 (57), `no-peak-padelracket-…` 4,5 (35), `ace-padel-nexo-lite-…` 4,9 (14) en `virtufit-control-…` 5,0 (6). Volgens de notities horen de reviews deels bij andere kleurvarianten van hetzelfde model. Dat is gebruikelijk bij bol en daarom niet aangepast. Controleer of het echt hetzelfde model is; is dat niet zo, zet dan `rating` op `null`.

**V3. Productinhoud verifiëren (Catalogus, zoals A11):**
- `gardena-comfort-gereedschap-set-3-stuks` en `gardena-city-gardening-balkonset`: de inhoud van de set is niet gecontroleerd. Controleer de inhoud en noem die in de short.
- `esschert-design-vogelhuisje-winterkoning-nestkast-bruin`: de afmetingen zijn niet consistent. Die noemen we niet, dus dit is in orde.
- `soundcore-boom-3i-outdoor-speaker`: in de titel staat "waterdicht", de pagina noemt IP68 of IPX7. Beide zijn waterdicht, dus dit is in orde.
- `qubis-bonsai-starters-kit-kweekset`: controleer de geen-retourzin bij bol. Klopt die niet, schrap hem dan.

**V4. Concepten vóór activeren.** Uit `8bitdo-ultimate-2c-…` en `fitage-massage-gun-mini-zwart` moeten de interne zinnen ("controleer dat op de pagina", "controleer dat vóór publicatie") weg. De FITAGE-tekst is verder neutraal; voeg bij activeren dezelfde zin "Geen medisch hulpmiddel; lees voor gebruik de veiligheidsaanwijzingen" toe. De winkeltitel zegt "Professioneel Massage Apparaat"; neem dat niet over.

**V5. Gidsen: belooft de intro wat het filter toont (zoals U4/U-15.3)?**
- `cadeau-kind-50-100-euro` noemt "racen" en "buiten spelen". De Carrera-baan staat sinds 15:15 op concept.
- `cadeau-vader-onder-15-euro` noemt "iets bij de koffie, een handig hulpmiddel voor in de schuur of de auto". In deze ronde zitten onder €15 vooral modelbouwlijm, Rubik's en Jenga.

Voorstel (SEO-content): kijk op de preview of het filter (`voor` + `budget`) die soorten producten toont, en pas anders de opsomming aan.

**V6. Licht, niet aangepast.**
- `garden-spirit-…` "FSC-gecertificeerd hout" is een keurmerkclaim die op de winkelpagina staat. Dat is in orde, mits het logo op het product of de verpakking staat.
- `garden-spirit-insectenhotel-…` "voor wie iets voor de natuur wil doen" is een algemene omschrijving en geen milieuclaim over het product zelf.
- `coole-kids-koken-…` "Reviewers noemen kinderen van 6 en 7 jaar" is een kwalitatieve reviewsamenvatting. Die mag weg zodra er een leeftijd van de uitgever bekend is.

### Akkoord nodig?
Nee. Alleen productteksten, één rating en één gidszin zijn aangepast. Er zijn geen juridische pagina's, checkout, prijzen of statussen geraakt.

**COMPLIANCE: GO** voor de 65 actieve producten en de 2 gidsen van ronde 16:15. Er zijn geen blokkerende punten. V1 (Rubik's-sleutelhanger) en V3 (Gardena-inhoud) bij voorkeur vóór de herlancering.
