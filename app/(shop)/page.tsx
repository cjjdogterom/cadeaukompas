import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { getLandingData, type LandingData } from "@/lib/landing";
import { ARRIVE_BY, formatDate } from "@/lib/deadlines";
import { AGE_GROUPS } from "@/lib/types";
import { arrivalHeadline, isTomorrow } from "@/lib/season";
import { ProductArt } from "@/components/ProductArt";



/* Kleuren: rood = merk/kopbalk, groen = kopen en levering, verder inkt op lichtgrijs met witte kaarten. */
const ROOD = "#b8433f";
const KOP = "font-display";
const KNOP =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-[#2f6f55] px-6 text-base font-bold text-white transition-colors hover:bg-[#255a45]";
const WRAP = "mx-auto w-full max-w-[1280px] px-4 sm:px-6";
const H2 = `${KOP} text-[26px] leading-tight font-bold tracking-[-0.01em] sm:text-[32px]`;


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
    <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-[#2f6f55]" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      <path d="M52 46 34 80h18l10-28zM68 46l18 34H68L58 52z" fill="#9c3531" />
      <rect x="49" y="29" width="22" height="22" rx="5" fill="#faf7f2" />
    </svg>
  );
}

/* ---------- Kop ---------- */

/* ---------- Productkaart ---------- */

function Levering({ item, today }: { item: Item; today: string }) {
  // "Morgen" alleen als het echt de volgende kalenderdag is (vrijdag/zaterdag: de werkdag is maandag).
  const morgen = isTomorrow(item.delivery.latest, today);
  return (
    <p className="mt-2 mb-3 text-[15px] leading-snug">
      <span className="font-bold text-[#2f6f55]">
        {morgen ? "Morgen in huis" : `Uiterlijk ${formatDate(item.delivery.latest, true)} in huis`}
      </span>{" "}
      <span className="whitespace-nowrap text-[#5f574d]">{item.delivery.source === "bol" ? `volgens ${item.merchant}` : "verwacht"}</span>
    </p>
  );
}

function Prijs({ item }: { item: Item }) {
  if (item.price.kind === "bekijk") {
    return <p className="mt-2.5 text-[17px] leading-snug font-bold">Bekijk prijs bij {item.merchant}</p>;
  }
  return (
    <>
      <p className="mt-2.5 flex flex-wrap items-baseline gap-x-2">
        <span className={`${KOP} text-[26px] leading-none font-bold tracking-[-0.01em] sm:text-[30px]`}>{item.price.price}</span>
        <span className="text-[15px] text-[#5f574d]">bij {item.merchant}</span>
      </p>
      <p className="mt-1 text-[13px] leading-snug text-[#5f574d]">indicatief, gecontroleerd {item.price.checked}</p>
    </>
  );
}

function Kaart({ item, today, sizes, className = "" }: { item: Item; today: string; sizes: string; className?: string }) {
  return (
    <li
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[#ebe4d8] bg-white transition-colors focus-within:border-[#2b2622] hover:border-[#2b2622] ${className}`}
    >
      {/* Vast vierkant: een productfoto (object-contain) past hier later zonder aanpassing in. */}
      <div className="relative aspect-square border-b border-[#f3eee5] bg-white">
        <ProductArt product={item.product} sizes={sizes} />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="truncate text-[15px] text-[#5f574d]">{item.brand ?? " "}</p>
        <h3 className="mt-0.5 text-base leading-snug font-semibold">
          <Link href={item.href} className="line-clamp-2 min-h-[2.75em] after:absolute after:inset-0 focus-visible:outline-none">
            {item.title}
          </Link>
        </h3>
        <Prijs item={item} />
        <Levering item={item} today={today} />
        <span aria-hidden="true" className={`${KNOP} mt-auto !min-h-11 w-full !px-3 text-[15px] group-hover:bg-[#255a45] sm:text-base`}>
          Bekijk cadeau
        </span>
      </div>
    </li>
  );
}

/* ---------- Secties ---------- */

const WIE_ICOON: Record<string, { kleur: string; pad: React.ReactNode }> = {
  partner: { kleur: "#f6dcd7", pad: <path d="M12 20s-7-4.4-7-9.5A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.5C19 15.6 12 20 12 20Z" /> },
  moeder: { kleur: "#f3e2ee", pad: <><circle cx="12" cy="9" r="2.2" /><path d="M12 4.5v2.3M12 11.2v2.3M7.6 9h2.2M14.2 9h2.2M8.9 5.9l1.5 1.5M13.6 10.6l1.5 1.5M15.1 5.9l-1.5 1.5M10.4 10.6l-1.5 1.5M12 13.5V20M12 17c-1.5-1.6-3-1.8-4-1.4M12 18.5c1.5-1.6 3-1.8 4-1.4" /></> },
  vader: { kleur: "#dfe9f2", pad: <path d="M10 4h4l-1 3 2.5 9L12 20l-3.5-4L11 7l-1-3Z" /> },
  collega: { kleur: "#f4ead2", pad: <><path d="M6 8h10v6a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4V8Z" /><path d="M16 10h1.5a2 2 0 0 1 0 4H16M8 4.5v1.5M11 4v2M14 4.5v1.5" /></> },
  tiener: { kleur: "#e3e0f3", pad: <><path d="M5 14v-2a7 7 0 0 1 14 0v2" /><rect x="4" y="13" width="4" height="6" rx="1.5" /><rect x="16" y="13" width="4" height="6" rx="1.5" /></> },
  kind: { kleur: "#fbe6c8", pad: <><circle cx="12" cy="13" r="5.5" /><circle cx="7.5" cy="7.5" r="2" /><circle cx="16.5" cy="7.5" r="2" /><path d="M10 12.5h.01M14 12.5h.01M10.5 15.5c1 .8 2 .8 3 0" /></> },
  vriend: { kleur: "#dcefe6", pad: <><circle cx="9" cy="9" r="3" /><circle cx="16.5" cy="10" r="2.4" /><path d="M3.5 19c.5-3 2.700-4.5 5.5-4.5s5 1.5 5.5 4.5M15 15c2.5-.3 4.800 1 5.5 3.800" /></> },
  "opa-oma": { kleur: "#eee6da", pad: <><circle cx="8" cy="13" r="3" /><circle cx="16" cy="13" r="3" /><path d="M11 13h2M5 13 3.5 9M19 13l1.5-4" /></> },
  thuiswerker: { kleur: "#dceaf0", pad: <><rect x="5" y="6" width="14" height="9" rx="1.5" /><path d="M3 18.5h18M10 18.5l.5-3.5M14 18.5l-.5-3.5" /></> },
};

/** Grote, duidelijke keuze: voor wie zoek je een cadeau? */
function VoorWie({ data }: { data: LandingData }) {
  return (
    <section aria-labelledby="s3-voorwie" className={`${WRAP} pt-10 sm:pt-14`}>
      <h2 id="s3-voorwie" className={H2}>
        Voor wie zoek je een cadeau?
      </h2>
      <p className="mt-2 text-[17px] text-[#443d35]">Kies een persoon en je ziet alleen cadeaus die daarbij passen.</p>
      <ul className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
        {data.recipients.map((r) => {
          const icoon = WIE_ICOON[r.key];
          return (
            <li key={r.key}>
              <Link
                href={r.href}
                className="group flex h-full flex-col items-center gap-2 rounded-2xl border border-[#ebe4d8] bg-white px-2 py-4 text-center transition-colors hover:border-[#2f6f55] hover:bg-[#eef4ef]"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full" style={{ background: icoon?.kleur ?? "#f3eee5" }}>
                  <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="#2b2622" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {icoon?.pad}
                  </svg>
                </span>
                <span className="text-base leading-tight font-bold">{r.label}</span>
                <span className="text-[15px] text-[#5f574d]">{r.count} cadeaus</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Hero({ data }: { data: LandingData }) {
  const open = data.openOccasions;
  const keuzes = [
    { titel: arrivalHeadline(data.tomorrowDelivery, data.today), sub: formatDate(data.tomorrowDelivery), datum: data.tomorrowDelivery },
    ...(open.includes("sinterklaas")
      ? [{ titel: "Vóór pakjesavond", sub: `In huis uiterlijk ${formatDate(ARRIVE_BY.sinterklaas, true)}`, datum: ARRIVE_BY.sinterklaas }]
      : []),
    ...(open.includes("kerst") ? [{ titel: "Vóór kerst", sub: `In huis uiterlijk ${formatDate(ARRIVE_BY.kerst, true)}`, datum: ARRIVE_BY.kerst }] : []),
  ];
  return (
    <section aria-labelledby="s3-h1" className={`${WRAP} pt-6 sm:pt-9`}>
      <div className={`grid gap-5 lg:gap-6 ${data.season ? "lg:grid-cols-[minmax(0,1fr)_340px]" : ""}`}>
        <div>
          <h1 id="s3-h1" className={`${KOP} text-[34px] leading-[1.02] font-bold tracking-[-0.02em] sm:text-[44px] xl:text-[48px]`}>
            Wanneer moet je cadeau in huis zijn?
          </h1>
          <p className="mt-3 max-w-[58ch] text-[17px] leading-relaxed text-[#443d35] sm:text-lg">
            Kies een dag en je ziet alleen cadeaus die er dan zijn. Bij elk van de {data.totalProducts} cadeaus staat de
            bezorgdatum erbij.
          </p>
          <ul className={`mt-5 grid gap-2.5 sm:gap-3 ${keuzes.length === 3 ? "sm:grid-cols-3" : keuzes.length === 2 ? "sm:grid-cols-2" : ""}`}>
            {keuzes.map((k) => (
              <li key={k.titel}>
                <Link
                  href={`/cadeaus?uiterlijk=${k.datum}`}
                  className="group flex h-full min-h-[76px] items-center justify-between gap-3 rounded-2xl border border-[#8f8577] bg-white px-4 py-3 transition-colors hover:border-[#2f6f55] hover:bg-[#eef4ef] sm:min-h-[104px] sm:flex-col sm:items-start sm:justify-between sm:p-5"
                >
                  <span>
                    <span className={`${KOP} block text-[22px] leading-tight font-bold tracking-[-0.01em] sm:text-[25px]`}>{k.titel}</span>
                    <span className="mt-0.5 block text-[15px] font-bold text-[#2f6f55]">{k.sub}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-[15px] font-bold text-[#2f6f55]">
                    <span className="max-sm:sr-only">Toon cadeaus</span>
                    <Pijl />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <form action="/cadeaus" method="get" className="mt-3 rounded-2xl border border-[#ebe4d8] bg-white p-4 sm:p-5">
            <p className={`${KOP} text-[20px] leading-tight font-bold sm:text-[22px]`}>Of zoek precies wat past</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
              <label className="flex flex-col gap-1 text-[15px] font-bold">
                Voor wie
                <select name="voor" defaultValue="" className="h-12 rounded-2xl border border-[#8f8577] bg-white px-3 text-base font-semibold">
                  <option value="">Maakt niet uit</option>
                  {data.recipients.map((r) => (
                    <option key={r.key} value={r.key}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-[15px] font-bold">
                Leeftijd
                <select name="leeftijd" defaultValue="" className="h-12 rounded-2xl border border-[#8f8577] bg-white px-3 text-base font-semibold">
                  <option value="">Alle leeftijden</option>
                  {Object.entries(AGE_GROUPS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-[15px] font-bold">
                Uiterlijk in huis op
                <input
                  type="date"
                  name="uiterlijk"
                  defaultValue={data.season?.arriveBy}
                  min={data.today}
                  className="h-12 min-w-0 rounded-2xl border border-[#8f8577] bg-white px-3 text-base font-semibold"
                />
              </label>
              <button type="submit" className={`${KNOP} sm:col-span-2 lg:col-span-1`}>
                Toon cadeaus
              </button>
            </div>
          </form>
        </div>

        {data.season && <Aftelling data={data} season={data.season} />}
      </div>
    </section>
  );
}

/** Aftelling naar het lopende seizoen. Na de laatste Sint-besteldag kerst; na de kerstdeadline niet getoond. */
function Aftelling({ data, season }: { data: LandingData; season: NonNullable<LandingData["season"]> }) {
  const feest = season.occasion === "sinterklaas" ? "pakjesavond" : "kerst";
  const kerstNaSint = season.occasion === "sinterklaas" && data.openOccasions.includes("kerst");
  return (
    <aside aria-label="Aftelling" className="relative flex flex-col overflow-hidden rounded-2xl bg-[#24493c] p-5 text-white sm:p-6">
      <Strik className="absolute -top-3 -right-5 w-28 rotate-12" />
      <p className="flex items-end gap-3">
        <span className={`${KOP} text-[84px] leading-[0.8] font-bold tracking-[-0.03em] sm:text-[104px]`}>{season.daysLeft}</span>
        <span className={`${KOP} pb-1 text-[22px] leading-[1.05] font-bold`}>
          {season.daysLeft === 1 ? "dag" : "dagen"} tot
          <br />
          {feest}
        </span>
      </p>
      <p className="mt-5 text-base leading-snug text-[#e6efe9]">
        Snelste cadeaus: bestel uiterlijk <strong className="font-bold text-white">{formatDate(season.fastestOrderBy)}</strong>.
      </p>
      {kerstNaSint && (
        <p className="mt-4 border-t border-[#3d6656] pt-4 text-base leading-snug text-[#e6efe9]">
          <strong className={`${KOP} mr-1 text-[22px] font-bold text-white`}>{data.kerst.daysLeft}</strong>
          dagen tot kerst. Bestel uiterlijk <strong className="font-bold text-white">{formatDate(data.kerst.fastestOrderBy)}</strong>.
        </p>
      )}
      <a href="#s3-deadlines" className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start pt-3 text-base font-bold underline underline-offset-4 focus-visible:!outline-white">
        Alle besteldeadlines <Pijl className="h-4 w-4" />
      </a>
    </aside>
  );
}

function Uitgelicht({ data }: { data: LandingData }) {
  return (
    <section aria-labelledby="s3-uitgelicht" className={`${WRAP} pt-9 sm:pt-12`}>
      <SectieKop id="s3-uitgelicht" titel="Uitgelicht" href="/cadeaus" link="Alle cadeaus" />
      <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
        {data.featured.slice(0, 8).map((item) => (
          <Kaart key={item.slug} item={item} today={data.today} sizes="(min-width: 1024px) 300px, 50vw" />
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
        <Link href={href} className="flex min-h-11 shrink-0 items-center gap-1.5 text-base font-bold text-[#2f6f55] underline-offset-4 hover:underline">
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
      <ul className="grid gap-x-6 gap-y-3 rounded-2xl border border-[#ebe4d8] bg-white p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
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
                  today={data.today}
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
  // Alleen feestdagen waarvoor je nog op tijd kunt bestellen; verstreken besteldagen tonen we als "te laat".
  const seizoenen = [
    { key: "sinterklaas" as const, naam: "Sinterklaas", feest: "pakjesavond", s: data.sint, kleur: ROOD, href: `/cadeaus?uiterlijk=${data.sint.arriveBy}` },
    { key: "kerst" as const, naam: "Kerst", feest: "kerst", s: data.kerst, kleur: "#2f6f55", href: `/cadeaus?uiterlijk=${data.kerst.arriveBy}` },
  ].filter((z) => data.openOccasions.includes(z.key));
  return (
    <section id="s3-deadlines" aria-labelledby="s3-deadlines-kop" className={`${WRAP} scroll-mt-36 pt-12 sm:pt-16`}>
      <h2 id="s3-deadlines-kop" className={H2}>
        Tot wanneer kun je bestellen?
      </h2>
      <p className="mt-2 max-w-[62ch] text-[17px] leading-relaxed text-[#443d35]">
        We rekenen met werkdagen en een dag extra voor de drukte. Zo ligt je cadeau er de dag vóór pakjesavond en op
        kerstavond.
      </p>
      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {seizoenen.map((z) => (
            <li key={z.naam} className="flex flex-col rounded-2xl border border-[#ebe4d8] bg-white p-5" style={{ borderLeft: `8px solid ${z.kleur}` }}>
              <h3 className={`${KOP} text-2xl font-bold`}>{z.naam}</h3>
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
        <div className="overflow-hidden rounded-2xl border border-[#ebe4d8] bg-white">
          <table className="w-full border-collapse text-left text-base">
            <caption className="sr-only">Uiterste besteldag per levertijd, voor {seizoenen.map((z) => z.feest).join(" en ")}</caption>
            <thead>
              <tr className="bg-[#24493c] text-white">
                <th scope="col" className="px-3 py-3 text-[15px] font-bold sm:px-5">
                  Levertijd
                </th>
                {seizoenen.map((z) => (
                  <th key={z.key} scope="col" className="px-3 py-3 text-[15px] font-bold sm:px-5">
                    <span className="sm:hidden">{z.naam === "Kerst" ? "Kerst" : "Pakjesavond"}</span>
                    <span className="max-sm:hidden">Bestel voor {z.feest} uiterlijk</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.deadlines.map((d) => (
                <tr key={d.deliveryDays} className="border-t border-[#efe9df] align-top">
                  <th scope="row" className="px-3 py-4 font-semibold sm:px-5">
                    {d.deliveryDays === 1 ? "1 werkdag" : `${d.deliveryDays} werkdagen`}
                    <span className="block text-[15px] font-normal text-[#5f574d]">
                      {d.count} {d.count === 1 ? "cadeau" : "cadeaus"}
                    </span>
                  </th>
                  {seizoenen.map((z) => {
                    const iso = d[z.key];
                    return iso < data.today ? (
                      <td key={z.key} className="px-3 py-4 text-base text-[#5f574d] sm:px-5">
                        Te laat
                      </td>
                    ) : (
                      <td key={z.key} className={`${KOP} px-3 py-4 text-lg leading-tight font-bold sm:px-5 sm:text-[22px]`}>
                        <span className="sm:hidden">{formatDate(iso, true)}</span>
                        <span className="max-sm:hidden">{formatDate(iso)}</span>
                      </td>
                    );
                  })}
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
    <div className="rounded-2xl border border-[#ebe4d8] bg-white p-4 sm:p-5">
      <h3 className={`${KOP} text-[22px] font-bold`}>{titel}</h3>
      <ul className={`mt-2 grid gap-x-6 ${kolommen}`}>
        {items.map((it) => (
          <li key={it.key} className="border-b border-[#f3eee5]">
            <Link href={it.href} className="group flex min-h-12 items-center justify-between gap-3 text-base font-semibold">
              <span className="underline-offset-4 group-hover:underline">{it.label}</span>
              <span className="text-[15px] font-medium text-[#5f574d] tabular-nums">{it.count}</span>
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
          <li key={g.slug} className="relative flex flex-col rounded-2xl border border-[#ebe4d8] bg-white p-5 transition-colors hover:border-[#2b2622]">
            <h3 className={`${KOP} text-xl leading-tight font-bold`}>
              <Link href={g.href} className="after:absolute after:inset-0">
                {g.title}
              </Link>
            </h3>
            <p className="mt-2 line-clamp-3 text-base leading-relaxed text-[#443d35]">{g.intro}</p>
            <span aria-hidden="true" className="mt-auto flex items-center gap-1.5 pt-4 text-base font-bold text-[#2f6f55]">
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
      <div className="rounded-2xl border border-[#ebe4d8] bg-white p-5 sm:p-8">
        <h2 id="s3-hoe" className={H2}>
          Hoe het werkt
        </h2>
        <ol className="mt-5 grid gap-5 md:grid-cols-3 md:gap-8">
          {stappen.map((s, i) => (
            <li key={s.kop} className="flex gap-3.5">
              <span className={`${KOP} grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-[#b8433f] text-lg font-bold text-white`}>{i + 1}</span>
              <div>
                <h3 className="text-lg leading-snug font-bold">{s.kop}</h3>
                <p className="mt-1 text-base leading-relaxed text-[#443d35]">{s.tekst}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 border-t border-[#f3eee5] pt-4 text-base font-bold">
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
      <Hero data={data} />
      <VoorWie data={data} />
      <Uitgelicht data={data} />
      <Usps />
      <Rijen data={data} />
      {data.openOccasions.length > 0 && <Deadlines data={data} />}
      <ShopOp data={data} />
      <Gidsen data={data} />
      <HoeHetWerkt />
    </>
  );
}

export default function Home() {
  return (
    <div className="bg-[#faf7f2] text-[#2b2622] [&_:focus-visible]:outline-[#2b2622]">
      <Suspense fallback={<p className={`${WRAP} min-h-[80vh] py-10 text-base text-[#5f574d]`}>Cadeaus laden…</p>}>
        <Inhoud />
      </Suspense>
    </div>
  );
}
