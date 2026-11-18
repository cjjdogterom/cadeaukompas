# Regels voor product-scouts

Werkmap: /Users/chrisdogterom/Projects/cadeausite. Shop: OpTijdCadeau.nl, cadeau-webshop (affiliate), alleen bol.com-producten.

Lever 45 NIEUWE cadeaus voor jouw segment (staat in je opdracht), Sinterklaas én kerst.

Regels:
- Lees eerst data/products.json en sla alles over wat er al in staat (zelfde product of zelfde bol-product-ID in de URL). Kijk ook in data/research/shortlist-<datum>-*.json van collega's als die al bestaan.
- Elk product: open de bol-productpagina (WebFetch, standaard user-agent; nooit een browser-user-agent spoofen of bot-detectie omzeilen). Bij lange pagina's staat prijs/levering/verkoper vaak pas na teken 100.000: haal dat deel dan ook op. Neem de prijs en levertekst over die je NU ziet. Lukt de pagina niet of is het niet leverbaar: overslaan.
- Alleen producten die bol zelf verkoopt ("Verkoop door bol") of een duidelijk Nederlandse/EU-verkoper, levering binnen 1–3 werkdagen. Geen verkopers uit China/Azië, geen namaak, geen alcohol, messen, wapens of cadeaukaarten. Voorkeur: bekende merken en "Verkoop door bol".
- Eigen, unieke Nederlandse teksten (short: 1 zin; description: 2–4 zinnen), eerlijk, geen superlatieven of nepschaarste, geen verzonnen reviews (rating null tenzij score én aantal op de pagina staan).
- Velden exact zoals in data/research/shortlist-2026-11-17-man.json: slug (kebab-case, uniek), title (korte nette naam), merchantTitle, brand, ean (als op de pagina), short, description, type "affiliate", merchant "bol", merchantUrl (zonder tracking, vorm https://www.bol.com/nl/nl/p/<naam>/<id>/), priceCents, priceCheckedAt "<datum van vandaag>", deliveryDaysMin, deliveryDaysMax, recipients (alleen: partner, moeder, vader, collega, tiener, kind, vriend, opa-oma, thuiswerker), ageGroups (alleen: 0-3, 4-7, 8-12, 13-17, volwassen), interests (alleen: koken, eten-drinken, gamen, lezen, sport, wellness, tech, creatief, thuis, muziek, spellen, bouwen), occasions ["sinterklaas","kerst"], rating, imageUrl null, imageLicense null, sources [productpagina-URL], status "concept", scout {score 0–100 (≥60 = goed cadeau), commissionPct null, notes: "Prijs € x,xx, verkoper <naam>, levertekst '...' gezien op productpagina <datum>", verified: true}.
- Schrijf ALLEEN naar het bestand uit je opdracht (JSON-array, geldig JSON). Raak geen andere bestanden aan, commit niets.

Eindig met: aantal producten, verdeling per prijsklasse, en kort wat je hebt overgeslagen en waarom.
