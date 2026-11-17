import Link from "next/link";
import { site } from "@/lib/site";
import { guides } from "@/lib/guides";
import { CookieSettingsButton } from "./CookieSettingsButton";

export function Footer() {
  const c = site.company;
  return (
    <footer className="mt-20 border-t border-line bg-cream/60 text-sm text-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl text-ink">{site.name}</p>
          <p className="mt-2 leading-relaxed">
            Wij selecteren cadeaus en linken door naar Nederlandse winkels. Bestel je via onze link, dan ontvangen wij
            mogelijk een commissie. Jij betaalt hetzelfde.{" "}
            <Link href="/hoe-wij-verdienen" className="underline underline-offset-2">
              Zo verdienen wij
            </Link>
          </p>
        </div>
        <div>
          <p className="font-semibold text-ink">Gidsen</p>
          <ul className="mt-2 space-y-1.5">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/gids/${g.slug}`} className="hover:text-ink">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-ink">Service</p>
          <ul className="mt-2 space-y-1.5">
            <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
            <li><Link href="/hoe-wij-verdienen" className="hover:text-ink">Hoe wij verdienen</Link></li>
            <li><Link href="/voorwaarden" className="hover:text-ink">Gebruiksvoorwaarden</Link></li>
            <li><Link href="/privacy" className="hover:text-ink">Privacyverklaring</Link></li>
            <li><Link href="/cookies" className="hover:text-ink">Cookiebeleid</Link></li>
            <li><CookieSettingsButton /></li>
          </ul>
        </div>
        <address className="not-italic leading-relaxed">
          <p className="font-semibold text-ink">{c.legalName}</p>
          <p>{c.address}</p>
          <p>{c.email} · {c.phone}</p>
          <p>KvK {c.kvk} · btw {c.vat}</p>
          <p className="mt-2">Alle prijzen zijn inclusief btw.</p>
        </address>
      </div>
    </footer>
  );
}
