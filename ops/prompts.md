# Prompts voor Claude

Kopieer een prompt uit het dashboard (`/admin` → "Prompts voor Claude") en plak hem in Claude Code in de map `~/Projects/cadeausite`.
Tekst tussen [vierkante haken] vul je zelf in. Agents geven nooit geld uit en versturen niets zonder jouw akkoord.

Opbouw per prompt: `## Titel`, dan de regels `Agent:`, `Wanneer:`, `Nodig van jou:`, en de prompt in een ```text-blok.

# Elke dag

## Dagstart
Agent: orchestrator
Wanneer: elke ochtend, of als je wilt weten waar alles staat
Nodig van jou: niets

```text
Doe de dagstart als orchestrator. Lees ops/status/agents.json, de laatste regels van ops/activity.jsonl, ops/owner-todo.md, ops/vragen-eigenaar.md en ops/approvals/. Bepaal wat vandaag het belangrijkst is voor omzet vóór Sinterklaas (bezorgd uiterlijk vr 4 dec) en kerst (do 24 dec). Start de agents die zonder mij verder kunnen, schrijf het dagrapport in ops/daily/<datum van vandaag>.md, werk agents.json en activity.jsonl bij, commit en push. Eindig met maximaal 5 dingen die ík vandaag moet doen, in volgorde van belang.
```

## Wat moet ik nu doen?
Agent: orchestrator
Wanneer: als je niet weet wat de volgende stap is
Nodig van jou: niets

```text
Kijk in ops/owner-todo.md, ops/vragen-eigenaar.md en ops/approvals/ wat er nog van mij nodig is. Geef de 3 dingen die nu het meeste opleveren, met per ding precies waar ik moet klikken en wat ik moet invullen. Zet niets aan en verstuur niets.
```

# Producten

## Meer producten verzamelen
Agent: product-scout, catalogus
Wanneer: als een doelgroep of prijsklasse weinig producten heeft
Nodig van jou: niets (links verdienen pas geld na de affiliate-aanmeldingen)

```text
Laat de product-scout en de catalogus-agent samen de catalogus uitbreiden. Kijk eerst in data/products.json welke doelgroepen, leeftijden en budgetten het minst actieve producten hebben en richt je daarop: [optioneel: bijv. "kinderen 4-8 jaar onder €25" of "cadeaus voor hem"]. Doel: [aantal, bijv. 20] nieuwe producten. Alleen Nederlandse winkels die op tijd leveren, geen China/Azië-leveranciers, geen nepkorting of nepreviews. Zet een product alleen op actief als de prijs vandaag op de productpagina is gecontroleerd; de rest blijft concept. Bouw daarna (npm run build), werk de ops-bestanden bij, commit en push, en vertel me hoeveel er actief zijn per doelgroep.
```

## Prijzen en links hercontroleren
Agent: catalogus
Wanneer: elke 48 uur (eerstvolgende: vóór do 19 nov)
Nodig van jou: niets

```text
Laat de catalogus-agent alle actieve producten in data/products.json hercontroleren: klopt de prijs nog, is het product leverbaar en werkt de link? Pas prijzen aan die veranderd zijn, zet onleverbare producten op gepauzeerd en geef priceCheckedAt de datum van vandaag. Log wat er veranderd is, bouw, commit en push.
```

## Producten van een andere winkel toevoegen
Agent: catalogus
Wanneer: zodra een affiliate-netwerk (Awin, TradeTracker, Daisycon) je heeft goedgekeurd
Nodig van jou: de sleutels in .env.local en in Vercel

```text
Ik ben goedgekeurd bij [Awin / TradeTracker / Daisycon] voor [winkel(s), bijv. Coolblue en HEMA] en heb de sleutels in .env.local en in Vercel gezet. Laat de catalogus-agent de productfeed ophalen (scripts/sync-feeds.mjs afmaken als dat nodig is), de bestaande concept-producten van die winkels koppelen aan de feed met de juiste affiliate-link, prijzen uit de feed overnemen en ze op actief zetten. Bouw, commit en push.
```

# Live gaan

## Bol-partner-ID verwerken
Agent: developer
Wanneer: als je bij partner.bol.com bent goedgekeurd
Nodig van jou: je Site-ID

```text
Ik ben goedgekeurd bij het bol partnerprogramma en heb NEXT_PUBLIC_BOL_SITE_ID in Vercel (Production en Preview) en in .env.local gezet. Controleer dat alle bol-links via /uit/[slug] nu de partnerlink met mijn Site-ID gebruiken, test een paar links, werk ops/owner-todo.md bij, commit en push.
```

## Cookiebanner en Consent Mode bouwen
Agent: developer, compliance
Wanneer: vóór je advertenties of statistieken aanzet
Nodig van jou: niets om te bouwen; later je GA4- en Meta-ID's

```text
Laat de developer een cookiebanner bouwen met Google Consent Mode v2: standaard alles geweigerd, kiezen tussen "alleen noodzakelijk" en "alles accepteren" even makkelijk, keuze later te wijzigen via een link in de footer. GA4, Meta Pixel en Pinterest Tag laden pas na toestemming en alleen als hun ID in de omgevingsvariabelen staat. Laat de compliance-agent het daarna toetsen aan ops/compliance-checklist.md en de cookiepagina bijwerken. Tests en build moeten slagen; commit en push.
```

## Livegang voorbereiden
Agent: compliance, qa
Wanneer: als KvK, domein en bedrijfsgegevens rond zijn
Nodig van jou: je akkoord op de livegang (pas aan het eind)

```text
Bereid de livegang voor. Mijn gegevens: bedrijfsnaam [..], adres [..], e-mail [..], telefoon [..], KvK [..], btw-id [..], domein [..]. Zet ze in lib/site.ts. Laat daarna de compliance-agent de hele site toetsen aan ops/compliance-checklist.md en de QA-agent alles testen (links, mobiel, snelheid, toegankelijkheid). Maak een akkoordverzoek in ops/approvals/ met wat er live gaat, wat er nog ontbreekt en de stappen die ík in Vercel moet doen (domein koppelen, Deployment Protection uit, NEXT_PUBLIC_INDEXABLE=true). Zet zelf nog niets live.
```

## Akkoord op livegang geven
Agent: developer
Wanneer: als het akkoordverzoek voor de livegang klaar staat en je het hebt gelezen
Nodig van jou: dit akkoord

```text
Ik geef akkoord op de livegang zoals beschreven in ops/approvals/[bestandsnaam]. Zet de status op AKKOORD, log het in ops/decisions.md en vertel me precies welke instellingen ik nu in Vercel moet veranderen. Controleer daarna of de site bereikbaar is op [domein].
```

# Advertenties

## Advertenties voorbereiden
Agent: advertentie-maker, compliance
Wanneer: nu al mogelijk; uitgeven pas na livegang en jouw akkoord
Nodig van jou: niets om te maken; akkoord per campagne

```text
Laat de advertentie-maker de eerste experimenten maken volgens ops/ads-framework.md: Google Search, Meta en Pinterest, plus organische posts voor TikTok, Instagram en Pinterest. Gebruik alleen actieve producten met een gecontroleerde prijs en noem echte uiterste besteldata. Let op: Google Shopping kan niet met affiliate-producten; gebruik Google Search, Meta en Pinterest. Per experiment: hypothese, doelgroep, landingspagina, budget, start/eind en succescriterium. Laat de compliance-agent alles toetsen. Zet het geheel als akkoordverzoek in ops/approvals/ met het totale budget per kanaal. Geef niets uit.
```

## Advertentieaccounts koppelen
Agent: developer
Wanneer: als je Google Ads, GA4, Meta Business en/of Pinterest Business hebt aangemaakt
Nodig van jou: de ID's in Vercel (betaalmethode voeg je zelf toe)

```text
Ik heb [GA4 / Meta Pixel / Pinterest Tag / Google Ads] aangemaakt en de ID's in Vercel en .env.local gezet: [namen van de variabelen]. Controleer dat de tags pas na cookietoestemming laden, dat aankopen en uitgaande klikken als conversie worden gemeten en dat er niets meegaat zonder toestemming. Werk ops/owner-todo.md bij, commit en push.
```

## Akkoord op een campagne geven
Agent: advertentie-beoordelaar
Wanneer: als je een advertentievoorstel hebt goedgekeurd
Nodig van jou: dit akkoord, met bedrag

```text
Ik geef akkoord op de campagne(s) in ops/approvals/[bestandsnaam] met een budget van maximaal €[bedrag] op [kanaal], van [startdatum] tot [einddatum]. Zet de status op AKKOORD, log het in ops/decisions.md en zet het budget in ops/finance/summary.json. Geef me stap voor stap aan hoe ik de campagne zelf in [Google Ads / Meta / Pinterest] aanmaak met de goedgekeurde teksten en beelden.
```

## Advertentieresultaten beoordelen
Agent: advertentie-beoordelaar, analytics-finance
Wanneer: dagelijks zodra er campagnes lopen
Nodig van jou: de cijfers uit het advertentieplatform

```text
Hier zijn de cijfers van vandaag uit [kanaal]: [plak de export of de tabel: campagne, vertoningen, klikken, kosten, conversies]. Laat de advertentie-beoordelaar ze beoordelen volgens de regels in ops/ads-framework.md (drempel, stoppen, opschalen, aanpassen), schrijf het rapport in ops/reports/ en werk ops/finance/summary.json bij. Wijzigingen in budget zet je als voorstel in ops/approvals/; ik voer ze zelf door.
```

# Iets doorgeven

## Sleutels ingesteld
Agent: developer
Wanneer: als je een API-sleutel of ID in Vercel of .env.local hebt gezet
Nodig van jou: welke variabelen (niet de waarden)

```text
Ik heb deze variabelen ingesteld in [Vercel / .env.local]: [namen, bijv. NEXT_PUBLIC_BOL_SITE_ID, NEXT_PUBLIC_GA4_ID]. Plak geen waarden in de chat. Controleer of alles werkt wat ermee aan kan, test wat te testen is, werk ops/owner-todo.md bij, commit en push.
```

## Akkoord of keuze doorgeven
Agent: orchestrator
Wanneer: als je een akkoordverzoek in ops/approvals/ hebt gelezen
Nodig van jou: je keuze

```text
Over ops/approvals/[bestandsnaam]: [AKKOORD / AFGEWEZEN], met deze keuzes: [bijv. teksten akkoord; budget €50 voor Meta]. Zet de status, log het in ops/decisions.md, verwerk de keuzes in de code en teksten, en vertel me wat er nog ontbreekt voordat het live kan.
```

## Antwoord van bol of een affiliate-netwerk verwerken
Agent: catalogus
Wanneer: als bol, Awin, TradeTracker, Daisycon of een winkel je goedkeurt of afwijst
Nodig van jou: de mail (zonder privégegevens van anderen)

```text
[Bol / Awin / TradeTracker / Daisycon / winkel] heeft gemaild: [plak de mail]. Vertel wat dit betekent, wat ik nu moet doen (precies waar klikken) en welke sleutel of ID ik in Vercel moet zetten. Werk ops/owner-todo.md bij. Accepteer of teken niets.
```

## Klantmail beantwoorden
Agent: klantenservice
Wanneer: als een klant mailt
Nodig van jou: de mail

```text
Een klant mailt: [plak de mail, ordernummer mag erbij]. Laat de klantenservice-agent een conceptantwoord schrijven in ops/support/ (staat niet in git). Gaat het om een bestelling, verwijs vriendelijk naar de winkel waar gekocht is (wij verkopen zelf niets). Beloof niets namens een winkel.
```
