import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Cadeaugidsen",
  description: "Cadeaugidsen voor Sinterklaas en kerst: per doelgroep en budget, met eerlijke levertijden.",
};

export default function GidsenPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Cadeaugidsen</h1>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link href={`/gids/${g.slug}`} className="block h-full rounded-2xl border border-line bg-white p-6 hover:border-ink/30">
              <h2 className="font-display text-xl font-semibold text-ink">{g.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{g.intro[0]}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
