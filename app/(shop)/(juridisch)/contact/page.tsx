import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function Page() {
  const c = site.company;
  return (
    <>
      <h1 className="font-display text-4xl font-semibold text-ink">Contact</h1>
      <p>Vragen over een cadeau of een bestelling? Mail of bel ons; we reageren binnen één werkdag.</p>
      <ul>
        <li>E-mail: {c.email}</li>
        <li>Telefoon: {c.phone}</li>
        <li>Adres: {c.address}</li>
        <li>KvK: {c.kvk} · btw-id: {c.vat}</li>
      </ul>
      <h2>Besteld via een affiliate-link?</h2>
      <p>
        Dan heb je bij de winkel zelf besteld (bijvoorbeeld bol of Amazon.nl). Voor levering, retour en garantie neem je
        contact op met die winkel; hun gegevens staan in je bevestigingsmail.
      </p>
    </>
  );
}
