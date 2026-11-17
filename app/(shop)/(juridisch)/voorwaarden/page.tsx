import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Gebruiksvoorwaarden" };

export default function Page() {
  const c = site.company;
  return (
    <>
      <h1 className="font-display text-4xl font-semibold text-ink">Gebruiksvoorwaarden</h1>
      <p>Versie: concept 17 november 2026 · [IN TE VULLEN: definitieve datum bij livegang]</p>

      <h2>1. Wie wij zijn</h2>
      <p>
        {c.legalName}, handelend onder de naam {site.name}, {c.address}. E-mail: {c.email}, telefoon: {c.phone}. KvK {c.kvk},
        btw-id {c.vat}.
      </p>

      <h2>2. Wat {site.name} is</h2>
      <p>
        {site.name} is een cadeaugids. We tonen cadeau-ideeën met levertijden en uiterste besteldatums, en linken door naar
        Nederlandse webwinkels. <strong>Wij verkopen zelf niets.</strong> Bestel je via een knop &ldquo;Bekijk bij &hellip;&rdquo;, dan
        sluit je de koop met die winkel. Hun prijzen, voorwaarden, levering, garantie, retourbeleid en klantenservice gelden;
        wij zijn geen partij bij die koop.
      </p>

      <h2>3. Hoe wij verdienen</h2>
      <p>
        Koop je iets via onze link, dan krijgen wij mogelijk een commissie van de winkel. Jij betaalt daardoor niet meer. Lees
        meer op <Link href="/hoe-wij-verdienen">hoe wij verdienen</Link>.
      </p>

      <h2>4. Prijzen, levertijden en besteldatums</h2>
      <ul>
        <li>Prijzen zijn indicatief en inclusief btw. We controleren ze regelmatig en tonen de datum van de laatste controle. De prijs bij de winkel is leidend.</li>
        <li>Levertijden en uiterste besteldatums zijn onze inschatting op basis van wat de winkel opgeeft, met een buffer voor de drukte. De winkel bepaalt de echte levering.</li>
        <li>Klopt er iets niet? Laat het ons weten via {c.email}; we passen het zo snel mogelijk aan.</li>
      </ul>

      <h2>5. Aansprakelijkheid</h2>
      <p>
        We doen ons best om de informatie juist en actueel te houden, maar kunnen niet garanderen dat alles altijd klopt. We
        zijn niet aansprakelijk voor schade door het gebruik van deze site of van websites waar we naar linken, behalve bij
        opzet of grove nalatigheid. Je wettelijke rechten als consument tegenover de winkel blijven altijd gelden.
      </p>

      <h2>6. Inhoud en merken</h2>
      <p>
        Teksten op deze site schrijven we zelf. Merknamen en productnamen zijn van hun eigenaars. Productfoto&rsquo;s tonen we
        alleen als we die mogen gebruiken.
      </p>

      <h2>7. Privacy en cookies</h2>
      <p>
        Zie de <Link href="/privacy">privacyverklaring</Link> en het <Link href="/cookies">cookiebeleid</Link>.
      </p>

      <h2>8. Toepasselijk recht</h2>
      <p>Op deze voorwaarden is Nederlands recht van toepassing.</p>
    </>
  );
}
