import { NextResponse, type NextRequest } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createSaltCache, visitorHash } from "@/lib/visit";

const BOT = /bot|crawl|spider|slurp|preview|monitor|headless|lighthouse|pingdom|curl|wget|python|vercel/i;

let db: SupabaseClient | null = null;
function client(url: string, key: string): SupabaseClient {
  db ??= createClient(url, key, { auth: { persistSession: false } });
  return db;
}

let saltFor: ReturnType<typeof createSaltCache> | null = null;

/**
 * Telt een paginabezoek: geen IP en geen cookie worden opgeslagen.
 * `visitor` is een hash met een willekeurige salt die elke dag wisselt en daarna wordt verwijderd
 * (`page_view_salt()`, migratie 0003; die ruimt ook bezoeken ouder dan 12 maanden op).
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
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam" }).format(new Date());
  saltFor ??= createSaltCache(async () => {
    const { data, error } = await client(url, key).rpc("page_view_salt");
    if (error) {
      console.error("page_view_salt", error.message);
      return null;
    }
    const row = (Array.isArray(data) ? data[0] : data) as { salt_day?: string; salt_value?: string } | undefined;
    return row?.salt_day && row.salt_value ? { day: row.salt_day, salt: row.salt_value } : null;
  });
  const daily = await saltFor(today);
  if (!daily) return new NextResponse(null, { status: 204 }); // geen salt (migratie 0003 ontbreekt?): niet tellen
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const visitor = visitorHash(daily.day, ip, ua, daily.salt);
  const device = /mobile|iphone|android/i.test(ua) ? "mobiel" : "desktop";

  const { error } = await client(url, key)
    .from("page_views")
    .insert({ day: daily.day, path, ref_host: refHost, visitor, device });
  if (error) console.error("page_views", error.message);
  return new NextResponse(null, { status: 204 });
}
