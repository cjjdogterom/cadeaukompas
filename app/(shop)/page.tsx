import Link from "next/link";
import { getProducts } from "@/lib/catalog";
import { guides } from "@/lib/guides";
import { BUDGETS, RECIPIENTS } from "@/lib/types";
import { formatDate, lastOrderDate } from "@/lib/deadlines";
import { ProductGrid } from "@/components/ProductCard";
import { DaysLeft } from "@/components/DaysLeft";

export default async function Home() {
  const products = await getProducts();
  const featured = products.slice(0, 8);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:pt-16">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-sint">
          <DaysLeft occasion="sinterklaas" />
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.08] font-semibold tracking-tight text-ink sm:text-6xl">
          Het goede cadeau, en op tijd in huis.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Kies voor wie, je budget en wat ze leuk vinden. Bij elk cadeau zie je eerlijk hoe snel het geleverd wordt en tot
          wanneer je kunt bestellen voor Sinterklaas of kerst.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/cadeauzoeker" className="rounded-full bg-sint px-6 py-3.5 font-medium text-white hover:bg-sint-dark">
            Start de cadeauzoeker
          </Link>
          <Link href="/cadeaus?optijd=sinterklaas" className="rounded-full border border-ink/20 px-6 py-3.5 font-medium text-ink hover:bg-cream">
            Alles wat op tijd is voor 5 dec
          </Link>
        </div>
      </section>

      <section aria-labelledby="voor-wie" className="mx-auto max-w-6xl px-4">
        <h2 id="voor-wie" className="font-display text-2xl font-semibold text-ink">Voor wie zoek je iets?</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {Object.entries(RECIPIENTS).map(([key, label]) => (
            <li key={key}>
              <Link href={`/cadeaus?voor=${key}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-ink hover:border-ink/40">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="mt-8 font-display text-2xl font-semibold text-ink">Of begin bij je budget</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {Object.entries(BUDGETS).map(([key, b]) => (
            <li key={key}>
              <Link href={`/cadeaus?budget=${key}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-ink hover:border-ink/40">
                {b.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="populair" className="mx-auto mt-14 max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <h2 id="populair" className="font-display text-2xl font-semibold text-ink">Veelgekozen dit jaar</h2>
          <Link href="/cadeaus" className="text-sm text-muted underline underline-offset-2">Alle cadeaus</Link>
        </div>
        <div className="mt-5">
          {featured.length ? <ProductGrid products={featured} /> : <p className="text-muted">De collectie wordt gevuld.</p>}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="grid gap-6 rounded-3xl bg-pine p-8 text-paper sm:grid-cols-2 sm:p-10">
          <div>
            <h2 className="font-display text-3xl font-semibold">Zo rekenen wij de besteldatum</h2>
            <p className="mt-3 leading-relaxed text-paper/85">
              We tellen de levertijd van de winkel in werkdagen, plus één dag marge voor de drukte. Voor Sinterklaas moet
              het uiterlijk vrijdag 4 december binnen zijn, voor kerst donderdag 24 december.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-4 self-center text-sm">
            {[1, 2, 3, 5].map((d) => (
              <div key={d} className="rounded-xl bg-white/10 p-4">
                <dt className="text-paper/75">Levertijd {d} {d === 1 ? "werkdag" : "werkdagen"}</dt>
                <dd className="mt-1 font-semibold">Sint: t/m {formatDate(lastOrderDate(d, "sinterklaas"), true)}</dd>
                <dd className="font-semibold">Kerst: t/m {formatDate(lastOrderDate(d, "kerst"), true)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="gidsen" className="mx-auto mt-16 max-w-6xl px-4">
        <h2 id="gidsen" className="font-display text-2xl font-semibold text-ink">Cadeaugidsen</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link href={`/gids/${g.slug}`} className="block h-full rounded-2xl border border-line bg-white p-5 hover:border-ink/30">
                <p className="font-display text-lg font-semibold text-ink">{g.title}</p>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{g.intro[0]}</p>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/surprise-ideeen" className="block h-full rounded-2xl border border-line bg-cream p-5 hover:border-ink/30">
              <p className="font-display text-lg font-semibold text-ink">Surprise-ideeën & gedichten</p>
              <p className="mt-2 text-sm text-muted">Knutselideeën met materiaallijst, plus hulp bij het rijmen.</p>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
