import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { applyFilters, getProducts, type Filters } from "@/lib/catalog";
import { AGE_GROUPS, BUDGETS, INTERESTS, RECIPIENTS } from "@/lib/types";
import { todayInNL } from "@/lib/deadlines";
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

export function parseFilters(sp: SP): Filters {
  return {
    voor: pick(sp.voor, Object.keys(RECIPIENTS) as (keyof typeof RECIPIENTS)[]),
    budget: pick(sp.budget, Object.keys(BUDGETS) as (keyof typeof BUDGETS)[]),
    leeftijd: pick(sp.leeftijd, Object.keys(AGE_GROUPS) as (keyof typeof AGE_GROUPS)[]),
    interesse: pick(sp.interesse, Object.keys(INTERESTS) as (keyof typeof INTERESTS)[]),
    optijd: pick(sp.optijd, ["sinterklaas", "kerst"] as const),
  };
}

async function Results({ searchParams }: { searchParams: Promise<SP> }) {
  const filters = parseFilters(await searchParams);
  await connection(); // "op tijd voor" hangt af van de datum van vandaag
  const all = await getProducts();
  const results = applyFilters(all, filters, todayInNL());
  return (
    <>
      <div className="mt-6">
        <FilterBar current={filters} />
      </div>
      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {results.length} {results.length === 1 ? "cadeau" : "cadeaus"} gevonden
      </p>
      <div className="mt-4">
        {results.length ? (
          <ProductGrid products={results} />
        ) : (
          <p className="rounded-2xl border border-dashed border-line p-8 text-center text-muted">
            Niets gevonden met deze combinatie. Probeer een filter minder.
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
