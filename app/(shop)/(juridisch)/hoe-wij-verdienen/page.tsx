import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Hoe wij verdienen", description: "Uitleg over affiliate-links en hoe wij cadeaus selecteren." };

export default function Page() {
  return (
    <>
      <h1 className="font-display text-4xl font-semibold text-ink">Hoe wij verdienen</h1>
      <p>
        {site.name} is een cadeaugids. Bij de meeste cadeaus verkopen wij niet zelf, maar verwijzen we je door naar een
        Nederlandse webwinkel zoals bol, Amazon.nl, Coolblue of Intertoys. Dat zijn <strong>affiliate-links</strong>: als je
        via onze link iets koopt, ontvangen wij van die winkel een kleine commissie. Jij betaalt daardoor niets extra.
      </p>
      <h2>Wat betekent dat voor jou?</h2>
      <ul>
        <li>Je bestelt, betaalt en retourneert bij de winkel zelf. Hun voorwaarden, levering en klantenservice gelden.</li>
        <li>De prijs die wij tonen is een indicatie met de datum waarop we hem controleerden. De prijs bij de winkel is leidend.</li>
        <li>Knoppen die naar een winkel leiden, zijn herkenbaar aan &ldquo;Bekijk bij &hellip;&rdquo;.</li>
      </ul>
      <h2>Hoe kiezen we cadeaus?</h2>
      <p>
        We kiezen op bruikbaarheid als cadeau, levertijd en beoordelingen van kopers. De hoogte van de commissie bepaalt
        niet of een product in de gids komt. We schrijven geen nepreviews en zeggen niet dat iets bijna uitverkocht is als we
        dat niet weten.
      </p>
      <h2>Producten die wij zelf verkopen</h2>
      <p>
        Bij een klein deel van de cadeaus ben je bij ons klant en verstuurt een partner het pakket rechtstreeks. Dat staat
        dan duidelijk op de productpagina, en daarvoor gelden onze algemene voorwaarden en 14 dagen bedenktijd.
      </p>
    </>
  );
}
