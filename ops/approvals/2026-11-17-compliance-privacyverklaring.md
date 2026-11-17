# Akkoord gevraagd: aanvullingen privacyverklaring

Status: WACHT
Datum: 2026-11-17 · Agent: Compliance · Code: `app/(shop)/(juridisch)/privacy/page.tsx` · Rapport: `ops/compliance/2026-11-17-eerste-toetsing.md` punt 21

## Wat
De privacyverklaring is grotendeels goed. Voorstel om vier dingen aan te vullen:

1. **Contact**: grondslag toevoegen. Voorstel: "Grondslag: gerechtvaardigd belang (je vraag beantwoorden)."
2. **Klik op een winkel-link**: grondslag en bewaartermijn toevoegen. Voorstel: "Grondslag: gerechtvaardigd belang (commissie controleren en de site verbeteren). Dit zijn geen gegevens die naar jou te herleiden zijn; we bewaren ze maximaal 24 maanden voor onze administratie."
3. **Winkels en affiliatenetwerken** bij "Met wie delen we gegevens": "Klik je door naar een winkel, dan gaat dat via het partnerprogramma van die winkel of een affiliatenetwerk (nu: bol partnerprogramma). Die partij plaatst eigen cookies en is zelf verantwoordelijk voor die gegevens; zie hun privacyverklaring."
4. **Cookies**: zin met link toevoegen: "Welke cookies we gebruiken en hoe lang ze bewaard blijven, staat in het cookiebeleid." En de datum "Laatst bijgewerkt" aanpassen.

## Waarom
Art. 13 AVG vraagt per verwerking het doel én de grondslag, de bewaartermijn en de ontvangers. Bij contact en klikregistratie ontbreekt de grondslag; de affiliate-netwerken worden niet genoemd. Dit punt blokkeert niet, maar een volledige verklaring voorkomt vragen van bezoekers en van de Autoriteit Persoonsgegevens.

## Kosten
Geen.

## Verwacht resultaat
Checklistpunt "Privacyverklaring" van NIET OK naar OK.

## Alternatief
Zo laten (klein risico) of de tekst door een jurist laten nalezen. De bewaartermijn van 24 maanden is een voorstel; een kortere termijn mag ook.

## Akkoord geven
Zeg "akkoord privacy" (eventueel met een andere bewaartermijn) of zet hierboven `Status: AKKOORD`. Daarna past de Developer de pagina aan.
