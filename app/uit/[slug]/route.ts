import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getProduct } from "@/lib/catalog";
import { affiliateUrl } from "@/lib/affiliate";

/** Uitgaande affiliate-klik: log (zonder persoonsgegevens) en stuur door naar de winkel. */
export async function GET(request: NextRequest, ctx: RouteContext<"/uit/[slug]">) {
  const { slug } = await ctx.params;
  const product = await getProduct(slug);
  if (!product) return NextResponse.redirect(new URL("/cadeaus", request.url), 302);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) {
    const sp = request.nextUrl.searchParams;
    const referer = request.headers.get("referer");
    await createClient(url, key, { auth: { persistSession: false } })
      .from("outbound_clicks")
      .insert({
        product_slug: product.slug,
        merchant: product.merchant,
        source_path: referer ? new URL(referer).pathname : null,
        utm_source: sp.get("utm_source"),
        utm_medium: sp.get("utm_medium"),
        utm_campaign: sp.get("utm_campaign"),
      })
      .then(({ error }) => error && console.error("outbound_clicks", error.message));
  }

  const res = NextResponse.redirect(affiliateUrl(product), 302);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");
  return res;
}
