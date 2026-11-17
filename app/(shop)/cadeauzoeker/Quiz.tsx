"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BUDGETS, INTERESTS, RECIPIENTS } from "@/lib/types";

type Step = { key: "voor" | "optijd" | "budget" | "interesse"; question: string; options: [string, string][] };

const steps: Step[] = [
  { key: "voor", question: "Voor wie is het cadeau?", options: Object.entries(RECIPIENTS) },
  {
    key: "optijd",
    question: "Wanneer moet het er zijn?",
    options: [["sinterklaas", "Voor pakjesavond (5 dec)"], ["kerst", "Voor kerst (25 dec)"], ["", "Maakt niet uit"]],
  },
  { key: "budget", question: "Wat wil je ongeveer uitgeven?", options: Object.entries(BUDGETS).map(([k, b]) => [k, b.label]) },
  { key: "interesse", question: "Waar wordt die persoon blij van?", options: Object.entries(INTERESTS) },
];

export function Quiz() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const step = steps[index];

  function choose(value: string) {
    const next = { ...answers, [step.key]: value };
    setAnswers(next);
    if (index < steps.length - 1) {
      setIndex(index + 1);
    } else {
      const params = new URLSearchParams(Object.entries(next).filter(([, v]) => v));
      router.push(`/cadeaus${params.size ? `?${params}` : ""}`);
    }
  }

  return (
    <section aria-live="polite" className="rounded-3xl border border-line bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>Vraag {index + 1} van {steps.length}</span>
        {index > 0 && (
          <button type="button" onClick={() => setIndex(index - 1)} className="underline underline-offset-2">
            Vorige
          </button>
        )}
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-cream">
        <div className="h-full rounded-full bg-sint transition-all" style={{ width: `${((index + 1) / steps.length) * 100}%` }} />
      </div>
      <h2 className="mt-6 font-display text-2xl font-semibold text-ink">{step.question}</h2>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {step.options.map(([value, label]) => (
          <button
            key={value || "geen"}
            type="button"
            onClick={() => choose(value)}
            aria-pressed={answers[step.key] === value}
            className="min-h-12 rounded-xl border border-line bg-paper px-4 py-3 text-left text-ink transition-colors hover:border-sint hover:bg-cream aria-pressed:border-sint"
          >
            {label}
          </button>
        ))}
      </div>
      <button type="button" onClick={() => choose("")} className="mt-4 text-sm text-muted underline underline-offset-2">
        Overslaan
      </button>
    </section>
  );
}
