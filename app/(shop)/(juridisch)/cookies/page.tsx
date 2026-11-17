import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookiebeleid" };

export default function Page() {
  return (
    <>
      <h1 className="font-display text-4xl font-semibold text-ink">Cookiebeleid</h1>
      <p>
        Zonder jouw toestemming plaatsen wij alleen cookies of vergelijkbare techniek die nodig zijn om de site te laten
        werken (bijvoorbeeld je winkelwagen en je cookiekeuze). Analytics- en marketingcookies laden pas nadat je daar
        toestemming voor geeft. Weigeren is net zo makkelijk als accepteren, en je kunt je keuze altijd wijzigen.
      </p>
      <h2>Overzicht</h2>
      <ul>
        <li><strong>Noodzakelijk</strong> — cookiekeuze, winkelwagen. Geen toestemming nodig.</li>
        <li><strong>Analytics (toestemming)</strong> — Google Analytics 4 met Consent Mode v2. Meet bezoek en gebruik.</li>
        <li><strong>Marketing (toestemming)</strong> — Meta Pixel, Pinterest Tag. Meten van advertenties.</li>
        <li><strong>Winkels en affiliatenetwerken</strong> — als je doorklikt naar een winkel, plaatst die winkel of het netwerk mogelijk eigen cookies op hun site. Daarop is hun cookiebeleid van toepassing.</li>
      </ul>
      <p>[IN TE VULLEN bij livegang: exacte cookienamen en bewaartermijnen, gegenereerd uit de consent-configuratie.]</p>
    </>
  );
}
