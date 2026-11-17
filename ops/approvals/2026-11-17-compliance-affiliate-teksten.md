# Akkoord gevraagd: affiliate-teksten consequent ("wij verkopen zelf niets")

Status: WACHT
Datum: 2026-11-17 · Agent: Compliance · Code: `app/(shop)/(juridisch)/hoe-wij-verdienen/page.tsx`, `app/(shop)/(juridisch)/contact/page.tsx`, `app/(shop)/cadeau/[slug]/page.tsx` · Rapport: `ops/compliance/2026-11-17-eerste-toetsing.md` punten 2, 3, 6, 7

## Wat
1. **/hoe-wij-verdienen**, eerste alinea: "Bij de meeste cadeaus verkopen wij niet zelf, maar verwijzen we je door…" wordt "Wij verkopen zelf niets. We verwijzen je door naar een Nederlandse webwinkel, zoals bol…". (Overblijfsel van de dropship-plannen.)
2. **/contact**: "Vragen over een cadeau of een bestelling?" wordt "Vragen over een cadeau of over deze site?". De rest van de pagina legt al uit dat bestellingen via de winkel lopen.
3. **Productpagina**, regel onder de prijs: na "De prijs bij de winkel is leidend." toevoegen: "Eventuele verzendkosten zie je bij de winkel." Dan is duidelijk dat er kosten bij kunnen komen.
4. **Pas bij activering van Amazon** (nu niet nodig): op /hoe-wij-verdienen en in de footer de verplichte zin "Als Amazon-partner verdienen wij aan in aanmerking komende aankopen."

## Waarom
- Punten 1 en 2: de site mag niet suggereren dat wij verkoper zijn (Wet oneerlijke handelspraktijken, ACM-leidraad affiliate). "Bij de meeste" klopt niet meer sinds je hebt gekozen voor alleen affiliate.
- Punt 3: bij een getoonde prijs moet duidelijk zijn dat er nog kosten bij kunnen komen (art. 6:193e BW). Wij hebben geen checkout, dus dit blokkeert niet, maar het is netter en veiliger.
- Punt 4: verplicht volgens de voorwaarden van het Amazon-partnerprogramma.

## Kosten
Geen.

## Verwacht resultaat
De affiliate-uitleg is overal hetzelfde en klopt. Lager risico op klachten bij de ACM of de Reclame Code Commissie.

## Alternatief
Alleen punt 1 doen (de belangrijkste). Punt 4 pas als Amazon actief wordt.

## Akkoord geven
Zeg "akkoord affiliate-teksten" (of welke punten wel of niet), of zet hierboven `Status: AKKOORD`. Daarna past de Developer de teksten aan.
