# Compliance-checklist (per release)

> **17-11: alleen affiliate.** Punten over checkout, betaling, retouren, herroeping en leveranciers zijn niet van toepassing zolang we zelf niets verkopen.

Compliance-agent loopt dit na op de preview-URL. Status per punt: OK / NIET OK / N.V.T. Eén NIET OK in **[blokkerend]** = geen release.

## Identiteit & contact
- [ ] **[blokkerend]** Footer: bedrijfsnaam, vestigingsadres, e-mail, telefoon, KvK-nummer, btw-id (Handelsregisterwet, art. 3:15d BW)
- [ ] Contactpagina met reactietermijn

## Affiliate
- [ ] **[blokkerend]** Duidelijke affiliate-disclosure: bij elke affiliate-knop ("Je bestelt bij <winkel>. Wij ontvangen mogelijk een commissie.") + aparte pagina
- [ ] Affiliate-links `rel="sponsored nofollow"`
- [ ] Getoonde prijs is "indicatief bij <winkel>" met controledatum; nooit ouder dan 48 uur bij status actief
- [ ] Geen suggestie dat wij de verkoper zijn van affiliate-producten

## Prijzen & claims
- [ ] **[blokkerend]** Prijzen incl. btw; verzendkosten vóór checkout zichtbaar
- [ ] Geen "nog maar X op voorraad", afteltimers of valse urgentie
- [ ] Geen nepreviews; reviewscores alleen met bron en aantal
- [ ] Kortingen: vergelijkingsprijs = laagste prijs laatste 30 dagen (Omnibus) — kortingen alleen met akkoord eigenaar
- [ ] Levertijd en "bestel uiterlijk"-datum kloppen met `lib/deadlines.ts`

## Dropship / koop op afstand (zodra checkout live)
- [ ] **[blokkerend]** Algemene voorwaarden beschikbaar vóór de bestelling, opslaanbaar (PDF/link in mail)
- [ ] **[blokkerend]** Herroepingsrecht 14 dagen + modelformulier; uitzonderingen correct (gepersonaliseerd, verzegeld hygiëne)
- [ ] **[blokkerend]** Bestelknop "Bestelling met betalingsverplichting" (of gelijkwaardig)
- [ ] Orderbevestiging per e-mail met voorwaarden, herroepingsinfo, totaalprijs
- [ ] Wettelijke garantie (conformiteit) vermeld
- [ ] Retouradres en wie retourkosten draagt

## Privacy & cookies
- [x] **[blokkerend]** Geen analytics/marketing-cookies of pixels vóór toestemming (netwerkcheck) — getest 17-11 lokaal met test-ID's: vóór keuze 0 verzoeken naar Google/Meta/Pinterest; na intrekken cookies weg. Herhalen met echte ID's vóór livegang.
- [x] Cookiebanner: weigeren even makkelijk als accepteren, geen vooraf aangevinkte vakjes, instellingen later wijzigbaar (footer: Cookie-instellingen)
- [x] Google Consent Mode v2 default `denied` (gtag laadt bovendien pas na toestemming)
- [ ] Privacyverklaring: verwerkingsverantwoordelijke, doelen, grondslagen, bewaartermijnen, ontvangers (Mollie, Resend, Supabase, Vercel, leveranciers, Google/Meta na toestemming), doorgifte buiten EER, rechten, klacht bij AP
- [ ] Verwerkersovereenkomsten met Supabase, Vercel, Resend, Mollie (eigenaar)
- [ ] Formulieren vragen alleen noodzakelijke gegevens

## Reclame
- [ ] Advertenties herkenbaar als reclame; Reclamecode, kinderen < 12 niet direct aanzetten tot kopen
- [ ] Platformregels Google/Meta/Pinterest/TikTok (bv. geen misleidende claims, juiste landingspagina)

## Toegankelijkheid & techniek
- [ ] Alt-teksten, labels, contrast AA, toetsenbordbediening
- [ ] HTTPS, geen gemengde content
