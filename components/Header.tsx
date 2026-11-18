import Link from "next/link";
import { formatDate, lastOrderDate } from "@/lib/deadlines";
import { LogoMark } from "./Logo";
import { DaysLeft } from "./DaysLeft";

/* Kopbalk van de hele site: promobalk met aftelling, rode balk met logo en zoeken, navigatie. */
const KOP = "font-display";
const KNOP =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-[#2f6f55] px-6 text-base font-bold text-white transition-colors hover:bg-[#255a45]";
const WRAP = "mx-auto w-full max-w-[1280px] px-4 sm:px-6";

const NAV = [
  { href: "/cadeaus", label: "Alle cadeaus" },
  { href: "/cadeauzoeker", label: "Cadeauzoeker" },
  { href: "/gids", label: "Gidsen" },
  { href: "/sinterklaasgedicht", label: "Gedichten" },
] as const;

export function Header() {
  const snelsteIso = lastOrderDate(1, "sinterklaas");
  return (
    <>
      <p className="bg-[#f6e6df] px-4 py-2.5 text-center text-[15px] leading-snug text-[#2b2622] sm:text-base">
        <DaysLeft occasion="sinterklaas" />
        <span className="max-sm:block sm:before:content-['_·_']">
          De snelste cadeaus bestel je uiterlijk{" "}
          <strong className="font-bold whitespace-nowrap">
            <span className="sm:hidden">{formatDate(snelsteIso, true)}</span>
            <span className="max-sm:hidden">{formatDate(snelsteIso)}</span>
          </strong>
        </span>
      </p>
      <header className="sticky top-0 z-40 border-b border-[#ebe4d8] bg-white text-[#2b2622]">
        <div className={`${WRAP} flex flex-wrap items-center gap-x-6 gap-y-2.5 py-3 lg:flex-nowrap lg:py-4`}>
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="OpTijdCadeau, naar de homepage">
            <LogoMark className="h-10 w-10" />
            <span className={`${KOP} text-[23px] leading-none font-extrabold tracking-[-0.01em] sm:text-[26px]`}>
              <span className="text-[#b8433f]">OpTijd</span>Cadeau
            </span>
          </Link>
          <form action="/cadeaus" method="get" role="search" className="flex w-full min-w-0 rounded-full bg-[#f3eee5] p-1 lg:flex-1">
            <label htmlFor="kop-zoek" className="sr-only">
              Zoek een cadeau
            </label>
            <input
              id="kop-zoek"
              type="search"
              name="q"
              placeholder="Zoek een cadeau, merk of hobby"
              autoComplete="off"
              className="h-11 min-w-0 flex-1 rounded-full bg-transparent px-4 text-base text-[#2b2622] placeholder:text-[#6a6156] lg:h-12 lg:px-5 lg:text-[17px]"
            />
            <button type="submit" className={`${KNOP} !min-h-11 lg:!min-h-12 lg:px-7`}>
              Zoek
            </button>
          </form>
          <nav aria-label="Hoofdmenu" className="hidden shrink-0 lg:block">
            <ul className="flex items-center gap-6 text-base font-bold">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="rounded-full px-1 py-2 underline-offset-[6px] hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <nav aria-label="Hoofdmenu" className="border-b border-[#ebe4d8] bg-white lg:hidden">
        <ul className="flex gap-6 overflow-x-auto px-4 text-base font-bold whitespace-nowrap">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="flex min-h-12 items-center">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
