# Akkoord gevraagd: dropship-checkout, verzendkosten en retourbeleid

Status: WACHT
Datum: 2026-11-17 · Agent: Developer · Code: `app/(shop)/afrekenen/`, `lib/shop.ts`, `app/(shop)/(juridisch)/voorwaarden|retourneren|herroepingsformulier`

## Wat
De techniek voor dropship-verkoop is gebouwd en staat **uit**:
- winkelwagen, afrekenen (alleen NL-adressen), betaling via Mollie, webhook, bedankpagina, orderbevestiging per e-mail (Resend);
- concept algemene voorwaarden, retour/herroeping en het wettelijke modelformulier.

Om live te gaan moet jij vier keuzes maken.

1. **Verzendkosten**: voorstel €4,95 per bestelling, gratis vanaf €50 (`lib/shop.ts`).
2. **Retourkosten bij herroeping**: voor de klant (gebruikelijk, goedkoper) of gratis retourlabel (klantvriendelijker, kost ±€5–7 per retour). Staat als `[KEUZE EIGENAAR]` op /retourneren.
3. **Retouradres in Nederland** (eigen adres of dat van de leverancier).
4. **Livegang checkout**: daarvoor zet je in Vercel `NEXT_PUBLIC_CHECKOUT_ENABLED=true`. Dat werkt pas met:
   - Mollie `MOLLIE_API_KEY`, eerst `test_…`;
   - Supabase (migratie `supabase/migrations/0001_init.sql` uitgevoerd, plus sleutels);
   - Resend (`RESEND_API_KEY`, `EMAIL_FROM`);
   - je bedrijfsgegevens in `lib/site.ts`.

## Waarom
Met dropship verdienen we marge in plaats van alleen commissie. De wet vereist voorwaarden, 14 dagen bedenktijd met modelformulier en een duidelijke betaalknop. Die staan klaar.

## Kosten
- Mollie: per transactie (iDEAL ca. €0,29; zie mollie.com/pricing). Geen vaste kosten.
- Resend: gratis tot 3.000 mails per maand.
- Supabase: gratis tier.

## Verwacht resultaat
Als de leverancier rond is (zie de approvals van Andriez, SpeelgoedFamilie en Gelato), kunnen de eerste dropship-producten rond 7 december verkocht worden voor kerst.

## Nog niet getest
- Een betaling end-to-end in Mollie-testmodus. Dat kan pas met een testsleutel en Supabase (QA-agent).
- De Mollie-webhook op Vercel. Vercel Deployment Protection blokkeert die; je moet de bescherming uitzetten of "Protection Bypass for Automation" gebruiken.
- Klarna. Die vereist orderregels en een adres in de Mollie-aanroep en volgt later.
