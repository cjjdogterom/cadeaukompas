"use client";

import { useRouter } from "next/navigation";
import { AGE_GROUPS, BUDGETS, INTERESTS, RECIPIENTS } from "@/lib/types";
import type { Filters } from "@/lib/catalog";

const groups = [
  { name: "voor", label: "Voor wie", options: Object.entries(RECIPIENTS) },
  { name: "budget", label: "Budget", options: Object.entries(BUDGETS).map(([k, v]) => [k, v.label] as const) },
  { name: "leeftijd", label: "Leeftijd", options: Object.entries(AGE_GROUPS) },
  { name: "interesse", label: "Interesse", options: Object.entries(INTERESTS) },
  { name: "optijd", label: "Op tijd voor", options: [["sinterklaas", "Sinterklaas (5 dec)"], ["kerst", "Kerst (25 dec)"]] as const },
] as const;

/** Werkt zonder JavaScript (GET-formulier); met JS filtert hij direct bij elke wijziging. */
export function FilterBar({ current, action = "/cadeaus" }: { current: Filters; action?: string }) {
  const router = useRouter();
  return (
    <form
      action={action}
      method="get"
      className="grid grid-cols-2 gap-3 rounded-2xl border border-line bg-white p-4 sm:grid-cols-3 lg:grid-cols-6"
      onChange={(e) => {
        const params = new URLSearchParams();
        new FormData(e.currentTarget).forEach((v, k) => {
          if (typeof v === "string" && v) params.set(k, v);
        });
        router.replace(`${action}${params.size ? `?${params}` : ""}`, { scroll: false });
      }}
    >
      {groups.map((g) => (
        <label key={g.name} className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-ink">{g.label}</span>
          <select
            name={g.name}
            defaultValue={(current as Record<string, string | undefined>)[g.name] ?? ""}
            className="h-11 rounded-lg border border-line bg-paper px-2 text-ink"
          >
            <option value="">Alles</option>
            {g.options.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      ))}
      <div className="col-span-2 flex items-end gap-2 sm:col-span-3 lg:col-span-1">
        <button type="submit" className="h-11 flex-1 rounded-lg bg-ink px-4 font-medium text-paper hover:bg-ink/90">
          Toon
        </button>
        <a href={action} className="flex h-11 items-center px-2 text-sm text-muted underline underline-offset-2">
          Wis
        </a>
      </div>
    </form>
  );
}
