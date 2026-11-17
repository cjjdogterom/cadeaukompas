import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Modelformulier voor herroeping" };

/** Tekst volgens het wettelijke modelformulier (bijlage bij art. 6:230m BW). */
export default function Page() {
  const c = site.company;
  return (
    <>
      <h1 className="font-display text-4xl font-semibold text-ink">Modelformulier voor herroeping</h1>
      <p>
        Je mag dit formulier gebruiken, maar het hoeft niet: een e-mail met je ordernummer is ook genoeg. Mail het ingevulde
        formulier naar {c.email}, of print het en stuur het per post.
      </p>
      <div className="mt-6 rounded-2xl border border-line bg-white p-6 font-mono text-sm leading-relaxed">
        <p className="font-semibold">Modelformulier voor herroeping</p>
        <p>(dit formulier alleen invullen en terugzenden als u de overeenkomst wilt herroepen)</p>
        <ul className="!list-none !pl-0">
          <li>
            — Aan: {c.legalName} ({site.name}), {c.address}, {c.email}
          </li>
          <li>
            — Ik/Wij* deel/delen* u hierbij mede, dat ik/wij* onze overeenkomst betreffende de verkoop van de volgende
            goederen/levering van de volgende dienst* herroep/herroepen*:
          </li>
          <li>— Besteld op*/ontvangen op*:</li>
          <li>— Naam/Namen consument(en):</li>
          <li>— Adres consument(en):</li>
          <li>— Handtekening van consument(en) (alleen wanneer dit formulier op papier wordt ingediend):</li>
          <li>— Datum:</li>
        </ul>
        <p>* Doorhalen wat niet van toepassing is.</p>
      </div>
    </>
  );
}
