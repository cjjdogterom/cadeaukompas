import { NextResponse } from "next/server";
import { getProducts } from "@/lib/catalog";
import { getBolOffer } from "@/lib/bol";

export const maxDuration = 120;

/** Vult de cache met de bezorgbelofte van bol voor alle producten (Vercel Cron, elk half uur). */
export async function GET() {
  const products = (await getProducts()).filter((p) => p.merchant === "bol" && p.ean && /^\d{13}$/.test(p.ean));
  let ok = 0;
  let failed = 0;
  for (const p of products) {
    try {
      if (await getBolOffer(p.ean!)) ok++;
    } catch {
      failed++;
    }
  }
  return NextResponse.json({ products: products.length, ok, failed });
}
