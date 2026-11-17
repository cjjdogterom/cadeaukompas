import "server-only";
import { adminDb } from "./db";
import { getPayment } from "./mollie";
import { sendOrderConfirmation } from "./email";

type OrderStatus = "open" | "paid" | "failed" | "canceled" | "expired";

const FROM_MOLLIE: Partial<Record<string, OrderStatus>> = {
  paid: "paid",
  failed: "failed",
  canceled: "canceled",
  expired: "expired",
};

/**
 * Haalt de betaalstatus bij Mollie op en werkt de order bij (idempotent).
 * Gebruikt door de webhook én door de bedankpagina (lokaal bereikt de webhook ons niet).
 */
export async function syncPayment(paymentId: string): Promise<{ orderId: string; status: string } | null> {
  const payment = await getPayment(paymentId);
  const db = adminDb();
  const { data: order } = await db
    .from("orders")
    .select("id, order_number, status, email, name, shipping_cents, total_cents, vat_cents, promised_delivery_date")
    .eq("mollie_payment_id", payment.id)
    .maybeSingle();
  if (!order) return null;

  const next = FROM_MOLLIE[payment.status];
  // Alleen vanuit 'open' bijwerken; latere statussen (forwarded, shipped, ...) beheert Order-ops.
  if (!next || order.status !== "open") return { orderId: order.id, status: order.status };

  const { data: updated } = await db
    .from("orders")
    .update({ status: next, updated_at: new Date().toISOString() })
    .eq("id", order.id)
    .eq("status", "open") // voorkomt dubbele verwerking bij gelijktijdige webhook + terugkeer
    .select("id")
    .maybeSingle();

  if (updated && next === "paid") {
    const { data: items } = await db
      .from("order_items")
      .select("quantity, unit_price_cents, products(title)")
      .eq("order_id", order.id);
    await sendOrderConfirmation({
      orderNumber: order.order_number,
      email: order.email,
      name: order.name,
      items: (items ?? []).map((i) => ({
        title: (i.products as unknown as { title: string } | null)?.title ?? "Product",
        quantity: i.quantity,
        unitPriceCents: i.unit_price_cents,
      })),
      shippingCents: order.shipping_cents,
      totalCents: order.total_cents,
      vatCents: order.vat_cents,
      promisedDeliveryDate: order.promised_delivery_date,
    });
  }
  return { orderId: order.id, status: updated ? next : order.status };
}
