import { NextResponse, type NextRequest } from "next/server";
import { getProducts } from "@/lib/catalog";
import { bolProductIdFromUrl, fetchBolProduct, fetchEan } from "@/lib/bol";

export const maxDuration = 120;

/**
 * Verrijking van de catalogus uit de bol Marketing Catalog API: EAN en hoofdafbeelding per product.
 * Alleen openbare productgegevens; de catalogus-agent schrijft het resultaat in data/products.json.
 * Gebruik: /api/bol/catalog?offset=0&limit=40
 */
export async function GET(request: NextRequest) {
  const offset = Math.max(0, Number(request.nextUrl.searchParams.get("offset") ?? 0));
  const limit = Math.min(50, Math.max(1, Number(request.nextUrl.searchParams.get("limit") ?? 40)));
  const all = (await getProducts()).filter((p) => p.merchant === "bol").sort((a, b) => a.slug.localeCompare(b.slug));
  const items = [];
  for (const p of all.slice(offset, offset + limit)) {
    const id = bolProductIdFromUrl(p.merchantUrl);
    const ean = p.ean && /^\d{13}$/.test(p.ean) ? p.ean : id ? await fetchEan(id) : null;
    const bol = ean ? await fetchBolProduct(ean) : null;
    items.push({ slug: p.slug, ean, imageUrl: bol?.imageUrl ?? null, imageWidth: bol?.imageWidth ?? null, imageHeight: bol?.imageHeight ?? null, priceCents: bol?.priceCents ?? null });
  }
  return NextResponse.json({ total: all.length, offset, count: items.length, items });
}
