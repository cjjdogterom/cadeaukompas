import Link from "next/link";
import { formatDate, lastOrderDate } from "@/lib/deadlines";
import { LogoMark } from "./Logo";
import { DaysLeft } from "./DaysLeft";

/* Kopbalk van de hele site: promobalk met aftelling, rode balk met logo en zoeken, navigatie. */
const KOP = "font-display";
const KNOP =
  "inline-flex min-h-12 items-center justify-center rounded-md bg-[#12704a] px-5 text-base font-bold text-white transition-colors hover:bg-[#0c5839]";
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
      <p className="bg-[#15130f] px-4 py-2 text-center text-sm leading-snug font-medium text-white sm:text-[15px]">
        <DaysLeft occasion="sinterklaas" />
        <span className="max-sm:block sm:before:content-['_—_']">
          De snelste cadeaus bestel je uiterlijk{" "}
          <strong className="font-bold whitespace-nowrap">
            <span className="sm:hidden">{formatDate(snelsteIso, true)}</span>
            <span className="max-sm:hidden">{formatDate(snelsteIso)}</span>
          </strong>
        </span>
      </p>
      <header className="sticky top-0 z-40 bg-[#d0262d] text-white [&_:focus-visible]:outline-white">
        <div className={`${WRAP} flex flex-wrap items-center gap-x-6 gap-y-2.5 py-3 lg:flex-nowrap lg:py-4`}>
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="OpTijdCadeau, naar de homepage">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-white">
              <LogoMark className="h-8 w-8" />
            </span>
            <span className={`${KOP} text-[22px] leading-none font-extrabold tracking-[-0.01em] sm:text-[26px]`}>OpTijdCadeau</span>
          </Link>
          <form action="/cadeaus" method="get" role="search" className="flex w-full min-w-0 rounded-md bg-white p-1 lg:flex-1">
            <label htmlFor="s3-zoek" className="sr-only">
              Zoek een cadeau
            </label>
            <input
              id="s3-zoek"
              type="search"
              name="q"
              placeholder="Zoek een cadeau, merk of hobby"
              autoComplete="off"
              className="h-11 min-w-0 flex-1 rounded-md bg-white px-3 text-base text-[#15130f] placeholder:text-[#6b6860] focus-visible:!outline-[#15130f] lg:h-12 lg:px-4 lg:text-[17px]"
            />
            <button type="submit" className={`${KNOP} !min-h-11 px-4 focus-visible:!outline-[#15130f] lg:!min-h-12 lg:px-7`}>
              Zoek
            </button>
          </form>
          <nav aria-label="Hoofdmenu" className="hidden shrink-0 lg:block">
            <ul className="flex items-center gap-6 text-base font-bold">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="underline-offset-[6px] hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <nav aria-label="Hoofdmenu" className="border-b border-[#e3e2dc] bg-white lg:hidden">
        <ul className="flex gap-6 overflow-x-auto px-4 text-[15px] font-bold whitespace-nowrap">
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
