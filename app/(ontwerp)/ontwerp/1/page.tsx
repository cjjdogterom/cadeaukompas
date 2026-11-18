import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { getLandingData, type LandingData } from "@/lib/landing";
import { formatDate } from "@/lib/deadlines";
import { formatPrice } from "@/lib/format";
import { LogoMark } from "@/components/Logo";
import { ProductArt } from "@/components/ProductArt";
import "./warenhuis-1.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-w1-display",
  display: "swap",
});
const text = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-w1-text", display: "swap" });

export const metadata: Metadata = {
  title: "Ontwerp 1: Helder warenhuis",
  description: "Homepage-variant 1: cadeaus voor Sinterklaas en kerst die op tijd in huis zijn.",
};

type Item = LandingData["featured"][number];

const NAV = [
  { href: "/cadeaus", label: "Alle cadeaus" },
  { href: "/cadeauzoeker", label: "Cadeauzoeker" },
  { href: "/gids", label: "Gidsen" },
  { href: "/sinterklaasgedicht", label: "Gedichten" },
];

const dagen = (n: number) => `${n} ${n === 1 ? "dag" : "dagen"}`;
const cadeaus = (n: number) => `${n} ${n === 1 ? "cadeau" : "cadeaus"}`;

/** Eenvoudige, zelfgetekende vlakke iconen voor de ontvangertegels. */
const RECIPIENT_ICONS: Record<string, ReactNode> = {
  partner: <path d="M24 40C10 30 6 22 6 16a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 6-4 14-18 24Z" />,
  moeder: (
    <>
      <path d="M14 9l5 5 5-7 5 7 5-5v10a10 10 0 0 1-20 0Z" />
      <rect x="22.6" y="28" width="2.8" height="14" rx="1.4" />
      <path d="M25 41c6 0 10-4 10-9-6 0-10 4-10 9Z" />
    </>
  ),
  vader: <path d="M20 6h8l2 6-3 4 4 18-7 8-7-8 4-18-3-4Z" />,
  collega: (
    <>
      <rect x="9" y="14" width="23" height="24" rx="3.5" />
      <path d="M32 19h3.5a5.5 5.5 0 0 1 0 11H32" fill="none" stroke="currentColor" strokeWidth="3.5" />
    </>
  ),
  tiener: (
    <>
      <path d="M10 29v-5a14 14 0 0 1 28 0v5" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <rect x="6" y="26" width="9" height="15" rx="3.5" />
      <rect x="33" y="26" width="9" height="15" rx="3.5" />
    </>
  ),
  kind: (
    <>
      <circle cx="13" cy="13" r="6.5" />
      <circle cx="35" cy="13" r="6.5" />
      <circle cx="24" cy="26" r="15.5" />
      <circle cx="18.5" cy="23" r="2" fill="var(--tile)" />
      <circle cx="29.5" cy="23" r="2" fill="var(--tile)" />
      <ellipse cx="24" cy="31" rx="5.5" ry="4" fill="var(--tile)" />
    </>
  ),
  vriend: (
    <>
      <ellipse cx="17" cy="17" rx="9.5" ry="11.5" />
      <ellipse cx="33" cy="21" rx="8" ry="10" opacity=".55" />
      <path d="M17 28.5c0 5 3 6 3 13M33 31c0 4-3 5-3 10.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  "opa-oma": (
    <path
      d="M23 27a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm0 0h2m0 0a8 8 0 1 0 16 0 8 8 0 0 0-16 0ZM7.5 24 5 15M40.5 24 43 15"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  ),
  thuiswerker: (
    <>
      <rect x="10.5" y="11.5" width="27" height="19" rx="2.5" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <rect x="4" y="34" width="40" height="4.5" rx="2.25" />
    </>
  ),
};

const TILE_TONES = ["#fbe1e5", "#f3ecdf", "#fae8c2"];

function Bow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 96" className={className} aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M56 44 36 92l15-9 8 11 7-48Z" />
      <path d="M64 44l20 48-15-9-8 11-7-48Z" />
      <path d="M60 42C40 10 6 8 9 35c2 24 31 19 51 7Z" />
      <path d="M60 42c20-32 54-34 51-7-2 24-31 19-51 7Z" />
      <rect x="50" y="31" width="20" height="21" rx="6" />
    </svg>
  );
}

function ProductCard({ item, tomorrow, sizes, priority = false }: { item: Item; tomorrow: string; sizes: string; priority?: boolean }) {
  const isTomorrow = item.delivery.latest === tomorrow;
  return (
    <article className="w1-card">
      <div className="w1-card-art">
        <ProductArt product={item.product} sizes={sizes} priority={priority} />
      </div>
      <div className="w1-card-body">
        <p className="w1-card-brand">{item.brand ?? " "}</p>
        <h3 className="w1-card-title">
          <Link href={item.href} className="w1-card-link">
            {item.title}
          </Link>
        </h3>
        <p className="w1-card-price">
          <strong>{formatPrice(item.priceCents)}</strong> <span>bij {item.merchant}</span>
        </p>
        <p className="w1-card-delivery">
          <strong>{isTomorrow ? "Morgen in huis" : `Uiterlijk ${formatDate(item.delivery.latest, true)} in huis`}</strong>{" "}
          <span>{item.delivery.source === "bol" ? "volgens bol" : "verwacht"}</span>
        </p>
        <span className="w1-btn w1-card-cta" aria-hidden="true">
          Bekijk cadeau
        </span>
      </div>
    </article>
  );
}

function OrderBy({ iso, today }: { iso: string; today: string }) {
  if (iso < today) return <>niet meer op tijd</>;
  if (iso === today) return <>bestel vandaag nog</>;
  return <>bestel uiterlijk {formatDate(iso)}</>;
}

async function Landing() {
  await connection(); // aftelling en bezorgdatums hangen af van vandaag
  const data = await getLandingData();
  const { sint, kerst, today, tomorrowDelivery } = data;
  const sintOpen = sint.daysLeft >= 0;
  const next = sintOpen
    ? { name: "pakjesavond", ...sint }
    : { name: "kerst", ...kerst };
  const defaultDate = today < sint.arriveBy ? sint.arriveBy : kerst.arriveBy;
  const hero = data.featured.slice(0, 4);

  return (
    <>
      <Link href={`/cadeaus?uiterlijk=${next.arriveBy}`} className="w1-promo">
        <span>
          <strong>
            {next.daysLeft > 0 ? `Nog ${dagen(next.daysLeft)} tot ${next.name}.` : `Vandaag is het ${next.name}.`}
          </strong>{" "}
          {next.fastestOrderBy >= today && <>De snelste cadeaus bestel je uiterlijk {formatDate(next.fastestOrderBy)}.</>}
        </span>
      </Link>

      <header className="w1-head">
        <div className="w1-wrap w1-head-in">
          <Link href="/" className="w1-logo" aria-label="OpTijdCadeau, naar de homepage">
            <LogoMark className="w1-logo-mark" />
            <span>
              OpTijd<b>Cadeau</b>
            </span>
          </Link>
          <nav className="w1-nav" aria-label="Hoofdmenu">
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <form action="/cadeaus" method="get" role="search" className="w1-search">
            <label htmlFor="w1-q" className="sr-only">
              Zoek een cadeau
            </label>
            <input id="w1-q" type="search" name="q" placeholder="Zoek een cadeau, merk of hobby" autoComplete="off" maxLength={60} />
            <button type="submit" aria-label="Zoeken">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m15.5 15.5 5 5" />
              </svg>
            </button>
          </form>
        </div>
      </header>

      <main id="inhoud">
        {/* Ontvangers */}
        <section className="w1-wrap w1-cats" aria-labelledby="w1-cats-h">
          <h2 id="w1-cats-h" className="w1-cats-h">
            Voor wie zoek je een cadeau?
          </h2>
          <ul className="w1-tiles">
            {data.recipients.map((r, i) => (
              <li key={r.key}>
                <Link href={r.href} className="w1-tile">
                  <span className="w1-tile-disc" style={{ "--tile": TILE_TONES[i % TILE_TONES.length] } as React.CSSProperties}>
                    {RECIPIENT_ICONS[r.key] ? (
                      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" fill="currentColor">
                        {RECIPIENT_ICONS[r.key]}
                      </svg>
                    ) : (
                      <span aria-hidden="true">{r.label.charAt(0)}</span>
                    )}
                  </span>
                  <span className="w1-tile-label">{r.label}</span>
                  <span className="w1-tile-count">{cadeaus(r.count)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Hero */}
        <section className="w1-wrap w1-hero" aria-labelledby="w1-h1">
          <div className="w1-hero-panel">
            <h1 id="w1-h1">Cadeaus die op tijd in huis zijn</h1>
            <p className="w1-hero-lead">
              Bij elk cadeau zie je wanneer het bezorgd wordt. Kies je datum en je ziet alleen wat op tijd komt.
            </p>
            <form action="/cadeaus" method="get" className="w1-date">
              <label htmlFor="w1-uiterlijk">Wanneer moet het in huis zijn?</label>
              <div className="w1-date-row">
                <input id="w1-uiterlijk" type="date" name="uiterlijk" defaultValue={defaultDate} min={today} required />
                <button type="submit" className="w1-btn">
                  Toon cadeaus
                </button>
              </div>
            </form>
            <p className="w1-quick">
              <span>Of kies direct:</span>
              <Link href="/cadeaus?uiterlijk=2026-12-04" className="w1-btn w1-btn-line">
                Pakjesavond 4 dec
              </Link>
              <Link href="/cadeaus?uiterlijk=2026-12-24" className="w1-btn w1-btn-line">
                Kerst 24 dec
              </Link>
            </p>
            <ul className="w1-tags" aria-label="Aftelling">
              {sintOpen && (
                <li className="w1-tag">
                  <b>{sint.daysLeft}</b>
                  <span>
                    {sint.daysLeft === 1 ? "dag" : "dagen"} tot
                    <br />
                    pakjesavond
                  </span>
                </li>
              )}
              {kerst.daysLeft >= 0 && (
                <li className="w1-tag">
                  <b>{kerst.daysLeft}</b>
                  <span>
                    {kerst.daysLeft === 1 ? "dag" : "dagen"} tot
                    <br />
                    kerst
                  </span>
                </li>
              )}
            </ul>
          </div>
          <div className="w1-hero-shop">
            <div className="w1-row-head">
              <h2>Uitgelichte cadeaus</h2>
              <Link href="/cadeaus" className="w1-more">
                Alle {data.totalProducts} cadeaus
              </Link>
            </div>
            <ul className="w1-hero-grid">
              {hero.map((item) => (
                <li key={item.slug}>
                  <ProductCard item={item} tomorrow={tomorrowDelivery} sizes="(min-width: 1100px) 190px, (min-width: 700px) 24vw, 46vw" priority />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* USP's */}
        <section className="w1-usp" aria-labelledby="w1-usp-h">
          <div className="w1-wrap">
            <h2 id="w1-usp-h" className="sr-only">
              Waarom OpTijdCadeau
            </h2>
            <ul>
              <li>
                <strong>Bezorgdatum bij elk cadeau</strong>
                <span>Je ziet vooraf wanneer het in huis is.</span>
              </li>
              <li>
                <strong>Prijzen gecontroleerd</strong>
                <span>Op de dag die bij het cadeau staat.</span>
              </li>
              <li>
                <strong>Veilig bestellen</strong>
                <span>Bij bekende winkels zoals bol.</span>
              </li>
              <li>
                <strong>Geen nepkortingen</strong>
                <span>Gewoon de prijs die de winkel vraagt.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Productrijen */}
        {data.rows
          .filter((row) => row.items.length > 0)
          .map((row, i) => (
            <section key={row.href} className="w1-wrap w1-row" aria-labelledby={`w1-row-${i}`}>
              <div className="w1-row-head">
                <h2 id={`w1-row-${i}`}>{row.title}</h2>
                <Link href={row.href} className="w1-more" aria-label={`Bekijk alles: ${row.title}`}>
                  Bekijk alles
                </Link>
              </div>
              <ul className="w1-rail">
                {row.items.map((item) => (
                  <li key={item.slug}>
                    <ProductCard item={item} tomorrow={tomorrowDelivery} sizes="(min-width: 700px) 216px, 46vw" />
                  </li>
                ))}
                <li className="w1-rail-end">
                  <Link href={row.href} aria-label={`Bekijk alles: ${row.title}`}>
                    <span>Bekijk alles</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </section>
          ))}

        {/* Besteldeadlines */}
        <section className="w1-wrap w1-section" aria-labelledby="w1-dead-h">
          <h2 id="w1-dead-h" className="w1-h2">
            Tot wanneer kun je bestellen?
          </h2>
          <p className="w1-sub">
            We rekenen met werkdagen en een dag extra voor de drukte. Hoe eerder je bestelt, hoe meer keus.
          </p>
          <div className="w1-seasons">
            {(
              [
                { key: "sinterklaas", title: "Sinterklaas", what: "Pakjesavond is zaterdag 5 december", cta: "Cadeaus voor pakjesavond", o: sint },
                { key: "kerst", title: "Kerst", what: "Eerste kerstdag is vrijdag 25 december", cta: "Cadeaus voor kerst", o: kerst },
              ] as const
            ).map((s) => (
              <div key={s.key} className={`w1-season w1-season-${s.key}`}>
                <Bow className="w1-bow" />
                <h3>{s.title}</h3>
                <p className="w1-season-what">
                  {s.what}. In huis uiterlijk {formatDate(s.o.arriveBy)}.
                </p>
                <dl>
                  {data.deadlines.map((d) => (
                    <div key={d.deliveryDays}>
                      <dt>
                        {d.label}
                        <span>{cadeaus(d.count)}</span>
                      </dt>
                      <dd>
                        <OrderBy iso={d[s.key]} today={today} />
                      </dd>
                    </div>
                  ))}
                </dl>
                <Link href={`/cadeaus?uiterlijk=${s.o.arriveBy}`} className="w1-btn">
                  {s.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Budget en interesse */}
        <section className="w1-wrap w1-section" aria-labelledby="w1-budget-h">
          <h2 id="w1-budget-h" className="w1-h2">
            Shop op budget
          </h2>
          <ul className="w1-budgets">
            {data.budgets.map((b) => (
              <li key={b.key}>
                <Link href={b.href}>
                  <strong>{b.label}</strong>
                  <span>{cadeaus(b.count)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="w1-h2 w1-h2-gap">Shop op interesse</h2>
          <ul className="w1-chips">
            {data.interests.map((it) => (
              <li key={it.key}>
                <Link href={it.href}>
                  {it.label} <span>{it.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Gidsen */}
        <section className="w1-wrap w1-section" aria-labelledby="w1-gids-h">
          <div className="w1-row-head">
            <h2 id="w1-gids-h">Cadeaugidsen</h2>
            <Link href="/gids" className="w1-more">
              Alle gidsen
            </Link>
          </div>
          <ul className="w1-guides">
            {data.guides.slice(0, 4).map((g) => (
              <li key={g.slug}>
                <h3>
                  <Link href={g.href}>{g.title}</Link>
                </h3>
                <p>{g.intro}</p>
                <span aria-hidden="true">Lees de gids</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Hoe het werkt */}
        <section className="w1-how" aria-labelledby="w1-how-h">
          <div className="w1-wrap">
            <h2 id="w1-how-h" className="w1-h2">
              Zo werkt OpTijdCadeau
            </h2>
            <ol>
              <li>
                <h3>Kies je cadeau</h3>
                <p>Blader, zoek of filter op de datum waarop het in huis moet zijn.</p>
              </li>
              <li>
                <h3>Bestel bij de winkel</h3>
                <p>De knop brengt je naar de winkel, nu bol. Daar bestel en betaal je, met hun bezorging en retourregels.</p>
              </li>
              <li>
                <h3>Wij krijgen mogelijk commissie</h3>
                <p>Bestel je via onze link, dan betaalt de winkel ons soms een vergoeding. Jij betaalt hetzelfde.</p>
              </li>
            </ol>
            <p className="w1-how-links">
              <Link href="/hoe-wij-verdienen">Lees hoe wij verdienen</Link>
              <Link href="/contact">Neem contact op</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default function OntwerpEenPage() {
  return (
    <div className={`w1 ${display.variable} ${text.variable}`}>
      <Suspense fallback={<p className="w1-loading">Cadeaus laden…</p>}>
        <Landing />
      </Suspense>
    </div>
  );
}
