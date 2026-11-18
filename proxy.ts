import { NextResponse, type NextRequest } from "next/server";

/**
 * Beveiligt het eigenaar-dashboard met HTTP Basic Auth (wachtwoord in ADMIN_PASSWORD).
 * Zonder wachtwoord is /admin alleen bereikbaar in lokale ontwikkeling (`npm run dev`).
 */
export function proxy(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    if (process.env.NODE_ENV === "development") return NextResponse.next();
    return new NextResponse("Niet gevonden", { status: 404 });
  }

  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const decoded = atob(header.slice(6));
    const given = decoded.slice(decoded.indexOf(":") + 1);
    if (given === password) {
      const res = NextResponse.next();
      res.headers.set("X-Robots-Tag", "noindex, nofollow");
      // Markeer deze browser als die van de eigenaar, zodat eigen bezoeken niet meetellen in de statistieken.
      res.cookies.set("ck-eigenaar", "1", { maxAge: 60 * 60 * 24 * 365, httpOnly: true, sameSite: "lax", secure: true, path: "/" });
      return res;
    }
  }
  return new NextResponse("Inloggen vereist", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Dashboard", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
