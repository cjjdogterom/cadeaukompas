import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { Archivo, Hanken_Grotesk } from "next/font/google";
import { getLandingData, type LandingData } from "@/lib/landing";
import { ARRIVE_BY, formatDate, lastOrderDate } from "@/lib/deadlines";
import { formatPrice } from "@/lib/format";
import { LogoMark } from "@/components/Logo";
import { ProductArt } from "@/components/ProductArt";
import { DaysLeft } from "@/components/DaysLeft";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-s3-kop", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-s3-tekst", display: "swap" });

export const metadata: Metadata = {
  title: "Ontwerp 3 — Snel en duidelijk",
  description: "Cadeaus voor Sinterklaas en kerst, met bij elk cadeau wanneer het in huis is.",
};

/* Kleuren: rood = merk/kopbalk, groen = kopen en levering, verder inkt op lichtgrijs met witte kaarten. */
const ROOD = "#d0262d";
const KOP = "font-[family-name:var(--font-s3-kop)] [font-stretch:86%]";
const KNOP =
  "inline-flex min-h-12 items-center justify-center rounded-md bg-[#12704a] px-5 text-base font-bold text-white transition-colors hover:bg-[#0c5839]";
const WRAP = "mx-auto w-full max-w-[1280px] px-4 sm:px-6";
const H2 = `${KOP} text-[26px] leading-tight font-extrabold tracking-[-0.01em] sm:text-[32px]`;

const NAV = [
  { href: "/cadeaus", label: "Alle cadeaus" },
  { href: "/cadeauzoeker", label: "Cadeauzoeker" },
  { href: "/gids", label: "Gidsen" },
  { href: "/sinterklaasgedicht", label: "Gedichten" },
] as const;

type Item = LandingData["featured"][number];

function Pijl({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

function Vink() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-[#12704a]" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

/** Vlakke strik, zelfgetekend: het enige feestelijke ornament op de pagina. */
function Strik({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true" focusable="false">
      <path d="M60 40 14 10v60z" fill={ROOD} />
      <path d="M60 40l46-30v60z" fill={ROOD} />
      <path d="M52 46 34 80h18l10-28zM68 46l18 34H68L58 52z" fill="#a81d24" />
      <rect x="49" y="29" width="22" height="22" rx="5" fill="#f5f5f2" />
    </svg>
  );
}

/* ---------- Kop ---------- */

function Kop() {
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

/* ---------- Productkaart ---------- */

function Levering({ item, tomorrow }: { item: Item; tomorrow: string }) {
  const morgen = item.delivery.latest === tomorrow;
  return (
    <p className="mt-2 mb-3 text-sm leading-snug">
      <span className="font-bold text-[#12704a]">
        {morgen ? "Morgen in huis" : `Uiterlijk ${formatDate(item.delivery.latest, true)} in huis`}
      </span>{" "}
      <span className="whitespace-nowrap text-[#5c5a54]">{item.delivery.source === "bol" ? `volgens ${item.merchant}` : "verwacht"}</span>
    </p>
  );
}

function Kaart({ item, tomorrow, sizes, className = "" }: { item: Item; tomorrow: string; sizes: string; className?: string }) {
  return (
    <li
      className={`group relative flex flex-col overflow-hidden rounded-md border border-[#dddcd5] bg-white transition-colors focus-within:border-[#15130f] hover:border-[#15130f] ${className}`}
    >
      {/* Vast vierkant: een productfoto (object-contain) past hier later zonder aanpassing in. */}
      <div className="relative aspect-square border-b border-[#ecebe6] bg-white">
        <ProductArt product={item.product} sizes={sizes} />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="truncate text-sm text-[#5c5a54]">{item.brand ?? " "}</p>
        <h3 className="mt-0.5 text-base leading-snug font-semibold">
          <Link href={item.href} className="line-clamp-2 min-h-[2.75em] after:absolute after:inset-0 focus-visible:outline-none">
            {item.title}
          </Link>
        </h3>
        <p className="mt-2.5 flex flex-wrap items-baseline gap-x-2">
          <span className={`${KOP} text-[26px] leading-none font-extrabold tracking-[-0.01em] sm:text-[30px]`}>{formatPrice(item.priceCents)}</span>
          <span className="text-sm text-[#5c5a54]">bij {item.merchant}</span>
        </p>
        <Levering item={item} tomorrow={tomorrow} />
        <span aria-hidden="true" className={`${KNOP} mt-auto !min-h-11 w-full !px-3 text-[15px] group-hover:bg-[#0c5839] sm:text-base`}>
          Bekijk cadeau
        </span>
      </div>
    </li>
  );
}

/* ---------- Secties ---------- */

function VoorWie({ data }: { data: LandingData }) {
  return (
    <section aria-labelledby="s3-voorwie" className="border-b border-[#e3e2dc] bg-white">
      <div className={`${WRAP} flex items-center gap-4 py-3 max-lg:pr-0`}>
        <h2 id="s3-voorwie" className={`${KOP} shrink-0 text-lg font-extrabold`}>
          Voor wie?
        </h2>
        <ul className="flex min-w-0 gap-2 overflow-x-auto py-1 max-lg:pr-4 lg:flex-wrap">
          {data.recipients.map((r) => (
            <li key={r.key} className="shrink-0">
              <Link
                href={r.href}
                className="flex min-h-11 items-center gap-2 rounded-md border border-[#cfcec6] bg-[#f5f5f2] px-3.5 text-[15px] font-semibold whitespace-nowrap transition-colors hover:border-[#15130f] hover:bg-white"
              >
                {r.label}
                <span className="text-sm font-medium text-[#5c5a54]">{r.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Hero({ data }: { data: LandingData }) {
  const keuzes = [
    { titel: "Morgen in huis", sub: formatDate(data.tomorrowDelivery), datum: data.tomorrowDelivery },
    { titel: "Vóór pakjesavond", sub: `In huis uiterlijk ${formatDate(ARRIVE_BY.sinterklaas, true)}`, datum: ARRIVE_BY.sinterklaas },
    { titel: "Vóór kerst", sub: `In huis uiterlijk ${formatDate(ARRIVE_BY.kerst, true)}`, datum: ARRIVE_BY.kerst },
  ];
  return (
    <section aria-labelledby="s3-h1" className={`${WRAP} pt-6 sm:pt-9`}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6">
        <div>
          <h1 id="s3-h1" className={`${KOP} text-[34px] leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-[44px] xl:text-[48px]`}>
            Wanneer moet je cadeau in huis zijn?
          </h1>
          <p className="mt-3 max-w-[58ch] text-[17px] leading-relaxed text-[#3b3933] sm:text-lg">
            Kies een dag en je ziet alleen cadeaus die er dan zijn. Bij elk van de {data.totalProducts} cadeaus staat de
            bezorgdatum erbij.
          </p>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
            {keuzes.map((k) => (
              <li key={k.titel}>
                <Link
                  href={`/cadeaus?uiterlijk=${k.datum}`}
                  className="group flex h-full min-h-[76px] items-center justify-between gap-3 rounded-md border-2 border-[#15130f] bg-white px-4 py-3 transition-colors hover:border-[#12704a] hover:bg-[#eef6f1] sm:min-h-[104px] sm:flex-col sm:items-start sm:justify-between sm:p-5"
                >
                  <span>
                    <span className={`${KOP} block text-[22px] leading-tight font-extrabold tracking-[-0.01em] sm:text-[25px]`}>{k.titel}</span>
                    <span className="mt-0.5 block text-[15px] font-bold text-[#12704a]">{k.sub}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-[15px] font-bold text-[#12704a]">
                    <span className="max-sm:sr-only">Toon cadeaus</span>
                    <Pijl />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <form action="/cadeaus" method="get" className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-md border border-[#dddcd5] bg-white p-3 sm:px-5">
            <label htmlFor="s3-datum" className="text-base font-bold max-sm:w-full">
              Of kies zelf een datum
            </label>
            <input
              id="s3-datum"
              type="date"
              name="uiterlijk"
              defaultValue={ARRIVE_BY.sinterklaas}
              min={data.today}
              required
              className="h-12 min-w-0 flex-1 rounded-md border-2 border-[#15130f] bg-white px-3 text-base font-semibold sm:max-w-[220px]"
            />
            <button type="submit" className={KNOP}>
              Toon cadeaus
            </button>
          </form>
        </div>

        <aside aria-label="Aftelling" className="relative flex flex-col overflow-hidden rounded-md bg-[#15130f] p-5 text-white sm:p-6">
          <Strik className="absolute -top-3 -right-5 w-28 rotate-12" />
          <p className="flex items-end gap-3">
            <span className={`${KOP} text-[84px] leading-[0.8] font-extrabold tracking-[-0.03em] sm:text-[104px]`}>{data.sint.daysLeft}</span>
            <span className={`${KOP} pb-1 text-[22px] leading-[1.05] font-extrabold`}>
              {data.sint.daysLeft === 1 ? "dag" : "dagen"} tot
              <br />
              pakjesavond
            </span>
          </p>
          <p className="mt-5 text-base leading-snug text-[#e9e7e0]">
            Snelste cadeaus: bestel uiterlijk <strong className="font-bold text-white">{formatDate(data.sint.fastestOrderBy)}</strong>.
          </p>
          <p className="mt-4 border-t border-[#3a3832] pt-4 text-base leading-snug text-[#e9e7e0]">
            <strong className={`${KOP} mr-1 text-[22px] font-extrabold text-white`}>{data.kerst.daysLeft}</strong>
            dagen tot kerst. Bestel uiterlijk <strong className="font-bold text-white">{formatDate(data.kerst.fastestOrderBy)}</strong>.
          </p>
          <a href="#s3-deadlines" className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start pt-3 text-base font-bold underline underline-offset-4 focus-visible:!outline-white">
            Alle besteldeadlines <Pijl className="h-4 w-4" />
          </a>
        </aside>
      </div>
    </section>
  );
}

function Populair({ data }: { data: LandingData }) {
  return (
    <section aria-labelledby="s3-populair" className={`${WRAP} pt-9 sm:pt-12`}>
      <SectieKop id="s3-populair" titel="Populair nu" href="/cadeaus" link="Alle cadeaus" />
      <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
        {data.featured.slice(0, 8).map((item) => (
          <Kaart key={item.slug} item={item} tomorrow={data.tomorrowDelivery} sizes="(min-width: 1024px) 300px, 50vw" />
        ))}
      </ul>
    </section>
  );
}

function SectieKop({ id, titel, href, link }: { id: string; titel: string; href?: string; link?: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 id={id} className={H2}>
        {titel}
      </h2>
      {href && (
        <Link href={href} className="flex min-h-11 shrink-0 items-center gap-1.5 text-base font-bold text-[#12704a] underline-offset-4 hover:underline">
          {link} <Pijl className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function Usps() {
  const usps = [
    "Bij elk cadeau staat wanneer het in huis is",
    "Prijzen gecontroleerd op de dag die erbij staat",
    "Je bestelt veilig bij bekende winkels zoals bol",
    "Geen nepkortingen, gewoon de echte prijs",
  ];
  return (
    <section aria-labelledby="s3-usps" className={`${WRAP} pt-9 sm:pt-12`}>
      <h2 id="s3-usps" className="sr-only">
        Waarom OpTijdCadeau
      </h2>
      <ul className="grid gap-x-6 gap-y-3 rounded-md border border-[#dddcd5] bg-white p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
        {usps.map((u) => (
          <li key={u} className="flex gap-2.5 text-base leading-snug font-semibold">
            <Vink />
            {u}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Rijen({ data }: { data: LandingData }) {
  return (
    <>
      {data.rows
        .filter((r) => r.items.length >= 4)
        .map((row, i) => (
          <section key={row.href} aria-labelledby={`s3-rij-${i}`} className={`${WRAP} pt-9 sm:pt-12`}>
            <SectieKop id={`s3-rij-${i}`} titel={row.title} href={row.href} link="Bekijk alles" />
            {/* Mobiel en tablet: horizontaal vegen met snap. Desktop: vaste rij van vijf. */}
            <ul className="-mx-4 mt-4 flex snap-x snap-mandatory scroll-px-4 gap-2.5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:gap-4 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0">
              {row.items.map((item, n) => (
                <Kaart
                  key={item.slug}
                  item={item}
                  tomorrow={data.tomorrowDelivery}
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 60vw"
                  className={`w-[58%] shrink-0 snap-start sm:w-[30%] lg:w-auto ${n >= 5 ? "lg:hidden" : ""}`}
                />
              ))}
            </ul>
          </section>
        ))}
    </>
  );
}

function Deadlines({ data }: { data: LandingData }) {
  const seizoenen = [
    { naam: "Sinterklaas", feest: "pakjesavond", s: data.sint, kleur: ROOD, href: `/cadeaus?uiterlijk=${data.sint.arriveBy}` },
    { naam: "Kerst", feest: "kerst", s: data.kerst, kleur: "#12704a", href: `/cadeaus?uiterlijk=${data.kerst.arriveBy}` },
  ];
  return (
    <section id="s3-deadlines" aria-labelledby="s3-deadlines-kop" className={`${WRAP} scroll-mt-36 pt-12 sm:pt-16`}>
      <h2 id="s3-deadlines-kop" className={H2}>
        Tot wanneer kun je bestellen?
      </h2>
      <p className="mt-2 max-w-[62ch] text-[17px] leading-relaxed text-[#3b3933]">
        We rekenen met werkdagen en een dag extra voor de drukte. Zo ligt je cadeau er de dag vóór pakjesavond en op
        kerstavond.
      </p>
      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {seizoenen.map((z) => (
            <li key={z.naam} className="flex flex-col rounded-md border border-[#dddcd5] bg-white p-5" style={{ borderLeft: `8px solid ${z.kleur}` }}>
              <h3 className={`${KOP} text-2xl font-extrabold`}>{z.naam}</h3>
              <p className="mt-1 text-base leading-snug">
                Nog <strong className="font-bold">{z.s.daysLeft} dagen</strong> tot {z.feest}. In huis uiterlijk{" "}
                <strong className="font-bold">{formatDate(z.s.arriveBy)}</strong>.
              </p>
              <Link href={z.href} className={`${KNOP} mt-4 self-start`}>
                Cadeaus op tijd voor {z.feest}
              </Link>
            </li>
          ))}
        </ul>
        <div className="overflow-hidden rounded-md border border-[#dddcd5] bg-white">
          <table className="w-full border-collapse text-left text-base">
            <caption className="sr-only">Uiterste besteldag per levertijd, voor pakjesavond en kerst</caption>
            <thead>
              <tr className="bg-[#15130f] text-white">
                <th scope="col" className="px-3 py-3 text-[15px] font-bold sm:px-5">
                  Levertijd
                </th>
                <th scope="col" className="px-3 py-3 text-[15px] font-bold sm:px-5">
                  <span className="sm:hidden">Pakjesavond</span>
                  <span className="max-sm:hidden">Bestel voor pakjesavond uiterlijk</span>
                </th>
                <th scope="col" className="px-3 py-3 text-[15px] font-bold sm:px-5">
                  <span className="sm:hidden">Kerst</span>
                  <span className="max-sm:hidden">Bestel voor kerst uiterlijk</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.deadlines.map((d) => (
                <tr key={d.deliveryDays} className="border-t border-[#e3e2dc] align-top">
                  <th scope="row" className="px-3 py-4 font-semibold sm:px-5">
                    {d.deliveryDays === 1 ? d.label : `${d.deliveryDays} werkdagen`}
                    <span className="block text-sm font-normal text-[#5c5a54]">
                      {d.count} {d.count === 1 ? "cadeau" : "cadeaus"}
                    </span>
                  </th>
                  {[d.sinterklaas, d.kerst].map((iso, n) => (
                    <td key={n} className={`${KOP} px-3 py-4 text-lg leading-tight font-extrabold sm:px-5 sm:text-[22px]`}>
                      <span className="sm:hidden">{formatDate(iso, true)}</span>
                      <span className="max-sm:hidden">{formatDate(iso)}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Lijst({ titel, items, kolommen }: { titel: string; items: { key: string; label: string; count: number; href: string }[]; kolommen: string }) {
  return (
    <div className="rounded-md border border-[#dddcd5] bg-white p-4 sm:p-5">
      <h3 className={`${KOP} text-[22px] font-extrabold`}>{titel}</h3>
      <ul className={`mt-2 grid gap-x-6 ${kolommen}`}>
        {items.map((it) => (
          <li key={it.key} className="border-b border-[#ecebe6]">
            <Link href={it.href} className="group flex min-h-12 items-center justify-between gap-3 text-base font-semibold">
              <span className="underline-offset-4 group-hover:underline">{it.label}</span>
              <span className="text-[15px] font-medium text-[#5c5a54] tabular-nums">{it.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ShopOp({ data }: { data: LandingData }) {
  return (
    <section aria-labelledby="s3-shopop" className={`${WRAP} pt-12 sm:pt-16`}>
      <h2 id="s3-shopop" className={H2}>
        Shop op ontvanger, budget of interesse
      </h2>
      <div className="mt-5 grid gap-3 sm:gap-4 lg:grid-cols-[4fr_3fr_5fr]">
        <Lijst titel="Voor wie" items={data.recipients} kolommen="grid-cols-2" />
        <Lijst titel="Budget" items={data.budgets} kolommen="grid-cols-2 lg:grid-cols-1" />
        <Lijst titel="Interesse" items={data.interests} kolommen="grid-cols-2" />
      </div>
    </section>
  );
}

function Gidsen({ data }: { data: LandingData }) {
  return (
    <section aria-labelledby="s3-gidsen" className={`${WRAP} pt-12 sm:pt-16`}>
      <SectieKop id="s3-gidsen" titel="Hulp bij het kiezen" href="/gids" link="Alle gidsen" />
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {data.guides.slice(0, 4).map((g) => (
          <li key={g.slug} className="relative flex flex-col rounded-md border border-[#dddcd5] bg-white p-5 transition-colors hover:border-[#15130f]">
            <h3 className={`${KOP} text-xl leading-tight font-extrabold`}>
              <Link href={g.href} className="after:absolute after:inset-0">
                {g.title}
              </Link>
            </h3>
            <p className="mt-2 line-clamp-3 text-base leading-relaxed text-[#3b3933]">{g.intro}</p>
            <span aria-hidden="true" className="mt-auto flex items-center gap-1.5 pt-4 text-base font-bold text-[#12704a]">
              Lees de gids <Pijl className="h-4 w-4" />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function HoeHetWerkt() {
  const stappen = [
    { kop: "Je kiest hier", tekst: "Zoek op ontvanger, budget of de dag waarop het in huis moet zijn." },
    { kop: "Je bestelt bij de winkel", tekst: "De knop brengt je naar de winkel, nu bol. Daar bestel en betaal je, met hun bezorging en retourregels." },
    { kop: "Wij krijgen mogelijk commissie", tekst: "Koop je via onze link, dan betaalt de winkel ons soms een vergoeding. Jij betaalt niets extra." },
  ];
  return (
    <section aria-labelledby="s3-hoe" className={`${WRAP} py-12 sm:py-16`}>
      <div className="rounded-md border border-[#dddcd5] bg-white p-5 sm:p-8">
        <h2 id="s3-hoe" className={H2}>
          Hoe het werkt
        </h2>
        <ol className="mt-5 grid gap-5 md:grid-cols-3 md:gap-8">
          {stappen.map((s, i) => (
            <li key={s.kop} className="flex gap-3.5">
              <span className={`${KOP} grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[#d0262d] text-lg font-extrabold text-white`}>{i + 1}</span>
              <div>
                <h3 className="text-lg leading-snug font-bold">{s.kop}</h3>
                <p className="mt-1 text-base leading-relaxed text-[#3b3933]">{s.tekst}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 border-t border-[#ecebe6] pt-4 text-base font-bold">
          <Link href="/hoe-wij-verdienen" className="flex min-h-11 items-center underline underline-offset-4">
            Hoe wij verdienen
          </Link>
          <Link href="/contact" className="flex min-h-11 items-center underline underline-offset-4">
            Contact
          </Link>
        </p>
      </div>
    </section>
  );
}

async function Inhoud() {
  await connection(); // aftelling en bezorgdatums hangen af van vandaag
  const data = await getLandingData();
  return (
    <>
      <VoorWie data={data} />
      <Hero data={data} />
      <Populair data={data} />
      <Usps />
      <Rijen data={data} />
      <Deadlines data={data} />
      <ShopOp data={data} />
      <Gidsen data={data} />
      <HoeHetWerkt />
    </>
  );
}

export default function Ontwerp3() {
  return (
    <div
      className={`${archivo.variable} ${hanken.variable} bg-[#f5f5f2] font-[family-name:var(--font-s3-tekst)] text-[#15130f] [&_:focus-visible]:outline-[#15130f]`}
      /* ProductArt gebruikt font-display: binnen dit ontwerp is dat Archivo. */
      style={{ "--font-display": "var(--font-s3-kop)" } as CSSProperties}
    >
      <Kop />
      <main id="inhoud">
        <Suspense fallback={<p className={`${WRAP} min-h-[80vh] py-10 text-base text-[#5c5a54]`}>Cadeaus laden…</p>}>
          <Inhoud />
        </Suspense>
      </main>
    </div>
  );
}
