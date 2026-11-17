import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Retourneren en herroepen" };

export default function Page() {
  const c = site.company;
  return (
    <>
      <h1 className="font-display text-4xl font-semibold text-ink">Retourneren en herroepen</h1>
      <p>
        Dit geldt voor cadeaus die je <strong>bij ons</strong> hebt gekocht. Heb je via een andere winkel besteld (bol, Amazon.nl
        en dergelijke)? Dan retourneer je bij die winkel.
      </p>

      <h2>14 dagen bedenktijd</h2>
      <p>
        Je mag de koop binnen <strong>14 dagen na ontvangst</strong> ontbinden zonder een reden te geven. Bij een bestelling in
        meerdere pakketten tellen de 14 dagen vanaf het laatste pakket. Tijdens de bedenktijd mag je het product uitpakken en
        bekijken zoals je dat in een winkel zou doen.
      </p>

      <h2>Zo werkt het</h2>
      <ol className="list-decimal pl-5">
        <li>
          Laat het ons binnen 14 dagen weten: mail naar {c.email} met je ordernummer, of gebruik het{" "}
          <Link href="/herroepingsformulier">modelformulier voor herroeping</Link>.
        </li>
        <li>Stuur het product binnen 14 dagen na je melding terug naar: [IN TE VULLEN: retouradres in Nederland].</li>
        <li>
          We betalen je binnen 14 dagen na je melding terug, inclusief de oorspronkelijke standaard verzendkosten. We mogen wachten
          met terugbetalen tot we het product hebben ontvangen of je aantoont dat je het hebt teruggestuurd.
        </li>
      </ol>

      <h2>Kosten</h2>
      <p>[KEUZE EIGENAAR — één van beide:] De kosten van het terugsturen zijn voor jou. / Het terugsturen is gratis; je krijgt van ons een retourlabel.</p>
      <p>
        Ben je niet zorgvuldig met het product omgegaan (meer gebruikt dan nodig om het te beoordelen), dan kunnen we de
        waardevermindering in rekening brengen.
      </p>

      <h2>Uitzonderingen</h2>
      <ul>
        <li>Producten die volgens jouw wensen zijn gemaakt of gepersonaliseerd (bijvoorbeeld een mok met naam).</li>
        <li>Verzegelde producten die om hygiënische redenen niet terug kunnen als de verzegeling is verbroken.</li>
        <li>Producten die snel bederven of beperkt houdbaar zijn.</li>
      </ul>
      <p>Geldt een uitzondering voor een product, dan staat dat duidelijk op de productpagina.</p>

      <h2>Kapot of verkeerd geleverd?</h2>
      <p>
        Dat valt niet onder de bedenktijd maar onder de wettelijke garantie. Mail ons met je ordernummer en een foto; we lossen
        het op met herstel, vervanging of terugbetaling, en de kosten zijn voor ons.
      </p>
    </>
  );
}
