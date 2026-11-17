import type { Metadata } from "next";
import { Quiz } from "./Quiz";

export const metadata: Metadata = {
  title: "Cadeauzoeker",
  description: "Beantwoord vier korte vragen en krijg cadeaus die passen bij wie, budget en interesse — en die op tijd aankomen.",
};

export default function CadeauzoekerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Cadeauzoeker</h1>
      <p className="mt-2 text-muted">Vier vragen, daarna laten we zien wat past. Je kunt elke vraag overslaan.</p>
      <div className="mt-8">
        <Quiz />
      </div>
    </div>
  );
}
