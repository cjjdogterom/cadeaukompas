import type { Delivery } from "./delivery-core";
import { formatDate } from "./deadlines";
import { isTomorrow } from "./season";

export type DeliveryText = {
  /** Hoofdregel, bv. "Nu besteld, uiterlijk morgen (do 19 nov) in huis" */
  headline: string;
  /** Bron of toelichting onder de hoofdregel. */
  note: string;
};

/**
 * Tekst voor de bezorgdatum op de productpagina. Met een belofte van de winkel noemen we die als bron;
 * zonder (geen bol-data) is het onze eigen schatting en zeggen we dat er duidelijk bij.
 */
export function deliveryText(d: Delivery, today: string, merchant: string): DeliveryText {
  const date = formatDate(d.latest, true);
  const when = isTomorrow(d.latest, today) ? `morgen (${date})` : date;
  if (d.source === "bol") {
    return {
      headline: `Nu besteld, uiterlijk ${when} in huis`,
      // Geen bol-omschrijving ("morgen in huis") overnemen: na de besteltijd schuiven wij de datum op en zou die tekst niet meer kloppen.
      note: `Bezorgdatum volgens ${merchant}.`,
    };
  }
  return {
    headline: `Indicatie: nu besteld, verwacht uiterlijk ${when}`,
    note: `Onze schatting op basis van de gebruikelijke levertijd plus een dag buffer. De bezorgdatum bij ${merchant} is leidend.`,
  };
}
