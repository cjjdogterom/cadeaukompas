import type { Metadata } from "next";
import Link from "next/link";
import { surpriseIdeas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Surprise-ideeën voor Sinterklaas",
  description: "Originele surprise-ideeën met materiaallijst: van mislukte taart tot thuiswerk-bunker. Plus tips voor het gedicht.",
};

export default function SurprisePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Surprise-ideeën</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        Een goede surprise verwijst naar de ontvanger en verstopt het cadeau op een onverwachte plek. Hier zijn ideeën die
        je in een avond maakt met spullen uit huis.
      </p>
      <ol className="mt-10 space-y-6">
        {surpriseIdeas.map((s, i) => (
          <li key={s.title} className="rounded-2xl border border-line bg-white p-6">
            <p className="text-sm text-muted">Idee {i + 1} · {s.for}</p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-ink">{s.title}</h2>
            <p className="mt-3 leading-relaxed text-ink/85">{s.idea}</p>
            <p className="mt-3 text-sm"><span className="font-medium text-ink">Nodig:</span> <span className="text-muted">{s.materials}</span></p>
          </li>
        ))}
      </ol>
      <p className="mt-10">
        Nog een gedicht nodig? <Link href="/sinterklaasgedicht" className="underline underline-offset-2">Zo schrijf je een sinterklaasgedicht</Link>.
        Nog geen cadeau om te verstoppen? <Link href="/cadeauzoeker" className="underline underline-offset-2">Probeer de cadeauzoeker</Link>.
      </p>
    </div>
  );
}
