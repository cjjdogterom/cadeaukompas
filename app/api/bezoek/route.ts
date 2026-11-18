import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const BOT = /bot|crawl|spider|slurp|preview|monitor|headless|lighthouse|pingdom|curl|wget|python|vercel/i;

/**
 * Telt een paginabezoek, zonder persoonsgegevens: geen IP en geen cookie worden opgeslagen.
 * `visitor` is een hash die elke dag wisselt, alleen om unieke bezoekers per dag te tellen.
 * Bezoeken van de eigenaar (cookie ck-eigenaar, gezet bij inloggen op /admin) en bots tellen niet mee.
 */
export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const ua = request.headers.get("user-agent") ?? "";
  if (!url || !key || request.cookies.has("ck-eigenaar") || BOT.test(ua) || !ua) return new NextResponse(null, { status: 204 });

  let body: { path?: unknown; ref?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }
  const path = typeof body.path === "string" && body.path.startsWith("/") ? body.path.split("?")[0].slice(0, 200) : null;
  if (!path || path.startsWith("/admin")) return new NextResponse(null, { status: 204 });

  let refHost: string | null = null;
  if (typeof body.ref === "string" && body.ref) {
    try {
      const h = new URL(body.ref).hostname.replace(/^www\./, "");
      if (h && h !== request.nextUrl.hostname.replace(/^www\./, "")) refHost = h.slice(0, 100);
    } catch {
      refHost = null;
    }
  }
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam" }).format(new Date());
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const visitor = createHash("sha256").update(`${day}|${ip}|${ua}|${key}`).digest("hex").slice(0, 16);
  const device = /mobile|iphone|android/i.test(ua) ? "mobiel" : "desktop";

  const { error } = await createClient(url, key, { auth: { persistSession: false } })
    .from("page_views")
    .insert({ day, path, ref_host: refHost, visitor, device });
  if (error) console.error("page_views", error.message);
  return new NextResponse(null, { status: 204 });
}
