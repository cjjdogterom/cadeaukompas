import type { Metadata } from "next";
import Link from "next/link";
import { poemStarters, poemTips } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sinterklaasgedicht schrijven: tips en openingszinnen",
  description: "Zo schrijf je een sinterklaasgedicht dat werkt: vijf tips, een vast rijmschema en openingszinnen om mee te beginnen.",
};

export default function GedichtPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Een sinterklaasgedicht schrijven</h1>
      <p className="mt-3 text-lg text-muted">Geen dichter? Hoeft ook niet. Met deze aanpak heb je in een half uur een gedicht dat werkt.</p>
      <div className="mt-8 space-y-6">
        {poemTips.map((t, i) => (
          <section key={t.title}>
            <h2 className="font-display text-xl font-semibold text-ink">{i + 1}. {t.title}</h2>
            <p className="mt-1 leading-relaxed text-ink/85">{t.text}</p>
          </section>
        ))}
      </div>
      <section className="mt-10 rounded-2xl bg-cream p-6">
        <h2 className="font-display text-xl font-semibold text-ink">Openingszinnen om mee te beginnen</h2>
        <ul className="mt-3 space-y-3">
          {poemStarters.map((s) => (
            <li key={s} className="font-display text-lg italic text-ink/90">
              {s.split(" / ").map((line, i) => <span key={i} className="block">{line}</span>)}
            </li>
          ))}
        </ul>
      </section>
      <p className="mt-8">
        Bijpassende surprise nodig? Bekijk de <Link href="/surprise-ideeen" className="underline underline-offset-2">surprise-ideeën</Link>.
      </p>
    </div>
  );
}
