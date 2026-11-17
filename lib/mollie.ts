import "server-only";

/**
 * Minimale Mollie Payments API-client (v2). Testmodus zolang MOLLIE_API_KEY met `test_` begint.
 * Livegang met een `live_`-sleutel alleen na akkoord eigenaar (ops/decisions.md).
 * Klarna via de Payments API vraagt orderregels + adres; volgt in een volgende stap.
 */
const API = "https://api.mollie.com/v2";

export type MolliePayment = {
  id: string;
  status: "open" | "pending" | "authorized" | "paid" | "canceled" | "expired" | "failed";
  amount: { currency: string; value: string };
  metadata: { orderId?: string } | null;
  _links: { checkout?: { href: string } };
};

function key(): string {
  const k = process.env.MOLLIE_API_KEY;
  if (!k) throw new Error("MOLLIE_API_KEY ontbreekt.");
  return k;
}

export function isTestMode(): boolean {
  return (process.env.MOLLIE_API_KEY ?? "").startsWith("test_");
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${key()}`, "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Mollie ${res.status}: ${body?.detail ?? body?.title ?? "onbekende fout"}`);
  return body as T;
}

export function createPayment(input: {
  amountValue: string;
  description: string;
  redirectUrl: string;
  webhookUrl?: string;
  orderId: string;
}): Promise<MolliePayment> {
  return call<MolliePayment>("/payments", {
    method: "POST",
    body: JSON.stringify({
      amount: { currency: "EUR", value: input.amountValue },
      description: input.description,
      redirectUrl: input.redirectUrl,
      // Mollie kan localhost niet bereiken; lokaal wordt de status bij terugkeer opgehaald.
      ...(input.webhookUrl ? { webhookUrl: input.webhookUrl } : {}),
      locale: "nl_NL",
      metadata: { orderId: input.orderId },
    }),
  });
}

export function getPayment(id: string): Promise<MolliePayment> {
  if (!/^tr_[A-Za-z0-9]+$/.test(id)) throw new Error("Ongeldig betaling-id");
  return call<MolliePayment>(`/payments/${id}`);
}
