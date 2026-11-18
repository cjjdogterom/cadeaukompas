import { NextResponse } from "next/server";

/**
 * Diagnose van de bol Marketing Catalog API. Geeft alleen statuscodes, limieten en openbare
 * productgegevens terug, nooit sleutels of tokens.
 */
export async function GET() {
  const id = process.env.BOL_API_CLIENT_ID;
  const secret = process.env.BOL_API_CLIENT_SECRET;
  if (!id || !secret) return NextResponse.json({ configured: false });
  const out: Record<string, unknown> = { configured: true };
  const tokenRes = await fetch("https://login.bol.com/token?grant_type=client_credentials", {
    method: "POST",
    headers: { Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`, Accept: "application/json" },
  });
  out.token = tokenRes.status;
  if (!tokenRes.ok) return NextResponse.json(out);
  const { access_token, expires_in, scope } = (await tokenRes.json()) as { access_token: string; expires_in: number; scope?: string };
  out.expiresIn = expires_in;
  out.scope = scope;
  const call = async (path: string) => {
    const r = await fetch(`https://api.bol.com/marketing/catalog/v1${path}`, {
      headers: { Authorization: `Bearer ${access_token}`, Accept: "application/json", "Accept-Language": "nl" },
    });
    const rate = Object.fromEntries([...r.headers.entries()].filter(([k]) => k.includes("ratelimit") || k === "retry-after"));
    let body: unknown = null;
    try {
      body = await r.json();
    } catch {
      body = null;
    }
    return { status: r.status, rate, body };
  };
  out.offer = await call("/products/8717677330065/offers/best?country-code=NL");
  out.toEan = await call("/products/9300000148921207/to-ean");
  out.product = await call("/products/8717677330065?country-code=NL&include-image=true&include-offer=true&include-rating=true");
  return NextResponse.json(out);
}
