import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { SHIPPING } from "@/lib/shop";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Algemene voorwaarden" };

export default function Page() {
  const c = site.company;
  return (
    <>
      <h1 className="font-display text-4xl font-semibold text-ink">Algemene voorwaarden</h1>
      <p>Versie: concept 17 november 2026 · [IN TE VULLEN: definitieve datum bij livegang]</p>

      <h2>1. Wie wij zijn</h2>
      <p>
        {c.legalName}, handelend onder de naam {site.name}, {c.address}. E-mail: {c.email}, telefoon: {c.phone}. KvK {c.kvk},
        btw-id {c.vat}.
      </p>

      <h2>2. Wanneer gelden deze voorwaarden</h2>
      <p>
        Deze voorwaarden gelden voor elke bestelling die je <strong>bij ons</strong> plaatst en afrekent op onze website
        (producten met de knop &ldquo;In winkelwagen&rdquo;). Bestel je via een knop &ldquo;Bekijk bij &hellip;&rdquo; bij een andere winkel,
        dan sluit je de koop met die winkel en gelden hun voorwaarden; wij zijn dan geen partij (zie{" "}
        <Link href="/hoe-wij-verdienen">hoe wij verdienen</Link>).
      </p>

      <h2>3. Aanbod en prijzen</h2>
      <ul>
        <li>Alle prijzen zijn in euro&rsquo;s en inclusief btw.</li>
        <li>
          Verzendkosten zijn {formatPrice(SHIPPING.costCents)} per bestelling en vervallen vanaf {formatPrice(SHIPPING.freeFromCents)}.
          Je ziet ze vóór je bestelt.
        </li>
        <li>Kennelijke vergissingen of fouten in het aanbod binden ons niet.</li>
        <li>We leveren alleen in Nederland.</li>
      </ul>

      <h2>4. De overeenkomst</h2>
      <p>
        De koop komt tot stand zodra je op &ldquo;Bestellen en betalen&rdquo; klikt en de betaling is gelukt. Je krijgt direct een
        bevestiging per e-mail met daarin deze voorwaarden, de informatie over herroeping en het modelformulier.
      </p>

      <h2>5. Betalen</h2>
      <p>Je betaalt vooraf via Mollie (onder meer iDEAL, Bancontact en creditcard). Wij zien en bewaren geen betaalgegevens.</p>

      <h2>6. Levering</h2>
      <ul>
        <li>
          Een partner (leverancier) verstuurt je bestelling rechtstreeks naar het opgegeven adres. Bij elk product staat de
          verwachte levertijd en de uiterste besteldatum voor Sinterklaas en kerst.
        </li>
        <li>We leveren uiterlijk binnen 30 dagen, tenzij we samen iets anders afspreken. Lukt dat niet, dan mag je de koop
          kosteloos ontbinden en betalen we binnen 14 dagen terug.</li>
        <li>Het risico van beschadiging of verlies ligt bij ons tot het pakket bij jou (of iemand die jij aanwijst) is bezorgd.</li>
      </ul>

      <h2>7. Bedenktijd (herroepingsrecht)</h2>
      <p>
        Je mag de koop binnen 14 dagen na ontvangst zonder opgave van redenen ontbinden. Hoe dat werkt, wat het kost en welke
        uitzonderingen er zijn, staat op <Link href="/retourneren">retourneren &amp; herroepen</Link>. Je kunt het{" "}
        <Link href="/herroepingsformulier">modelformulier</Link> gebruiken, maar dat hoeft niet.
      </p>
      <p>Geen herroepingsrecht is er onder meer voor producten die volgens jouw wensen zijn gemaakt of gepersonaliseerd, en voor
        verzegelde producten die om hygiënische redenen niet kunnen worden teruggestuurd als de verzegeling is verbroken. Dat
        staat dan duidelijk bij het product.</p>

      <h2>8. Garantie en klachten</h2>
      <ul>
        <li>Je hebt altijd de wettelijke garantie: een product moet doen wat je er redelijkerwijs van mag verwachten.</li>
        <li>Is er iets mis? Meld het binnen bekwame tijd na ontdekking bij {c.email}. We reageren binnen 14 dagen met een oplossing
          (herstel, vervanging of terugbetaling).</li>
        <li>[IN TE VULLEN: aansluiting bij een geschillencommissie, indien van toepassing.]</li>
      </ul>

      <h2>9. Privacy</h2>
      <p>We gebruiken je gegevens alleen om je bestelling uit te voeren. Zie de <Link href="/privacy">privacyverklaring</Link>.</p>

      <h2>10. Toepasselijk recht</h2>
      <p>Op deze voorwaarden en je bestelling is Nederlands recht van toepassing. Dwingende consumentenbescherming blijft altijd gelden.</p>
    </>
  );
}
