import "server-only";
import { site } from "./site";
import { formatPrice } from "./format";

type OrderMail = {
  orderNumber: string;
  email: string;
  name: string;
  items: { title: string; quantity: number; unitPriceCents: number }[];
  shippingCents: number;
  totalCents: number;
  vatCents: number;
  promisedDeliveryDate: string | null;
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Orderbevestiging via Resend. Zonder RESEND_API_KEY wordt niets verstuurd (en dat wordt gelogd). */
export async function sendOrderConfirmation(order: OrderMail): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    console.warn(`Orderbevestiging ${order.orderNumber} niet verstuurd: RESEND_API_KEY/EMAIL_FROM ontbreekt.`);
    return false;
  }
  const rows = order.items
    .map((i) => `<tr><td>${i.quantity}× ${esc(i.title)}</td><td style="text-align:right">${formatPrice(i.unitPriceCents * i.quantity)}</td></tr>`)
    .join("");
  const html = `
<p>Hoi ${esc(order.name.split(" ")[0])},</p>
<p>Bedankt voor je bestelling bij ${site.name}. We hebben je betaling ontvangen. Ordernummer: <strong>${order.orderNumber}</strong>.</p>
<table cellpadding="4" style="border-collapse:collapse">${rows}
<tr><td>Verzending</td><td style="text-align:right">${order.shippingCents ? formatPrice(order.shippingCents) : "Gratis"}</td></tr>
<tr><td><strong>Totaal</strong></td><td style="text-align:right"><strong>${formatPrice(order.totalCents)}</strong></td></tr>
<tr><td style="color:#666">Waarvan btw</td><td style="text-align:right;color:#666">${formatPrice(order.vatCents)}</td></tr></table>
${order.promisedDeliveryDate ? `<p>Verwachte levering: uiterlijk ${order.promisedDeliveryDate}. Je krijgt een mail met track &amp; trace zodra je pakket onderweg is.</p>` : ""}
<p><strong>Bedenktijd:</strong> je hebt 14 dagen na ontvangst om de koop zonder opgave van reden te herroepen (niet voor gepersonaliseerde producten).
Zie <a href="${site.url}/retourneren">retourneren</a> en het <a href="${site.url}/herroepingsformulier">modelformulier voor herroeping</a>.
Op je bestelling zijn onze <a href="${site.url}/voorwaarden">algemene voorwaarden</a> van toepassing.</p>
<p>Vragen? Antwoord gewoon op deze mail.</p>
<p>${site.company.legalName} · KvK ${site.company.kvk} · btw ${site.company.vat} · ${site.company.address}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: order.email, subject: `Je bestelling ${order.orderNumber} bij ${site.name}`, html }),
  });
  if (!res.ok) console.error(`Resend ${res.status} voor ${order.orderNumber}`);
  return res.ok;
}
