"use server";

import { redirect } from "next/navigation";
import { getProducts } from "@/lib/catalog";
import { adminDb } from "@/lib/db";
import { createPayment, isTestMode } from "@/lib/mollie";
import { calculateTotals, checkoutEnabled, newOrderNumber, toMollieAmount } from "@/lib/shop";
import { addBusinessDays, isOnTime, todayInNL } from "@/lib/deadlines";
import { site } from "@/lib/site";

export type CheckoutState = { error?: string; fieldErrors?: Partial<Record<Field, string>> };
type Field = "name" | "email" | "phone" | "street" | "postalCode" | "city" | "terms";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

export async function createOrder(_prev: CheckoutState, fd: FormData): Promise<CheckoutState> {
  if (!checkoutEnabled()) return { error: "Afrekenen is nog niet beschikbaar." };

  const input = {
    name: str(fd, "name"),
    email: str(fd, "email").toLowerCase(),
    phone: str(fd, "phone"),
    street: str(fd, "street"),
    postalCode: str(fd, "postalCode").toUpperCase().replace(/\s+/g, ""),
    city: str(fd, "city"),
  };

  const fieldErrors: CheckoutState["fieldErrors"] = {};
  if (input.name.length < 2 || input.name.length > 100) fieldErrors.name = "Vul je naam in.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email)) fieldErrors.email = "Vul een geldig e-mailadres in.";
  if (input.phone && !/^[+0-9 ()-]{8,20}$/.test(input.phone)) fieldErrors.phone = "Vul een geldig telefoonnummer in of laat het leeg.";
  if (input.street.length < 3) fieldErrors.street = "Vul straat en huisnummer in.";
  if (!/^[1-9][0-9]{3}[A-Z]{2}$/.test(input.postalCode)) fieldErrors.postalCode = "Vul een Nederlandse postcode in (bijv. 1234 AB).";
  if (input.city.length < 2) fieldErrors.city = "Vul je woonplaats in.";
  if (fd.get("terms") !== "on") fieldErrors.terms = "Ga akkoord met de algemene voorwaarden.";
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  let cart: { slug: string; quantity: number }[] = [];
  try {
    const parsed = JSON.parse(str(fd, "cart"));
    if (Array.isArray(parsed)) cart = parsed.map((i) => ({ slug: String(i.slug), quantity: Number(i.quantity) }));
  } catch {
    return { error: "Je winkelwagen kon niet worden gelezen. Vernieuw de pagina en probeer opnieuw." };
  }

  // Prijzen altijd opnieuw uit de catalogus; alleen actieve dropship-producten.
  const catalog = (await getProducts()).filter((p) => p.type === "dropship" && p.status === "actief");
  const totals = calculateTotals(cart, catalog);
  if (!totals.lines.length) return { error: "Je winkelwagen is leeg of de producten zijn niet meer leverbaar." };

  const today = todayInNL();
  const slowest = Math.max(...totals.lines.map((l) => catalog.find((p) => p.slug === l.slug)!.deliveryDaysMax));
  const occasion = isOnTime(slowest, "sinterklaas", today) ? "sinterklaas" : isOnTime(slowest, "kerst", today) ? "kerst" : null;

  const db = adminDb();
  const orderNumber = newOrderNumber();
  const { data: order, error } = await db
    .from("orders")
    .insert({
      order_number: orderNumber,
      status: "open",
      email: input.email,
      name: input.name,
      phone: input.phone || null,
      street: input.street,
      postal_code: input.postalCode,
      city: input.city,
      country: "NL",
      subtotal_cents: totals.subtotalCents,
      shipping_cents: totals.shippingCents,
      total_cents: totals.totalCents,
      vat_cents: totals.vatCents,
      promised_delivery_date: addBusinessDays(today, slowest + 1),
      deadline_occasion: occasion,
    })
    .select("id")
    .single();
  if (error || !order) {
    console.error("order insert", error?.message);
    return { error: "Er ging iets mis bij het opslaan van je bestelling. Probeer het later opnieuw." };
  }

  const { error: itemsError } = await db.from("order_items").insert(
    totals.lines.map((l) => ({
      order_id: order.id,
      product_slug: l.slug,
      supplier_id: catalog.find((p) => p.slug === l.slug)?.supplierId ?? null,
      quantity: l.quantity,
      unit_price_cents: l.unitPriceCents,
      vat_rate: l.vatRate,
    })),
  );
  if (itemsError) {
    console.error("order_items insert", itemsError.message);
    return { error: "Er ging iets mis bij het opslaan van je bestelling. Probeer het later opnieuw." };
  }

  const publicUrl = site.url.startsWith("http://localhost") ? undefined : site.url;
  let checkoutUrl: string | undefined;
  try {
    const payment = await createPayment({
      amountValue: toMollieAmount(totals.totalCents),
      description: `${site.name} ${orderNumber}${isTestMode() ? " (test)" : ""}`,
      redirectUrl: `${site.url}/bestelling/bedankt?order=${order.id}`,
      webhookUrl: publicUrl ? `${publicUrl}/api/mollie/webhook` : undefined,
      orderId: order.id,
    });
    await db.from("orders").update({ mollie_payment_id: payment.id }).eq("id", order.id);
    checkoutUrl = payment._links.checkout?.href;
  } catch (e) {
    console.error("mollie create", e instanceof Error ? e.message : e);
  }
  if (!checkoutUrl) return { error: "Betalen is op dit moment niet mogelijk. Probeer het over een paar minuten opnieuw." };

  redirect(checkoutUrl);
}
