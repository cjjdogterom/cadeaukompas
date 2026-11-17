import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { connection } from "next/server";
import { Suspense, cache } from "react";
import { getLandingData } from "@/lib/landing";
import { BEELD } from "@/lib/beeld";
import { ARRIVE_BY, formatDate } from "@/lib/deadlines";
import { formatPrice } from "@/lib/format";
import { LogoMark } from "@/components/Logo";
import { ProductArt } from "@/components/ProductArt";
import "./inpak-c.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  variable: "--font-c-display",
  display: "swap",
});
const tekst = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-c-tekst", display: "swap" });

export const metadata: Metadata = {
  title: "Ontwerp C: Inpakpapier",
  description: "Cadeaus die op tijd in huis zijn voor pakjesavond en kerst, met bij elk cadeau de echte bezorgdatum.",
};

const data = cache(async () => {
  await connection(); // aftelling en bezorgdatums hangen af van vandaag
  return getLandingData();
});

const kort = (iso: string) => formatDate(iso, true).replaceAll(".", "");

export default function OntwerpC() {
  return (
    <div className={`${display.variable} ${tekst.variable} c-page`}>
      <header className="c-sneeuw">
        <div className="c-wrap c-kop">
          <Link href="/" className="c-merk" aria-label="OpTijdCadeau, naar de homepage">
            <LogoMark className="h-10 w-10" />
            <span>OpTijdCadeau</span>
          </Link>
          <nav aria-label="Hoofdmenu" className="c-nav">
            <Link href="/cadeaus">Alle cadeaus</Link>
            <Link href="/cadeauzoeker">Cadeauzoeker</Link>
            <Link href="/gids">Gidsen</Link>
            <Link href="/sinterklaasgedicht">Gedichten</Link>
          </nav>
          <a href="#uiterlijk" className="c-knop c-knopRood">
            Kies je datum
          </a>
        </div>
      </header>

      <main id="inhoud">
        <Hero />
        <Suspense fallback={<div className="c-wachten" aria-busy="true" />}>
          <Rest />
        </Suspense>
      </main>
    </div>
  );
}

function Hero() {
  return (
    <section className="c-rood c-hero" aria-labelledby="c-h1">
      <div className="c-wrap c-heroGrid">
        <div className="c-heroTekst">
          <h1 id="c-h1" className="c-h1">
            Cadeaus, op tijd.
          </h1>
          <p className="c-lead">
            Kies de dag waarop het cadeau uiterlijk in huis moet zijn. Je ziet alleen wat dan bezorgd is, en bij elk
            cadeau de datum die de winkel belooft.
          </p>

          <form action="/cadeaus" method="get" className="c-form">
            <label htmlFor="uiterlijk" className="c-formLabel">
              Wanneer moet het in huis zijn?
            </label>
            <div className="c-formRij">
              <input
                id="uiterlijk"
                type="date"
                name="uiterlijk"
                required
                defaultValue={ARRIVE_BY.sinterklaas}
                className="c-datum"
              />
              <button type="submit" className="c-knop c-knopGroen">
                Toon wat op tijd komt
              </button>
            </div>
          </form>
          <div className="c-snel">
            <Link href={`/cadeaus?uiterlijk=${ARRIVE_BY.sinterklaas}`} className="c-knop c-knopWit">
              Pakjesavond (4 dec)
            </Link>
            <Link href={`/cadeaus?uiterlijk=${ARRIVE_BY.kerst}`} className="c-knop c-knopWit">
              Kerst (24 dec)
            </Link>
          </div>
        </div>

        <div className="c-beeldKolom">
          <Image
            src={BEELD.kerstBezoek.src}
            width={BEELD.kerstBezoek.width}
            height={BEELD.kerstBezoek.height}
            alt={BEELD.kerstBezoek.alt}
            sizes="(min-width: 1440px) 520px, (min-width: 900px) 38vw, 92vw"
            preload
            className="c-ansicht"
          />
          <Suspense fallback={null}>
            <Aftellen />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

async function Aftellen() {
  const d = await data();
  const sint = d.sint.daysLeft > 0;
  const t = sint ? d.sint : d.kerst;
  const naar = sint ? "pakjesavond" : "kerst";
  if (t.daysLeft < 1) return null;
  return (
    <p className="c-label">
      <span className="c-dagen">{t.daysLeft}</span>
      <span className="c-labelTekst">
        {t.daysLeft === 1 ? "dag" : "dagen"} tot {naar}
      </span>
      <span className="c-labelKlein">Snelste cadeaus uiterlijk {formatDate(t.fastestOrderBy)} bestellen.</span>
    </p>
  );
}

async function Rest() {
  const d = await data();
  const vandaag = d.today;

  return (
    <>
      {/* Vertrekbord */}
      <section className="c-sneeuw c-veld" aria-labelledby="c-bord">
        <div className="c-wrap">
          <div className="c-sectieKop">
            <h2 id="c-bord" className="c-h2">
              Laatste besteldagen.
            </h2>
            <p className="c-lead">
              De laatste besteldag hangt af van de levertijd. We rekenen in werkdagen, met een dag speling voor de
              drukte in december.
            </p>
          </div>
          <table className="c-bord">
            <caption className="sr-only">Laatste besteldag per levertijd, voor pakjesavond en voor kerst</caption>
            <thead>
              <tr>
                <th scope="col">Levertijd</th>
                <th scope="col">Pakjesavond, in huis {kort(d.sint.arriveBy)}</th>
                <th scope="col">Kerst, in huis {kort(d.kerst.arriveBy)}</th>
                <th scope="col" className="c-bordKolomAantal">
                  Cadeaus
                </th>
              </tr>
            </thead>
            <tbody>
              {d.deadlines.map((r) => (
                <tr key={r.deliveryDays}>
                  <th scope="row">{r.label}</th>
                  <Deadline iso={r.sinterklaas} vandaag={vandaag} />
                  <Deadline iso={r.kerst} vandaag={vandaag} />
                  <td className="c-aantal c-bordKolomAantal">{r.count} cadeaus</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="c-bordNoot">
            Bij elk cadeau staat daarnaast de bezorgdatum die bol zelf belooft. Die gaat voor: is die later, dan zie je
            dat meteen.
          </p>
        </div>
      </section>

      {/* Voor wie */}
      <section className="c-groen c-veld" aria-labelledby="c-wie">
        <div className="c-wrap">
          <div className="c-sectieKop">
            <h2 id="c-wie" className="c-h2">
              Voor wie zoek je iets?
            </h2>
            <p className="c-lead">Het getal is hoeveel cadeaus we nu voor die persoon hebben.</p>
          </div>
          <ul className="c-woorden">
            {d.recipients.map((r) => (
              <li key={r.key}>
                <Link href={r.href} className="c-woord" aria-label={`${r.label}, ${r.count} cadeaus`}>
                  <span className="c-woordTekst">{r.label}</span>
                  <span className="c-woordAantal" aria-hidden="true">
                    {r.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="c-budget">
            <h3 className="c-budgetKop">Of kies je budget</h3>
            <ul className="c-budgetLijst">
              {d.budgets.map((b) => (
                <li key={b.key}>
                  <Link href={b.href} className="c-knop c-knopRood">
                    {b.label}
                    <span className="c-budgetAantal">{b.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Uitgelicht */}
      <section className="c-sneeuw c-veld" aria-labelledby="c-uit">
        <div className="c-wrap">
          <div className="c-sectieKop">
            <h2 id="c-uit" className="c-h2">
              Deze komen op tijd.
            </h2>
            <p className="c-lead">
              Een greep uit de catalogus, met wanneer het in huis is als je vandaag bestelt.
            </p>
          </div>
          <ul className="c-kaartjes">
            {d.featured.map((f) => (
              <li key={f.slug} className="c-kaartje">
                <div className="c-kaartjeBeeld">
                  <ProductArt product={f.product} sizes="(min-width: 900px) 160px, 104px" />
                </div>
                <div className="c-kaartjeTekst">
                  <h3 className="c-titel">
                    <Link href={f.href} className="c-titelLink">
                      {f.title}
                    </Link>
                  </h3>
                  <p className="c-meta">
                    {f.brand ? `${f.brand}, ` : ""}bij {f.merchant}
                  </p>
                </div>
                <p className="c-prijsBlok c-prijs">{formatPrice(f.priceCents)}</p>
                <p className="c-bezorgBlok">
                  Nu besteld, uiterlijk in huis
                  <span className="c-bezorgDatum">{formatDate(f.delivery.latest)}</span>
                  {f.delivery.source === "bol" ? "volgens bol" : "verwacht"}
                </p>
              </li>
            ))}
          </ul>
          <div className="c-meerRij">
            <Link href="/cadeaus" className="c-knop c-knopRood">
              Alle {d.totalProducts} cadeaus bekijken
            </Link>
          </div>
        </div>
      </section>

      {/* Gidsen */}
      <section className="c-rood c-veld" aria-labelledby="c-gids">
        <div className="c-wrap c-gidsGrid">
          <Image
            src={BEELD.kerstEngel.src}
            width={BEELD.kerstEngel.width}
            height={BEELD.kerstEngel.height}
            alt={BEELD.kerstEngel.alt}
            sizes="(min-width: 1440px) 660px, (min-width: 900px) 46vw, 92vw"
            className="c-gidsBeeld"
          />
          <div>
            <div className="c-gidsKop">
              <h2 id="c-gids" className="c-h2">
                Nog geen idee?
              </h2>
              <p className="c-lead mt-5">Korte gidsen per persoon en per budget, met cadeaus die nog op tijd komen.</p>
            </div>
            <ul className="c-gidsen">
              {d.guides.map((g) => (
                <li key={g.slug}>
                  <Link href={g.href} className="c-gidsLink">
                    <span className="c-gidsTitel">{g.title}</span>
                    <span className="c-gidsIntro">{g.intro}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Hoe wij werken */}
      <section className="c-sneeuw c-veld" aria-labelledby="c-werk">
        <div className="c-wrap c-werkGrid">
          <Image
            src={BEELD.janSteen.src}
            width={BEELD.janSteen.width}
            height={BEELD.janSteen.height}
            alt={BEELD.janSteen.alt}
            sizes="(min-width: 1440px) 540px, (min-width: 900px) 38vw, 92vw"
            className="c-werkBeeld"
          />
          <div>
            <h2 id="c-werk" className="c-h2">
              Hoe wij werken.
            </h2>
            <ul className="c-punten">
              <li className="c-punt">
                <strong>Wij verkopen niets zelf.</strong>
                We zoeken cadeaus uit en sturen je door naar de winkel. Daar bestel en betaal je, en daar regel je ook
                ruilen en retour.
              </li>
              <li className="c-punt">
                <strong>De winkel betaalt ons, niet jij.</strong>
                Bestel je via onze link, dan krijgen wij mogelijk een kleine commissie. Jij betaalt hetzelfde.{" "}
                <Link href="/hoe-wij-verdienen" className="c-inlineLink">
                  Zo verdienen wij
                </Link>
              </li>
              <li className="c-punt">
                <strong>Prijzen en levertijden controleren we.</strong>
                We halen ze regelmatig opnieuw op. Klopt iets niet meer, dan passen we het aan of halen we het cadeau weg.
              </li>
              <li className="c-punt">
                <strong>Geen nepkortingen, geen nepreviews.</strong>
                Geen doorgestreepte prijzen die nooit golden en geen verzonnen sterren. Alleen wat we kunnen nagaan.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Beeldcredits */}
      <section className="c-sneeuw" aria-label="Beeldcredits">
        <div className="c-wrap c-credits">
          <p>Beeld op deze pagina:</p>
          <ul>
            {[BEELD.kerstBezoek, BEELD.kerstEngel, BEELD.janSteen].map((b) => (
              <li key={b.src}>
                <a href={b.source}>{b.credit}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Deadline({ iso, vandaag }: { iso: string; vandaag: string }) {
  const voorbij = iso < vandaag;
  return (
    <td>
      <span className={`c-datumGroot ${voorbij ? "c-datumVoorbij" : ""}`}>{kort(iso)}</span>
      {voorbij && <span className="c-voorbijTekst">Verstreken</span>}
    </td>
  );
}
