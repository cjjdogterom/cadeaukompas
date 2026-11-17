import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacyverklaring" };

export default function Page() {
  const c = site.company;
  return (
    <>
      <h1 className="font-display text-4xl font-semibold text-ink">Privacyverklaring</h1>
      <p>Laatst bijgewerkt: [IN TE VULLEN bij livegang]</p>
      <h2>Wie zijn wij</h2>
      <p>
        {c.legalName}, {c.address}, KvK {c.kvk}, is verwerkingsverantwoordelijke voor de persoonsgegevens die via{" "}
        {site.name} worden verwerkt. Vragen: {c.email}.
      </p>
      <h2>Welke gegevens, waarvoor en op welke grond</h2>
      <ul>
        <li><strong>Bezoek zonder toestemming voor cookies:</strong> geen analytics- of marketingcookies. Wel technisch noodzakelijke gegevens (zoals IP-adres in serverlogs van onze hostingpartij) voor beveiliging en werking. Grondslag: gerechtvaardigd belang. Bewaartermijn: maximaal 30 dagen.</li>
        <li><strong>Klik op een winkel-link:</strong> we registreren welk product en welke winkel, zonder naam, e-mail of IP-adres, om commissie te kunnen controleren. De winkel/het affiliatenetwerk kan zelf cookies plaatsen; zie hun privacyverklaring.</li>
        <li><strong>Contact:</strong> wat je ons stuurt, om je vraag te beantwoorden. Bewaartermijn: 1 jaar na afhandeling.</li>
        <li><strong>Analytics en advertenties (alleen met toestemming):</strong> Google Analytics 4, Meta Pixel, Pinterest Tag. Doel: meten en verbeteren van de site en advertenties. Grondslag: toestemming, die je altijd kunt intrekken via de cookie-instellingen.</li>
      </ul>
      <h2>Met wie delen we gegevens</h2>
      <p>
        Hostingpartij (Vercel), database voor geanonimiseerde klikregistratie (Supabase, EU), en — alleen met toestemming —
        Google, Meta en Pinterest. Wij verkopen zelf niets: bestel je via een link, dan geef je je gegevens aan die winkel. Met deze partijen sluiten we waar
        nodig verwerkersovereenkomsten. Bij doorgifte buiten de EER gebruiken we passende waarborgen (EU-US Data Privacy
        Framework of standaardcontractbepalingen). [IN TE VULLEN: controle per partij]
      </p>
      <h2>Jouw rechten</h2>
      <p>
        Je kunt je gegevens inzien, laten corrigeren of verwijderen, bezwaar maken, de verwerking laten beperken of je
        gegevens laten overdragen. Mail naar {c.email}. Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.
      </p>
    </>
  );
}
