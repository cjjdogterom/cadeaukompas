import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { adminDb } from "@/lib/db";
import { syncPayment } from "@/lib/orders";
import { ClearCartOnPaid } from "./ClearCartOnPaid";

export const metadata: Metadata = { title: "Bestelling", robots: { index: false } };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

async function Status({ searchParams }: { searchParams: PageProps<"/bestelling/bedankt">["searchParams"] }) {
  const { order: orderId } = await searchParams;
  await connection();
  if (typeof orderId !== "string" || !UUID.test(orderId)) return <Message title="Bestelling niet gevonden" />;

  const db = adminDb();
  const { data: order } = await db
    .from("orders")
    .select("order_number, status, mollie_payment_id, promised_delivery_date")
    .eq("id", orderId)
    .maybeSingle();
  if (!order) return <Message title="Bestelling niet gevonden" />;

  let status = order.status as string;
  if (status === "open" && order.mollie_payment_id) {
    status = (await syncPayment(order.mollie_payment_id).catch(() => null))?.status ?? status;
  }

  if (status === "paid" || ["forwarded", "shipped", "delivered"].includes(status)) {
    return (
      <>
        <ClearCartOnPaid />
        <Message title="Bedankt voor je bestelling!">
          Ordernummer <strong>{order.order_number}</strong>. Je ontvangt een bevestiging per e-mail en een track &amp; trace zodra
          je pakket onderweg is
          {order.promised_delivery_date ? `; verwachte levering uiterlijk ${order.promised_delivery_date}` : ""}.
        </Message>
      </>
    );
  }
  if (status === "open") {
    return <Message title="We wachten nog op je betaling">Ververs deze pagina over een minuut. Lukt het niet? Neem contact met ons op.</Message>;
  }
  return (
    <Message title="De betaling is niet gelukt">
      Er is niets afgeschreven. Je winkelwagen staat nog klaar. <Link href="/winkelwagen" className="underline">Probeer het opnieuw</Link>.
    </Message>
  );
}

function Message({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h1 className="font-display text-3xl font-semibold text-ink">{title}</h1>
      {children && <p className="mt-3 leading-relaxed text-ink/85">{children}</p>}
    </div>
  );
}

export default function BedanktPage({ searchParams }: PageProps<"/bestelling/bedankt">) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Suspense fallback={<p className="text-muted">Status ophalen…</p>}>
        <Status searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
