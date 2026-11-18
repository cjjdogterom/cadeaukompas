import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { Manrope, Playfair_Display } from "next/font/google";
import { getLandingData, type LandingData } from "@/lib/landing";
import { formatDate } from "@/lib/deadlines";
import { formatPrice } from "@/lib/format";
import { LogoMark } from "@/components/Logo";
import { ProductArt } from "@/components/ProductArt";
import "./feestwinkel.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], variable: "--fw-serif", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--fw-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Ontwerp 2 — Feestwinkel",
  description: "Cadeaus voor Sinterklaas en kerst, met bij elk cadeau de dag waarop het in huis is.",
};

type Item = LandingData["rows"][number]["items"][number];

const NAV = [
  { href: "/cadeaus", label: "Alle cadeaus" },
  { href: "/cadeauzoeker", label: "Cadeauzoeker" },
  { href: "/gids", label: "Gidsen" },
  { href: "/sinterklaasgedicht", label: "Gedichten" },
];

const dagen = (n: number) => (n === 1 ? "1 dag" : `${n} dagen`);

/* ---------- Vlakke, zelfgetekende accenten ---------- */

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M12 0c.9 6.6 4.5 10.9 12 12-7.5 1.1-11.1 5.4-12 12-.9-6.6-4.5-10.9-12-12 7.5-1.1 11.1-5.4 12-12z" fill="currentColor" />
    </svg>
  );
}

function Bow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 44" className={className} aria-hidden="true" focusable="false">
      <path d="M48 24C36 4 10-2 6 10c-3 10 14 16 42 14z" fill="currentColor" />
      <path d="M48 24C60 4 86-2 90 10c3 10-14 16-42 14z" fill="currentColor" />
      <path d="M44 26l-12 18h10l8-14zM52 26l12 18H54l-8-14z" fill="currentColor" />
      <rect x="41" y="16" width="14" height="14" rx="3" fill="#a8720f" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="fw-check" aria-hidden="true" focusable="false">
      <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Productkaart ---------- */

function ProductCard({ item, tomorrow, sizes, priority = false }: { item: Item; tomorrow: string; sizes: string; priority?: boolean }) {
  const morgen = item.delivery.latest === tomorrow;
  return (
    <li className="fw-card">
      <Link href={item.href} className="fw-card-link">
        <span className="fw-card-art">
          <ProductArt product={item.product} sizes={sizes} priority={priority} />
        </span>
        <span className="fw-card-body">
          <span className="fw-card-brand">{item.brand ?? " "}</span>
          <span className="fw-card-title line-clamp-2">{item.title}</span>
          <span className="fw-card-price">
            {formatPrice(item.priceCents)} <span className="fw-card-shop">bij {item.merchant}</span>
          </span>
          <span className="fw-card-delivery">
            <strong>{morgen ? "Morgen in huis" : `Uiterlijk ${formatDate(item.delivery.latest, true)} in huis`}</strong>
            <span className="fw-card-source">{item.delivery.source === "bol" ? "volgens bol" : "verwacht"}</span>
          </span>
          <span className="fw-btn fw-btn-buy">Bekijk cadeau</span>
        </span>
      </Link>
    </li>
  );
}

/* ---------- Kop ---------- */

function SearchForm() {
  return (
    <form action="/cadeaus" method="get" role="search" className="fw-search">
      <label htmlFor="fw-q" className="sr-only">
        Zoek een cadeau
      </label>
      <input id="fw-q" name="q" type="search" placeholder="Zoek een cadeau, merk of hobby" autoComplete="off" maxLength={60} />
      <button type="submit" aria-label="Zoeken">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}

function Header() {
  return (
    <header className="fw-header">
      <div className="fw-wrap fw-header-inner">
        <Link href="/" className="fw-logo" aria-label="OpTijdCadeau, naar de homepage">
          <LogoMark className="h-9 w-9" />
          <span>OpTijdCadeau</span>
        </Link>
        <nav aria-label="Hoofdmenu" className="fw-nav">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <SearchForm />
      </div>
    </header>
  );
}

function PromoFallback() {
  return (
    <p className="fw-promo">
      <span className="fw-wrap">Bij elk cadeau zie je wanneer het in huis is.</span>
    </p>
  );
}

/* ---------- Inhoud (hangt af van vandaag) ---------- */

async function Content() {
  await connection(); // aftelling en bezorgdatums hangen af van het moment van nu
  const data = await getLandingData();
  const { sint, kerst, tomorrowDelivery: tomorrow, today } = data;
  const sintOpen = sint.daysLeft > 0 && today <= sint.fastestOrderBy;
  const kerstOpen = kerst.daysLeft > 0 && today <= kerst.fastestOrderBy;
  const promo = sintOpen
    ? { feest: "pakjesavond", days: sint.daysLeft, by: sint.fastestOrderBy }
    : kerstOpen
      ? { feest: "kerst", days: kerst.daysLeft, by: kerst.fastestOrderBy }
      : null;
  const stack = data.featured.slice(0, 4);
  const rows = data.rows.filter((r) => r.items.length >= 2);
  const orderBy = (iso: string) => (iso < today ? <span className="fw-late">Niet meer op tijd</span> : formatDate(iso));

  return (
    <>
      {promo ? (
        <p className="fw-promo">
          <span className="fw-wrap">
            <strong>Nog {dagen(promo.days)} tot {promo.feest}.</strong> De snelste cadeaus bestel je uiterlijk {formatDate(promo.by)}.
          </span>
        </p>
      ) : (
        <PromoFallback />
      )}
      <Header />

      <main id="inhoud" className="fw-main">
        {/* 2. Categorie-ingangen */}
        <section aria-labelledby="fw-voor-wie" className="fw-cats">
          <div className="fw-wrap fw-cats-inner">
            <h2 id="fw-voor-wie" className="fw-cats-title">
              Voor wie zoek je?
            </h2>
            <ul className="fw-cats-list">
              {data.recipients.map((r) => (
                <li key={r.key}>
                  <Link href={r.href} className="fw-cat">
                    <span className="fw-cat-label">{r.label}</span>
                    <span className="fw-cat-count">{r.count} cadeaus</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Hero */}
        <section aria-labelledby="fw-h1" className="fw-hero">
          <div className="fw-wrap fw-hero-inner">
            <div className="fw-hero-copy">
              <Star className="fw-star fw-star-a" />
              <h1 id="fw-h1">Een cadeau dat er op tijd is</h1>
              <p className="fw-hero-lead">
                {data.totalProducts} cadeaus voor Sinterklaas en kerst, elk met de dag waarop het in huis is.
              </p>
              <form action="/cadeaus" method="get" className="fw-date">
                <label htmlFor="fw-uiterlijk">Wanneer moet het in huis zijn?</label>
                <div className="fw-date-row">
                  <input id="fw-uiterlijk" name="uiterlijk" type="date" defaultValue="2026-12-04" min={today} required />
                  <button type="submit" className="fw-btn fw-btn-buy">
                    Toon cadeaus
                  </button>
                </div>
              </form>
              <ul className="fw-quick" aria-label="Snel kiezen">
                <li>
                  <Link href="/cadeaus?uiterlijk=2026-12-04" className="fw-btn fw-btn-ghost">
                    Pakjesavond, 4 dec
                  </Link>
                </li>
                <li>
                  <Link href="/cadeaus?uiterlijk=2026-12-24" className="fw-btn fw-btn-ghost">
                    Kerst, 24 dec
                  </Link>
                </li>
              </ul>
              <p className="fw-count">
                {sint.daysLeft > 0 && <>Nog <strong>{dagen(sint.daysLeft)}</strong> tot pakjesavond</>}
                {sint.daysLeft > 0 && kerst.daysLeft > 0 && <span aria-hidden="true"> · </span>}
                {kerst.daysLeft > 0 && <>{sint.daysLeft > 0 ? "nog" : "Nog"} <strong>{dagen(kerst.daysLeft)}</strong> tot kerst</>}
              </p>
            </div>
            <div className="fw-stack">
              <h2 className="fw-stack-title">Vandaag bestellen, op tijd in huis</h2>
              <Bow className="fw-bow" />
              <ul className="fw-stack-list">
                {stack.map((item) => (
                  <ProductCard key={item.slug} item={item} tomorrow={tomorrow} sizes="(min-width: 1024px) 220px, 45vw" priority />
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. USP-balk */}
        <section aria-labelledby="fw-usp" className="fw-usp">
          <div className="fw-wrap">
            <h2 id="fw-usp" className="sr-only">
              Waarom OpTijdCadeau
            </h2>
            <ul>
              <li><Check />Bezorgdatum bij elk cadeau</li>
              <li><Check />Prijs gecontroleerd op de dag die erbij staat</li>
              <li><Check />Veilig bestellen bij bekende winkels als bol</li>
              <li><Check />Geen nepkortingen</li>
            </ul>
          </div>
        </section>

        {/* 5. Productrijen, met de seizoensblokken ertussen */}
        {rows.map((row, i) => (
          <div key={row.href} className="fw-rowgroup">
            <section aria-labelledby={`fw-row-${i}`} className="fw-section fw-wrap">
              <div className="fw-section-head">
                <h2 id={`fw-row-${i}`}>{row.title}</h2>
                <Link href={row.href} className="fw-more">
                  Bekijk alles<span className="sr-only">: {row.title}</span>
                </Link>
              </div>
              <ul className={`fw-grid${i === 0 ? " fw-grid-wide" : ""}`}>
                {row.items.map((item) => (
                  <ProductCard key={item.slug} item={item} tomorrow={tomorrow} sizes="(min-width: 1024px) 290px, 46vw" />
                ))}
              </ul>
            </section>

            {i === 0 && (
              <section aria-labelledby="fw-seizoen" className="fw-section fw-wrap">
                <h2 id="fw-seizoen" className="sr-only">
                  Sinterklaas en kerst
                </h2>
                <div className="fw-seasons">
                  <div className="fw-season fw-season-sint">
                    <Star className="fw-star fw-star-b" />
                    <h3>Sinterklaas</h3>
                    <p className="fw-season-sub">In huis vóór 5 december</p>
                    <p className="fw-season-deadline">
                      {sintOpen ? (
                        <>Bestel uiterlijk <strong>{formatDate(sint.fastestOrderBy)}</strong>. Nog {dagen(sint.daysLeft)} tot pakjesavond.</>
                      ) : (
                        <>Bestellen voor pakjesavond kan niet meer op tijd.</>
                      )}
                    </p>
                    <Link href={`/cadeaus?uiterlijk=${sint.arriveBy}`} className="fw-btn fw-btn-light">
                      Shop Sinterklaascadeaus
                    </Link>
                  </div>
                  <div className="fw-season fw-season-kerst">
                    <Star className="fw-star fw-star-b" />
                    <h3>Kerst</h3>
                    <p className="fw-season-sub">In huis vóór 24 december</p>
                    <p className="fw-season-deadline">
                      {kerstOpen ? (
                        <>Bestel uiterlijk <strong>{formatDate(kerst.fastestOrderBy)}</strong>. Nog {dagen(kerst.daysLeft)} tot kerst.</>
                      ) : (
                        <>Bestellen voor kerst kan niet meer op tijd.</>
                      )}
                    </p>
                    <Link href={`/cadeaus?uiterlijk=${kerst.arriveBy}`} className="fw-btn fw-btn-light">
                      Shop kerstcadeaus
                    </Link>
                  </div>
                </div>
              </section>
            )}
          </div>
        ))}

        {/* 6. Besteldeadlines */}
        <section aria-labelledby="fw-deadlines" className="fw-section fw-wrap">
          <div className="fw-section-head">
            <h2 id="fw-deadlines">Tot wanneer kun je bestellen?</h2>
          </div>
          <div className="fw-table-box">
            <table className="fw-table">
              <thead>
                <tr>
                  <th scope="col">Levertijd</th>
                  <th scope="col">Voor pakjesavond</th>
                  <th scope="col">Voor kerst</th>
                  <th scope="col" className="fw-num">Cadeaus</th>
                </tr>
              </thead>
              <tbody>
                {data.deadlines.map((d) => (
                  <tr key={d.deliveryDays}>
                    <th scope="row">{d.label}</th>
                    <td data-label="Voor pakjesavond">{orderBy(d.sinterklaas)}</td>
                    <td data-label="Voor kerst">{orderBy(d.kerst)}</td>
                    <td data-label="Cadeaus" className="fw-num">{d.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="fw-note">
            De datums zijn de laatste besteldag, met een dag speling voor de drukte. Bij elk cadeau staat de actuele bezorgdatum.
          </p>
        </section>

        {/* 7. Budget en interesse */}
        <section aria-labelledby="fw-budget" className="fw-section fw-wrap">
          <div className="fw-section-head">
            <h2 id="fw-budget">Shop op budget</h2>
          </div>
          <ul className="fw-budgets">
            {data.budgets.map((b) => (
              <li key={b.key}>
                <Link href={b.href} className="fw-budget">
                  <span className="fw-budget-label">{b.label}</span>
                  <span className="fw-cat-count">{b.count} cadeaus</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="fw-interesse" className="fw-section fw-wrap">
          <div className="fw-section-head">
            <h2 id="fw-interesse">Shop op interesse</h2>
          </div>
          <ul className="fw-interests">
            {data.interests.map((it) => (
              <li key={it.key}>
                <Link href={it.href} className="fw-interest">
                  <span>{it.label}</span>
                  <span className="fw-cat-count">{it.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Gidsen */}
        <section aria-labelledby="fw-gidsen" className="fw-section fw-wrap">
          <div className="fw-section-head">
            <h2 id="fw-gidsen">Cadeaugidsen</h2>
            <Link href="/gids" className="fw-more">
              Alle gidsen
            </Link>
          </div>
          <ul className="fw-guides">
            {data.guides.slice(0, 4).map((g) => (
              <li key={g.slug}>
                <Link href={g.href} className="fw-guide">
                  <span className="fw-guide-title">{g.title}</span>
                  <span className="fw-guide-intro line-clamp-3">{g.intro}</span>
                  <span className="fw-guide-cta">Lees de gids</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 9. Hoe het werkt */}
        <section aria-labelledby="fw-hoe" className="fw-how">
          <div className="fw-wrap fw-how-inner">
            <div>
              <h2 id="fw-hoe">Zo werkt OpTijdCadeau</h2>
              <p>
                Wij zoeken de cadeaus uit en laten zien wanneer ze bij je zijn. Bestellen en betalen doe je bij de winkel zelf, nu
                meestal bol. Koop je via onze link, dan krijgen wij mogelijk een commissie. Jij betaalt hetzelfde.
              </p>
              <p className="fw-how-links">
                <Link href="/hoe-wij-verdienen">Hoe wij verdienen</Link>
                <Link href="/contact">Contact</Link>
              </p>
            </div>
            <ol className="fw-steps">
              <li>
                <strong>Kies je datum</strong>
                <span>Vul in wanneer het cadeau in huis moet zijn.</span>
              </li>
              <li>
                <strong>Kies een cadeau</strong>
                <span>Je ziet alleen wat op tijd komt, met de prijs van vandaag.</span>
              </li>
              <li>
                <strong>Bestel bij de winkel</strong>
                <span>De knop brengt je naar de winkel. Daar reken je veilig af.</span>
              </li>
            </ol>
          </div>
        </section>
      </main>
    </>
  );
}

function Loading() {
  return (
    <>
      <PromoFallback />
      <Header />
      <main id="inhoud" className="fw-main">
        <div className="fw-hero">
          <div className="fw-wrap fw-loading">
            <p>Cadeaus laden…</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default function OntwerpFeestwinkel() {
  return (
    <div className={`fw ${playfair.variable} ${manrope.variable}`}>
      <Suspense fallback={<Loading />}>
        <Content />
      </Suspense>
    </div>
  );
}
