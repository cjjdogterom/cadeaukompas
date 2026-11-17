# Akkoord gevraagd: teksten en cookiebanner voor de livegang

Status: AKKOORD (eigenaar, 17-11 in chat: "ik geef akkoord op teksten")
Datum: 2026-11-17 · Agent: Developer · Code: `components/CookieConsent.tsx`, `lib/consent.ts`, `app/(shop)/(juridisch)/`

## Wat
De site is een affiliate-cadeaugids (we verkopen zelf niets). Deze pagina's gaan live en hebben jouw akkoord nodig:
- **Cookiebeleid** (/cookies): cookienamen, doel en bewaartermijn. Statistieken en advertenties alleen na toestemming.
- **Privacyverklaring** (/privacy): geen bestellingen, alleen contact, geanonimiseerde klikregistratie en (met toestemming) Google, Meta en Pinterest.
- **Gebruiksvoorwaarden** (/voorwaarden): wij verkopen niets, prijzen en levertijden zijn indicatief, aansprakelijkheid, Nederlands recht.
- **Hoe wij verdienen** (/hoe-wij-verdienen): uitleg over commissie.
- **Cookiebanner**: "Alleen noodzakelijk" en "Alles accepteren" even groot, "Zelf kiezen" met lege vinkjes; wijzigen via "Cookie-instellingen" in de footer.

Nog in te vullen vóór livegang: adres (footer, voorwaarden, privacy) en de datum "laatst bijgewerkt".

## Waarom
Wettelijk verplicht (AVG, Telecommunicatiewet 11.7a, informatieplicht 3:15d BW, Reclamecode voor affiliate-uitleg). Zonder cookiebanner mogen statistieken en advertenties niet aan.

## Kosten
Geen.

## Getest
Cookiebanner lokaal met nep-ID's: vóór een keuze 0 verzoeken naar Google, Meta of Pinterest; alleen statistieken laadt alleen Google; alles laadt alle drie; intrekken verwijdert cookies en scripts. Telefoonweergave gecontroleerd.

## Akkoord geven
Lees de pagina's op de Vercel-link en zeg in de chat "akkoord teksten" (of wat er anders moet).
