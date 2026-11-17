import { NextResponse, type NextRequest } from "next/server";
import { syncPayment } from "@/lib/orders";

/**
 * Mollie roept dit aan bij elke statuswijziging met alleen het betaling-id.
 * We vertrouwen de body niet: de status wordt altijd bij Mollie zelf opgehaald.
 * Let op: Vercel Deployment Protection blokkeert dit; zet "Protection Bypass" of zet bescherming uit vóór livegang.
 */
export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  const id = form?.get("id");
  if (typeof id !== "string" || !id.startsWith("tr_")) return new NextResponse("Ongeldig verzoek", { status: 400 });
  try {
    await syncPayment(id);
    return new NextResponse("OK");
  } catch (e) {
    console.error("mollie webhook", e instanceof Error ? e.message : e);
    return new NextResponse("Fout", { status: 500 }); // Mollie probeert het later opnieuw
  }
}
