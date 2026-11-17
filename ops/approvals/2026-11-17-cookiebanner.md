# Akkoord gevraagd: cookiebanner en nieuw cookiebeleid

Status: WACHT
Datum: 2026-11-17 · Agent: Developer · Code: `components/CookieConsent.tsx`, `lib/consent.ts`, `app/(shop)/(juridisch)/cookies/page.tsx`

## Wat
- Cookiebanner op alle shoppagina's (niet op /admin): "Alleen noodzakelijk" en "Alles accepteren" even groot, plus "Zelf kiezen" met lege vinkjes voor Statistieken en Advertenties.
- Keuze 12 maanden geldig; wijzigen of intrekken via "Cookie-instellingen" in de footer. Bij intrekken ruimen we de cookies op en herladen we de pagina.
- Google Analytics 4 (Consent Mode v2, standaard alles `denied`), Meta Pixel en Pinterest Tag laden pas na toestemming en alleen als hun ID in Vercel staat. Nu staat er nog geen ID, dus er laadt niets.
- Cookiebeleid aangevuld met cookienamen, doel en bewaartermijn (GA-cookies maximaal 13 maanden).

## Waarom
Verplicht vóór we statistieken of advertenties aanzetten (Telecommunicatiewet 11.7a, AVG). Zonder dit mogen de ads-tags niet draaien.

## Kosten
Geen.

## Getest
Lokaal met nep-ID's: vóór een keuze 0 verzoeken naar Google, Meta of Pinterest; alleen statistieken → alleen Google; alles → alle drie; intrekken → cookies weg en scripts weg. Telefoonweergave gecontroleerd.

## Nog niet
- Conversies meten (aankoop, klik naar winkel) volgt zodra je GA4/Meta-ID's hebt (prompt "Advertentieaccounts koppelen").
- Privacyverklaring noemt Google, Meta en Pinterest al; doorgifte buiten de EER controleert de compliance-agent bij de livegang.
