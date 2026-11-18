import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { applyFilters, getProducts, type Filters } from "@/lib/catalog";
import { AGE_GROUPS, BUDGETS, INTERESTS, RECIPIENTS } from "@/lib/types";
import { formatDate, todayInNL } from "@/lib/deadlines";
import { getDeliveries } from "@/lib/delivery";
import { parseDeadline } from "@/lib/delivery-core";
import { FilterBar } from "@/components/FilterBar";
import { ProductGrid } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Alle cadeaus",
  description: "Filter cadeaus op voor wie, budget, leeftijd, interesse en of ze op tijd zijn voor Sinterklaas of kerst.",
};

type SP = Record<string, string | string[] | undefined>;

function pick<T extends string>(value: unknown, allowed: readonly T[]): T | undefined {
  return typeof value === "string" && (allowed as readonly string[]).includes(value) ? (value as T) : undefined;
}

export function parseFilters(sp: SP, today: string): Filters {
  return {
    voor: pick(sp.voor, Object.keys(RECIPIENTS) as (keyof typeof RECIPIENTS)[]),
    budget: pick(sp.budget, Object.keys(BUDGETS) as (keyof typeof BUDGETS)[]),
    leeftijd: pick(sp.leeftijd, Object.keys(AGE_GROUPS) as (keyof typeof AGE_GROUPS)[]),
    interesse: pick(sp.interesse, Object.keys(INTERESTS) as (keyof typeof INTERESTS)[]),
    optijd: pick(sp.optijd, ["sinterklaas", "kerst"] as const),
    uiterlijk: parseDeadline(sp.uiterlijk, today),
    q: typeof sp.q === "string" && sp.q.trim() ? sp.q.trim().slice(0, 60) : undefined,
  };
}

async function Results({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  await connection(); // bezorgdatums hangen af van het moment van nu
  const today = todayInNL();
  const filters = parseFilters(sp, today);
  const matching = applyFilters(await getProducts(), filters, today);
  const deliveries = await getDeliveries(matching);
  const results = filters.uiterlijk
    ? matching.filter((p) => (deliveries.get(p.slug)?.latest ?? "9999") <= filters.uiterlijk!)
    : matching;
  return (
    <>
      {filters.voor && (
        <p className="mt-6 font-display text-2xl font-bold text-ink">
          Cadeaus voor: {RECIPIENTS[filters.voor]}
          {filters.leeftijd ? `, ${AGE_GROUPS[filters.leeftijd]}` : ""}
        </p>
      )}
      <div className="mt-6">
        <FilterBar current={filters} today={today} />
      </div>
      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {results.length} {results.length === 1 ? "cadeau" : "cadeaus"} gevonden
        {filters.uiterlijk && <> die uiterlijk {formatDate(filters.uiterlijk)} in huis zijn als je vandaag bestelt</>}
      </p>
      <div className="mt-4">
        {results.length ? (
          <ProductGrid products={results} deliveries={deliveries} />
        ) : (
          <p className="rounded-2xl border border-dashed border-line p-8 text-center text-muted">
            {filters.uiterlijk
              ? "Niets gevonden dat op tijd in huis is. Kies een latere datum of een filter minder."
              : "Niets gevonden met deze combinatie. Probeer een filter minder."}
          </p>
        )}
      </div>
    </>
  );
}

export default function CadeausPage({ searchParams }: PageProps<"/cadeaus">) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Alle cadeaus</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Prijzen zijn indicatief en gelden bij de genoemde winkel. Je bestelt en betaalt daar; wij ontvangen mogelijk een
        commissie.
      </p>
      <Suspense fallback={<p className="mt-6 text-muted">Cadeaus laden…</p>}>
        <Results searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
