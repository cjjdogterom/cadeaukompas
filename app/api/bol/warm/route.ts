import { NextResponse, type NextRequest } from "next/server";
import { getProducts } from "@/lib/catalog";
import { getBolOffer } from "@/lib/bol";

export const maxDuration = 60;

/** Vult de cache met de bezorgbelofte van bol, in porties: /api/bol/warm?offset=0 (100 per keer). */
export async function GET(request: NextRequest) {
  const offset = Math.max(0, Number(request.nextUrl.searchParams.get("offset") ?? 0));
  const all = (await getProducts()).filter((p) => p.merchant === "bol" && p.ean && /^\d{13}$/.test(p.ean));
  const products = all.slice(offset, offset + 100);
  let ok = 0;
  let failed = 0;
  for (const p of products) {
    try {
      if (await getBolOffer(p.ean!)) ok++;
    } catch {
      failed++;
    }
  }
  return NextResponse.json({ total: all.length, offset, products: products.length, ok, failed });
}
