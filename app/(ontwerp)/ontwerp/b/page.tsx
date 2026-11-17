import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { getLandingData, type LandingData } from "@/lib/landing";
import { ARRIVE_BY, formatDate } from "@/lib/deadlines";
import { formatPrice } from "@/lib/format";
import { BEELD } from "@/lib/beeld";
import { LogoMark } from "@/components/Logo";
import { ProductArt } from "@/components/ProductArt";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-b-display",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-b-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ontwerp B · Kerstnacht",
  description:
    "Cadeaus die op tijd onder de boom liggen: bij elk cadeau zie je wanneer het in huis is.",
};

/*
 * Variant B, "Kerstnacht": dennengroene grond, crème inkt, goud op de actie.
 * (Geen CSS-module: de turbopack-regel in next.config behandelt elk *.css-bestand als globaal.)
 */
const vars = {
  "--b-ground": "#0f2a24",
  "--b-ink": "#f2ead9",
  "--b-gold": "#d9a93f",
  "--b-gold-hover": "#e6bb58",
  "--b-tone": "#143630",
  "--font-display": "var(--font-b-display), Georgia, serif",
  fontFamily: "var(--font-b-sans), system-ui, sans-serif",
} as React.CSSProperties;

const s = {
  page: "bg-(--b-ground) text-(--b-ink) text-[1.0625rem] leading-[1.6]",
  display:
    "font-display font-semibold leading-[1.02] tracking-[-0.01em] text-balance",
  heroArt:
    "relative aspect-[4/3] overflow-hidden md:aspect-auto md:h-[min(56svh,600px)] md:min-h-[340px]",
  action:
    "bg-(--b-gold) text-(--b-ground) font-bold transition-colors hover:bg-(--b-gold-hover)",
  quick:
    "bg-(--b-tone) text-(--b-ink) font-semibold transition-colors hover:bg-[#1b453d]",
  dateInput:
    "bg-(--b-ink) text-(--b-ground) font-semibold [color-scheme:light]",
  link: "underline decoration-1 underline-offset-[0.2em] decoration-current/45 transition-colors hover:decoration-current",
  card: "bg-(--b-ink) text-(--b-ground)",
  table: "w-full border-collapse",
  cell: "border-b border-[rgb(15_42_36/0.22)] py-[1.1rem] text-left align-baseline",
  headCell:
    "border-b border-[rgb(15_42_36/0.6)] pb-[1.1rem] text-left align-baseline font-bold",
  tone: "bg-(--b-tone)",
  productLink: "group",
  productTitle:
    "group-hover:underline group-hover:underline-offset-4 group-hover:decoration-1",
};

const wrap = "mx-auto w-full max-w-[1312px] px-4 sm:px-8 lg:px-12";
const sectionGap = "mt-24 md:mt-40";

const NAV = [
  { href: "/cadeaus", label: "Alle cadeaus" },
  { href: "/cadeauzoeker", label: "Cadeauzoeker" },
  { href: "/gids", label: "Gidsen" },
  { href: "/sinterklaasgedicht", label: "Gedichten" },
];

function days(n: number) {
  return n === 1 ? "1 dag" : `${n} dagen`;
}

/* ---------- Kopbalk ---------- */

function Kopbalk() {
  return (
    <header className={`${wrap} pt-5 pb-6 md:pt-7 md:pb-8`}>
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5"
          aria-label="OpTijdCadeau, naar de homepage"
        >
          <LogoMark className="h-9 w-9" />
          <span className={`${s.display} text-[1.45rem] sm:text-[1.7rem]`}>
            OpTijdCadeau
          </span>
        </Link>
        <nav
          aria-label="Hoofdmenu"
          className="hidden items-center gap-8 lg:flex"
        >
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="font-semibold hover:underline hover:underline-offset-4"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href="#datum"
          className={`${s.action} inline-flex min-h-11 items-center px-4 text-[0.95rem] whitespace-nowrap sm:px-5`}
        >
          Kies je datum
        </a>
      </div>
      <nav
        aria-label="Hoofdmenu (mobiel)"
        className="mt-4 flex flex-wrap gap-x-5 gap-y-1 lg:hidden"
      >
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="py-1 font-semibold">
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

/* ---------- 1. Hero ---------- */

function Aftelling({ data }: { data: LandingData }) {
  const regels = [
    { naam: "kerst", ...data.kerst },
    { naam: "pakjesavond", ...data.sint },
  ];
  return (
    <ul className="space-y-3 lg:col-span-7 lg:mt-8">
      {regels.map((r) =>
        r.daysLeft > 0 ? (
          <li key={r.naam}>
            Nog <strong className="font-bold">{days(r.daysLeft)}</strong> tot{" "}
            {r.naam}. De snelste cadeaus kun je bestellen tot{" "}
            {r.fastestOrderBy >= data.today
              ? formatDate(r.fastestOrderBy)
              : "vandaag"}
            .
          </li>
        ) : (
          <li key={r.naam}>
            Het is bijna {r.naam}: kies cadeaus die morgen in huis zijn.
          </li>
        ),
      )}
    </ul>
  );
}

function Hero({ data }: { data?: LandingData }) {
  const snel = [
    { label: "Kerst", iso: ARRIVE_BY.kerst },
    { label: "Pakjesavond", iso: ARRIVE_BY.sinterklaas },
  ];
  return (
    <section aria-labelledby="hero-kop">
      <div className={wrap}>
        <div className={s.heroArt}>
          <Image
            src={BEELD.kerstEngel.src}
            alt={BEELD.kerstEngel.alt}
            fill
            preload
            sizes="(min-width: 1312px) 1216px, 100vw"
            className="object-cover object-[50%_15%]"
          />
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0">
          <div className="lg:col-span-7">
            <h1
              id="hero-kop"
              className={`${s.display} text-[2.3rem] min-[400px]:text-[2.5rem] sm:text-6xl lg:text-[3.6rem] xl:text-[4.75rem]`}
            >
              Cadeaus die op tijd onder de boom liggen
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg">
              Bij elk cadeau zie je eerlijk wanneer het in huis is, en tot
              wanneer je kunt bestellen. Voor kerst, en voor pakjesavond ook.
            </p>
          </div>

          <div className="lg:col-span-5 lg:row-span-2 lg:pt-3" id="datum">
            <form action="/cadeaus" method="get">
              <label
                htmlFor="b-uiterlijk"
                className={`${s.display} block text-[1.9rem] sm:text-[2.2rem]`}
              >
                Wanneer moet het in huis zijn?
              </label>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <input
                  id="b-uiterlijk"
                  type="date"
                  name="uiterlijk"
                  required
                  defaultValue={ARRIVE_BY.kerst}
                  min={data?.today}
                  className={`${s.dateInput} min-h-13 flex-1 px-4 text-lg`}
                />
                <button
                  type="submit"
                  className={`${s.action} min-h-13 px-6 text-lg`}
                >
                  Toon cadeaus
                </button>
              </div>
            </form>
            <p className="mt-6">Of kies meteen:</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {snel.map((k) => (
                <Link
                  key={k.iso}
                  href={`/cadeaus?uiterlijk=${k.iso}`}
                  className={`${s.quick} block px-4 py-3`}
                >
                  <span className="block text-lg">{k.label}</span>
                  <span className="block font-normal">
                    in huis {formatDate(k.iso, true)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          {data && <Aftelling data={data} />}
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. Besteldeadlines als gedrukt kaartje ---------- */

function Deadlines({ data }: { data: LandingData }) {
  const cel = (iso: string) =>
    iso < data.today ? (
      <span>Verstreken</span>
    ) : (
      <>
        <span className="hidden sm:inline">{formatDate(iso)}</span>
        <span className="sm:hidden">{formatDate(iso, true)}</span>
      </>
    );
  return (
    <section
      aria-labelledby="deadlines-kop"
      className={`${wrap} ${sectionGap}`}
    >
      <div
        className={`${s.card} grid gap-10 px-5 py-12 sm:px-10 md:py-16 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:py-20`}
      >
        <div className="lg:col-span-4">
          <h2
            id="deadlines-kop"
            className={`${s.display} text-[2.3rem] sm:text-5xl`}
          >
            Tot wanneer je kunt bestellen
          </h2>
          <p className="mt-5">
            Hoe sneller een cadeau geleverd wordt, hoe langer je de tijd hebt.
            We rekenen in werkdagen en houden een dag reserve voor de drukte,
            zodat het uiterlijk op kerstavond of op de dag vóór pakjesavond bij
            je is.
          </p>
        </div>

        <div className="lg:col-span-8">
          <table className={`${s.table} text-[1rem] sm:text-[1.05rem]`}>
            <caption className="sr-only">
              Laatste besteldag per levertijd, voor kerst en voor pakjesavond
            </caption>
            <thead>
              <tr>
                <th scope="col" className={`${s.headCell} pr-3`}>
                  Levertijd
                </th>
                <th scope="col" className={`${s.headCell} pr-3`}>
                  Voor kerst
                </th>
                <th scope="col" className={s.headCell}>
                  Voor pakjesavond
                </th>
              </tr>
            </thead>
            <tbody>
              {data.deadlines.map((d, i) => {
                const last =
                  i === data.deadlines.length - 1 ? "border-b-0" : "";
                return (
                  <tr key={d.deliveryDays}>
                    <th
                      scope="row"
                      className={`${s.cell} ${last} pr-3 font-semibold`}
                    >
                      {d.label}
                      <span className="block font-normal">
                        {d.count} cadeaus
                      </span>
                    </th>
                    <td
                      className={`${s.cell} ${last} ${s.display} pr-3 text-[1.3rem] whitespace-nowrap sm:text-[2rem]`}
                    >
                      {cel(d.kerst)}
                    </td>
                    <td
                      className={`${s.cell} ${last} font-semibold whitespace-nowrap`}
                    >
                      {cel(d.sinterklaas)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-8 flex flex-col gap-2 font-semibold sm:flex-row sm:gap-8">
            <Link
              href={`/cadeaus?uiterlijk=${ARRIVE_BY.kerst}`}
              className={s.link}
            >
              Alles wat op tijd is voor kerst
            </Link>
            <Link
              href={`/cadeaus?uiterlijk=${ARRIVE_BY.sinterklaas}`}
              className={s.link}
            >
              Alles wat op tijd is voor pakjesavond
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Voor wie ---------- */

function VoorWie({ data }: { data: LandingData }) {
  return (
    <section aria-labelledby="voorwie-kop" className={`${wrap} ${sectionGap}`}>
      <div className="grid gap-12 md:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[1059/1631] w-full md:col-span-5">
          <Image
            src={BEELD.kerstBezoek.src}
            alt={BEELD.kerstBezoek.alt}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="md:col-span-7 md:self-center">
          <h2
            id="voorwie-kop"
            className={`${s.display} text-[2.3rem] sm:text-5xl lg:text-6xl`}
          >
            Voor wie zoek je iets?
          </h2>
          <p className="mt-5 max-w-[32rem]">
            Kies de ontvanger, dan zie je alleen wat bij die persoon past.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {data.recipients.map((r) => (
              <li key={r.key}>
                <Link
                  href={r.href}
                  className="group flex items-baseline justify-between gap-4 py-2.5"
                >
                  <span
                    className={`${s.display} text-[1.9rem] group-hover:underline group-hover:underline-offset-4`}
                  >
                    {r.label}
                  </span>
                  <span>{r.count} cadeaus</span>
                </Link>
              </li>
            ))}
          </ul>

          <h3 className={`${s.display} mt-14 text-[1.9rem]`}>
            Of begin bij je budget
          </h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {data.budgets.map((b) => (
              <li key={b.key}>
                <Link
                  href={b.href}
                  className={`${s.quick} inline-flex min-h-11 items-center gap-2 px-4`}
                >
                  {b.label}
                  <span className="font-normal">({b.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. Uitgelicht ---------- */

function Uitgelicht({ data }: { data: LandingData }) {
  return (
    <section
      aria-labelledby="uitgelicht-kop"
      className={`${wrap} ${sectionGap}`}
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <h2
          id="uitgelicht-kop"
          className={`${s.display} max-w-[40rem] text-[2.3rem] sm:text-5xl lg:text-6xl`}
        >
          Nu besteld, op tijd in huis
        </h2>
        <Link href="/cadeaus" className={`${s.link} font-semibold`}>
          Alle {data.totalProducts} cadeaus bekijken
        </Link>
      </div>
      <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-16">
        {data.featured.map((item) => (
          <li key={item.slug}>
            <Link href={item.href} className={`${s.productLink} block`}>
              <div className="relative aspect-square overflow-hidden">
                <ProductArt
                  product={item.product}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </div>
              {item.brand && <p className="mt-4 font-semibold">{item.brand}</p>}
              <h3
                className={`${s.display} ${s.productTitle} ${item.brand ? "mt-1" : "mt-4"} line-clamp-2 text-[1.35rem] sm:text-[1.5rem]`}
              >
                {item.title}
              </h3>
              <p className="mt-2">
                <span className="font-bold">
                  {formatPrice(item.priceCents)}
                </span>{" "}
                bij {item.merchant}
              </p>
              {item.delivery && (
                <p className="mt-1">
                  Uiterlijk in huis {formatDate(item.delivery.latest, true)}
                  {item.delivery.source === "bol"
                    ? ", volgens bol"
                    : ", verwacht"}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- 5. Gidsen ---------- */

function Gidsen({ data }: { data: LandingData }) {
  return (
    <section
      aria-labelledby="gidsen-kop"
      className={`${sectionGap} ${s.tone} py-20 md:py-28`}
    >
      <div className={wrap}>
        <h2
          id="gidsen-kop"
          className={`${s.display} max-w-[40rem] text-[2.3rem] sm:text-5xl lg:text-6xl`}
        >
          Gidsen om rustig door te lezen
        </h2>
        <ul className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
          {data.guides.map((g) => (
            <li key={g.slug}>
              <h3 className={`${s.display} text-[1.7rem] sm:text-[1.9rem]`}>
                <Link href={g.href} className={s.link}>
                  {g.title}
                </Link>
              </h3>
              <p className="mt-2 line-clamp-3 max-w-[36rem]">{g.intro}</p>
            </li>
          ))}
        </ul>
        <p className="mt-12">
          <Link href="/gids" className={`${s.link} font-semibold`}>
            Alle gidsen
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ---------- 6. Hoe wij werken ---------- */

function HoeWijWerken() {
  return (
    <section aria-labelledby="werken-kop" className={`${wrap} ${sectionGap}`}>
      <div className="grid gap-12 md:grid-cols-12 lg:gap-16">
        <div className="md:order-2 md:col-span-6">
          <div className="relative aspect-[1280/816] w-full">
            <Image
              src={BEELD.kerstStal.src}
              alt={BEELD.kerstStal.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:order-1 md:col-span-6 md:self-center">
          <h2
            id="werken-kop"
            className={`${s.display} text-[2.3rem] sm:text-5xl lg:text-6xl`}
          >
            Hoe wij werken
          </h2>
          <div className="mt-6 max-w-[34rem] space-y-5">
            <p>
              Wij verkopen zelf niets. Je kiest hier een cadeau, en bestelt en
              betaalt het bij de winkel, nu bij bol. Vragen over je bestelling
              of een retour regel je ook daar.
            </p>
            <p>
              Bestel je via onze link, dan krijgen wij mogelijk een commissie
              van de winkel. Jij betaalt daar niets extra voor.{" "}
              <Link
                href="/hoe-wij-verdienen"
                className={`${s.link} font-semibold`}
              >
                Lees hoe wij verdienen
              </Link>
              .
            </p>
            <p>
              Prijzen en bezorgdatums controleren we regelmatig. Bij bol tonen
              we de bezorgbelofte van bol zelf, anders een voorzichtige
              schatting. Geen nepkortingen en geen verzonnen reviews.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Beeldcredits ---------- */

function Credits() {
  const prenten = [BEELD.kerstEngel, BEELD.kerstBezoek, BEELD.kerstStal];
  return (
    <section
      aria-label="Beeldcredits"
      className={`${wrap} mt-24 pb-12 md:mt-32`}
    >
      <p className="max-w-[60rem] text-sm leading-relaxed">
        Beeld:{" "}
        {prenten.map((p, i) => (
          <span key={p.src}>
            <a href={p.source} className={s.link} rel="noopener">
              {p.credit}
            </a>
            {i < prenten.length - 1 ? "; " : "."}
          </span>
        ))}
      </p>
    </section>
  );
}

/* ---------- Pagina ---------- */

async function MetData() {
  await connection(); // aftelling en bezorgdatums hangen af van vandaag
  const data = await getLandingData();
  return (
    <>
      <Hero data={data} />
      <Deadlines data={data} />
      <VoorWie data={data} />
      <Uitgelicht data={data} />
      <Gidsen data={data} />
      <HoeWijWerken />
    </>
  );
}

export default function OntwerpB() {
  return (
    <div
      className={`${display.variable} ${sans.variable} ${s.page}`}
      style={vars}
    >
      <Kopbalk />
      <main>
        <Suspense fallback={<Hero />}>
          <MetData />
        </Suspense>
      </main>
      <Credits />
    </div>
  );
}
