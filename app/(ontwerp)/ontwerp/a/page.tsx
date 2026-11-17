import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { DM_Serif_Display, Instrument_Sans } from "next/font/google";
import { getLandingData, type LandingData } from "@/lib/landing";
import { formatDate } from "@/lib/deadlines";
import { formatPrice } from "@/lib/format";
import { BEELD } from "@/lib/beeld";
import { LogoMark } from "@/components/Logo";
import "./ontwerp-a.css";

/**
 * Klassenamen met voorvoegsel "oa-" (zie ontwerp-a.css). Geen CSS-module: de turbopack-regel in
 * next.config.ts behandelt elk *.css-bestand als gewone CSS, waardoor module-klassen leeg blijven.
 */
const s = new Proxy({} as Record<string, string>, { get: (_, key) => `oa-${String(key)}` });

const display = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--a-display", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--a-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Ontwerp A — De Sint-dienstregeling",
  description: "Cadeaus die op tijd in huis zijn voor pakjesavond en kerst, met eerlijke besteldeadlines.",
};

/** "vr 4 dec" → "4 dec": de datum als beeld, zonder weekdag. */
function dayMonth(iso: string) {
  return formatDate(iso, true).split(" ").slice(1).join(" ");
}
function weekday(iso: string) {
  return formatDate(iso).split(" ")[0];
}

function Kopbalk() {
  return (
    <header className={s.kopbalk}>
      <Link href="/" className={s.woordmerk}>
        <LogoMark className={s.merkteken} />
        <span>OpTijdCadeau</span>
      </Link>
      <nav aria-label="Hoofdmenu" className={s.nav}>
        <Link href="/cadeaus">Alle cadeaus</Link>
        <Link href="/cadeauzoeker">Cadeauzoeker</Link>
        <Link href="/gids">Gidsen</Link>
        <Link href="/sinterklaasgedicht">Gedichten</Link>
      </nav>
      <a href="#datum" className={s.kopActie}>
        Kies je datum
      </a>
    </header>
  );
}

function Hero({ data }: { data: LandingData }) {
  const sintVoorbij = data.sint.daysLeft <= 0;
  const standaard = data.today < data.sint.arriveBy ? data.sint.arriveBy : data.kerst.arriveBy;
  return (
    <section className={s.hero} aria-labelledby="a-h1">
      <h1 id="a-h1" className={s.h1}>
        Cadeaus die op tijd komen.
      </h1>

      <figure className={s.heroBeeld}>
        <Image
          src={BEELD.janSteen.src}
          width={BEELD.janSteen.width}
          height={BEELD.janSteen.height}
          alt={BEELD.janSteen.alt}
          sizes="(min-width: 960px) 44vw, 100vw"
          priority
        />
      </figure>

      <div className={s.heroForm}>
        <p className={s.lead}>
          Bij elk cadeau zie je tot wanneer je kunt bestellen en wanneer het in huis is. Kies je datum, dan laten we
          alleen zien wat op tijd komt.
        </p>

        <form action="/cadeaus" method="get" className={s.form} id="datum">
          <label htmlFor="a-uiterlijk" className={s.label}>
            Wanneer moet het in huis zijn?
          </label>
          <div className={s.formRij}>
            <input
              id="a-uiterlijk"
              type="date"
              name="uiterlijk"
              required
              min={data.tomorrowDelivery}
              defaultValue={standaard}
              className={s.datum}
            />
            <button type="submit" className={s.actie}>
              Toon cadeaus
            </button>
          </div>
          <div className={s.snel}>
            <span>Of meteen:</span>
            {!sintVoorbij && (
              <Link href={`/cadeaus?uiterlijk=${data.sint.arriveBy}`} className={s.snelknop}>
                Pakjesavond ({dayMonth(data.sint.arriveBy)})
              </Link>
            )}
            <Link href={`/cadeaus?uiterlijk=${data.kerst.arriveBy}`} className={s.snelknop}>
              Kerst ({dayMonth(data.kerst.arriveBy)})
            </Link>
          </div>
        </form>

        {!sintVoorbij ? (
          <p className={s.aftel}>
            <strong>
              Nog {data.sint.daysLeft} {data.sint.daysLeft === 1 ? "dag" : "dagen"} tot pakjesavond.
            </strong>{" "}
            De snelste cadeaus bestel je uiterlijk {formatDate(data.sint.fastestOrderBy)}.
          </p>
        ) : (
          <p className={s.aftel}>
            <strong>
              Nog {data.kerst.daysLeft} {data.kerst.daysLeft === 1 ? "dag" : "dagen"} tot kerst.
            </strong>{" "}
            De snelste cadeaus bestel je uiterlijk {formatDate(data.kerst.fastestOrderBy)}.
          </p>
        )}
      </div>
    </section>
  );
}

function Vertrekbord({ data }: { data: LandingData }) {
  const cel = (iso: string) => {
    const verstreken = iso < data.today;
    return (
      <td className={verstreken ? s.verstreken : undefined}>
        <span className={s.besteldag}>{dayMonth(iso)}</span>
        <span className={s.weekdag}>{verstreken ? "verstreken" : weekday(iso)}</span>
      </td>
    );
  };
  return (
    <section className={s.bord} aria-labelledby="a-bord">
      <div className={s.binnen}>
        <div className={s.bordKop}>
          <h2 id="a-bord" className={s.h2}>
            Tot wanneer kun je bestellen?
          </h2>
          <p className={s.bordIntro}>
            De laatste besteldag per levertijd, met een dag speling voor de drukte. Bestel je op of vóór deze dag, dan
            is het op tijd in huis. Bij elk cadeau staat daarnaast de eigen bezorgdatum.
          </p>
        </div>

        <div className={s.tabelWrap}>
          <table className={s.tabel}>
            <caption className={s.srOnly}>Laatste besteldag per levertijd, voor pakjesavond en voor kerst</caption>
            <thead>
              <tr>
                <th scope="col" className={s.kolLevertijd}>
                  Levertijd
                </th>
                <th scope="col">
                  <span className={s.grootDatum}>{dayMonth(data.sint.arriveBy)}</span>
                  <span className={s.kolUitleg}>in huis voor pakjesavond</span>
                </th>
                <th scope="col">
                  <span className={s.grootDatum}>{dayMonth(data.kerst.arriveBy)}</span>
                  <span className={s.kolUitleg}>in huis voor kerstavond</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.deadlines.map((d) => (
                <tr key={d.deliveryDays}>
                  <th scope="row">
                    <span className={s.rijLabel}>{d.label}</span>
                    <span className={s.rijAantal}>
                      {d.count} {d.count === 1 ? "cadeau" : "cadeaus"}
                    </span>
                  </th>
                  {cel(d.sinterklaas)}
                  {cel(d.kerst)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={s.bordVoet}>
          Vandaag besteld met de snelste levering: in huis {formatDate(data.tomorrowDelivery)}.{" "}
          <Link href={`/cadeaus?uiterlijk=${data.tomorrowDelivery}`}>Bekijk wat morgen al komt</Link>
        </p>
      </div>
    </section>
  );
}

function VoorWie({ data }: { data: LandingData }) {
  return (
    <section className={s.sectie} aria-labelledby="a-voorwie">
      <div className={`${s.binnen} ${s.voorWie}`}>
        <figure className={s.prent}>
          <Image
            src={BEELD.sintPrent.src}
            width={BEELD.sintPrent.width}
            height={BEELD.sintPrent.height}
            alt={BEELD.sintPrent.alt}
            sizes="(min-width: 960px) 52vw, 100vw"
          />
        </figure>
        <div className={s.voorWieTekst}>
          <h2 id="a-voorwie" className={s.h2}>
            Voor wie zoek je iets?
          </h2>
          <ul className={s.register}>
            {data.recipients.map((r) => (
              <li key={r.key}>
                <Link href={r.href} className={s.registerRij}>
                  <span className={s.registerNaam}>{r.label}</span>
                  <span className={s.registerAantal}>{r.count}</span>
                </Link>
              </li>
            ))}
          </ul>
          <h3 className={s.h3}>Of kies op budget</h3>
          <ul className={s.budgetten}>
            {data.budgets.map((b) => (
              <li key={b.key}>
                <Link href={b.href} className={s.budget}>
                  {b.label} <span className={s.budgetAantal}>({b.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Uitgelicht({ data }: { data: LandingData }) {
  const items = data.featured.slice(0, 10);
  return (
    <section className={s.sectie} aria-labelledby="a-uitgelicht">
      <div className={s.binnen}>
        <div className={s.sectieKop}>
          <h2 id="a-uitgelicht" className={s.h2}>
            Uitgelicht, met bezorgdatum
          </h2>
          <p className={s.sectieIntro}>
            Tien cadeaus uit de gids. De datum is wanneer het in huis is als je nu bestelt; prijzen gelden bij de
            genoemde winkel.
          </p>
        </div>
        <ul className={s.kaart}>
          {items.map((item) => (
            <li key={item.slug}>
              <Link href={item.href} className={s.kaartRij}>
                <span className={s.kaartTitel}>{item.title}</span>
                <span className={s.kaartPrijs}>{formatPrice(item.priceCents)}</span>
                <span className={s.kaartZin}>
                  {item.brand && <span className={s.kaartMerk}>{item.brand}. </span>}
                  {item.short}
                </span>
                <span className={s.kaartBezorging}>
                  Nu besteld, uiterlijk in huis {formatDate(item.delivery.latest, true)}
                  <span className={s.kaartBron}>
                    {" "}
                    ({item.delivery.source === "bol" ? "volgens bol" : "verwacht"}, via {item.merchant})
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className={s.meer}>
          <Link href="/cadeaus">Alle {data.totalProducts} cadeaus bekijken</Link>
        </p>
      </div>
    </section>
  );
}

function Gidsen({ data }: { data: LandingData }) {
  return (
    <section className={s.sectie} aria-labelledby="a-gidsen">
      <div className={`${s.binnen} ${s.gidsen}`}>
        <div>
          <h2 id="a-gidsen" className={s.h2}>
            Gidsen om rustig te lezen
          </h2>
          <ul className={s.gidsLijst}>
            {data.guides.slice(0, 5).map((g) => (
              <li key={g.slug}>
                <Link href={g.href} className={s.gids}>
                  <span className={s.gidsTitel}>{g.title}</span>
                  <span className={s.gidsIntro}>{g.intro}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className={s.meer}>
            <Link href="/gids">Alle gidsen</Link>
          </p>
        </div>
        <figure className={s.kerstBeeld}>
          <Image
            src={BEELD.kerstBezoek.src}
            width={BEELD.kerstBezoek.width}
            height={BEELD.kerstBezoek.height}
            alt={BEELD.kerstBezoek.alt}
            sizes="(min-width: 960px) 34vw, 100vw"
          />
        </figure>
      </div>
    </section>
  );
}

function HoeWijWerken() {
  return (
    <section className={s.sectie} aria-labelledby="a-werken">
      <div className={`${s.binnen} ${s.werken}`}>
        <h2 id="a-werken" className={s.h2}>
          Hoe wij werken
        </h2>
        <div className={s.werkenTekst}>
          <p>
            <strong>Wij verkopen zelf niets.</strong> We zoeken cadeaus uit en sturen je door naar de winkel. Daar
            bestel en betaal je, en daar regel je ook een retour.
          </p>
          <p>
            <strong>We krijgen mogelijk een commissie.</strong> Bestel je via onze link, dan ontvangen wij soms een
            vergoeding van de winkel. Jij betaalt hetzelfde. <Link href="/hoe-wij-verdienen">Zo verdienen wij</Link>.
          </p>
          <p>
            <strong>Prijzen en levertijden controleren we.</strong> Komt een datum van bol zelf, dan zeggen we dat
            erbij. Anders is het een voorzichtige schatting.
          </p>
          <p>
            <strong>Geen nepkortingen, geen nepreviews.</strong> Geen doorgestreepte vanafprijzen en geen verzonnen
            sterren. Wat je hier leest, schreven we zelf.
          </p>
        </div>
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
      <Vertrekbord data={data} />
      <VoorWie data={data} />
      <Uitgelicht data={data} />
      <Gidsen data={data} />
      <HoeWijWerken />
    </>
  );
}

export default function OntwerpA() {
  return (
    <div className={`${display.variable} ${sans.variable} ${s.pagina}`}>
      <Kopbalk />
      <main id="inhoud">
        <Suspense fallback={<div className={s.laden}>Dienstregeling laden…</div>}>
          <Inhoud />
        </Suspense>
      </main>
      <aside className={s.credits} aria-label="Beeldverantwoording">
        <p>
          Beeld: {BEELD.janSteen.credit}. {BEELD.sintPrent.credit}. {BEELD.kerstBezoek.credit}.
        </p>
      </aside>
    </div>
  );
}
