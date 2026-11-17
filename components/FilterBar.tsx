"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { AGE_GROUPS, BUDGETS, INTERESTS, RECIPIENTS } from "@/lib/types";
import type { Filters } from "@/lib/catalog";

const groups = [
  { name: "voor", label: "Voor wie", options: Object.entries(RECIPIENTS) },
  { name: "budget", label: "Budget", options: Object.entries(BUDGETS).map(([k, v]) => [k, v.label] as const) },
  { name: "leeftijd", label: "Leeftijd", options: Object.entries(AGE_GROUPS) },
  { name: "interesse", label: "Interesse", options: Object.entries(INTERESTS) },
] as const;

const QUICK = [
  { label: "Pakjesavond", value: "2026-12-04" },
  { label: "Kerst", value: "2026-12-24" },
] as const;

/** Werkt zonder JavaScript (GET-formulier); met JS filtert hij direct bij elke wijziging. */
export function FilterBar({ current, today, action = "/cadeaus" }: { current: Filters; today: string; action?: string }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  function apply(form: HTMLFormElement) {
    const params = new URLSearchParams();
    new FormData(form).forEach((v, k) => {
      if (typeof v === "string" && v) params.set(k, v);
    });
    router.replace(`${action}${params.size ? `?${params}` : ""}`, { scroll: false });
  }

  const max = new Date(`${today}T00:00:00Z`);
  max.setUTCDate(max.getUTCDate() + 90);
  const tomorrow = new Date(`${today}T00:00:00Z`);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

  return (
    <form
      ref={formRef}
      action={action}
      method="get"
      className="rounded-2xl border border-line bg-white p-4"
      onChange={(e) => apply(e.currentTarget)}
    >
      <div className="flex flex-wrap items-end gap-3 border-b border-line pb-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-ink">Uiterlijk in huis op</span>
          <input
            ref={dateRef}
            type="date"
            name="uiterlijk"
            min={tomorrow.toISOString().slice(0, 10)}
            max={max.toISOString().slice(0, 10)}
            defaultValue={current.uiterlijk ?? ""}
            className="h-11 rounded-lg border border-line bg-paper px-3 text-ink"
          />
        </label>
        <div className="flex flex-wrap gap-2 pb-0.5">
          {QUICK.filter((q) => q.value > today).map((q) => (
            <button
              key={q.value}
              type="button"
              aria-pressed={current.uiterlijk === q.value}
              onClick={() => {
                if (dateRef.current && formRef.current) {
                  dateRef.current.value = q.value;
                  apply(formRef.current);
                }
              }}
              className={`h-10 rounded-full border px-4 text-sm ${
                current.uiterlijk === q.value ? "border-pine bg-pine text-paper" : "border-line text-ink hover:bg-cream"
              }`}
            >
              {q.label} ({q.value.slice(8, 10).replace(/^0/, "")} dec)
            </button>
          ))}
        </div>
        <p className="basis-full text-xs text-muted">
          We tonen alleen cadeaus die volgens de winkel op tijd bezorgd worden als je vandaag bestelt.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
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
        <div className="col-span-2 flex items-end gap-2 sm:col-span-1">
          <button type="submit" className="h-11 flex-1 rounded-lg bg-ink px-4 font-medium text-paper hover:bg-ink/90">
            Toon
          </button>
          <a href={action} className="flex h-11 items-center px-2 text-sm text-muted underline underline-offset-2">
            Wis
          </a>
        </div>
      </div>
    </form>
  );
}
